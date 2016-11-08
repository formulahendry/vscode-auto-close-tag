'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    vscode.workspace.onDidChangeTextDocument(event => {
        insertAutoCloseTag(event);
    });

    let closeTag = vscode.commands.registerCommand('auto-close-tag.closeTag', () => {
        insertCloseTag();
    });

    context.subscriptions.push(closeTag);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function insertAutoCloseTag(event: vscode.TextDocumentChangeEvent): void {
    if (event.contentChanges[0].text !== ">" && event.contentChanges[0].text !== "/") {
        return;
    }

    let config = vscode.workspace.getConfiguration('auto-close-tag');
    if (!config.get<boolean>("enableAutoCloseTag", true)) {
        return;
    }

    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    let languageId = editor.document.languageId;
    let languages = config.get<string[]>("activationOnLanguage", ["*"]);
    if (languages.indexOf("*") === -1 && languages.indexOf(languageId) === -1) {
        return;
    }

    let selection = editor.selection;
    let originalPosition = selection.start.translate(0, 1);
    let excludedTags = config.get<string[]>("excludedTags", []);
    let isSublimeText3Mode = config.get<boolean>("SublimeText3Mode", false);
    let enableAutoCloseSelfClosingTag = config.get<boolean>("enableAutoCloseSelfClosingTag", true);

    if (isSublimeText3Mode && event.contentChanges[0].text === "/") {
        let text = editor.document.getText(new vscode.Range(new vscode.Position(0, 0), originalPosition));
        let last2chars = "";
        if (text.length > 2) {
            last2chars = text.substr(text.length - 2);
        }
        if (last2chars === "</") {
            let closeTag = getCloseTag(text, excludedTags);
            if (closeTag) {
                editor.edit((editBuilder) => {
                    editBuilder.insert(originalPosition, closeTag);
                });
            }
        }
    }

    if ((!isSublimeText3Mode && event.contentChanges[0].text === ">") ||
        (enableAutoCloseSelfClosingTag && event.contentChanges[0].text === "/")) {
        let textLine = editor.document.lineAt(selection.start);
        let text = textLine.text.substring(0, selection.start.character + 1);
        let result = /<([a-zA-Z][a-zA-Z0-9:\-]*)(?:\s[^\s<>]*?[^\s/<>=]+?)*?(\s?\/|>)$/.exec(text);
        if (result !== null) {
            if (result[2] === ">") {
                if (excludedTags.indexOf(result[1]) === -1) {
                    editor.edit((editBuilder) => {
                        editBuilder.insert(originalPosition, "</" + result[1] + ">");
                    }).then(() => {
                        editor.selection = new vscode.Selection(originalPosition, originalPosition);
                    });
                }
            } else if ((occurrenceCount(result[0], "'") % 2 === 0) && (occurrenceCount(result[0], "\"") % 2 === 0)) {
                editor.edit((editBuilder) => {
                    editBuilder.insert(originalPosition, ">");
                })
            }
        }
    }
}

function insertCloseTag(): void {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    let selection = editor.selection;
    let originalPosition = selection.start;
    let config = vscode.workspace.getConfiguration('auto-close-tag');
    let excludedTags = config.get<string[]>("excludedTags", []);
    let text = editor.document.getText(new vscode.Range(new vscode.Position(0, 0), originalPosition));
    if (text.length > 2) {
        let closeTag = getCloseTag(text, excludedTags);
        if (closeTag) {
            editor.edit((editBuilder) => {
                editBuilder.insert(originalPosition, closeTag);
            });
        }
    }
}

function getCloseTag(text: string, excludedTags: string[]): string {
    let regex = /<(\/?[a-zA-Z][a-zA-Z0-9:\-]*)(?:\s[^\s<>]*?[^\s/<>=]+?)*?>/g;
    let result = null;
    let stack = [];
    while ((result = regex.exec(text)) !== null) {
        let isStartTag = result[1].substr(0, 1) !== "/";
        let tag = isStartTag ? result[1] : result[1].substr(1);
        if (excludedTags.indexOf(tag) === -1) {
            if (isStartTag) {
                stack.push(tag);
            } else if (stack.length > 0) {
                let lastTag = stack[stack.length - 1];
                if (lastTag === tag) {
                    stack.pop()
                }
            }
        }
    }
    if (stack.length > 0) {
        let closeTag = stack[stack.length - 1];
        if (text.substr(text.length - 2) === "</") {
            return closeTag + ">";
        }
        if (text.substr(text.length - 1) === "<") {
            return "/" + closeTag + ">";
        }
        return "</" + closeTag + ">";
    } else {
        return null;
    }
}

function occurrenceCount(source: string, find: string): number {
    return source.split(find).length - 1;
} 