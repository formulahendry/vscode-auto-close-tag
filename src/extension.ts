'use strict';
import * as vscode from 'vscode';
import getCloseTag from './getCloseTag';

export function activate(context: vscode.ExtensionContext) {
    vscode.workspace.onDidChangeTextDocument(event => {
        insertAutoCloseTag(event);
    });

    const closeTag = vscode.commands.registerCommand('auto-close-tag.closeTag', () => {
        insertCloseTag();
    });

    context.subscriptions.push(closeTag);
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function insertAutoCloseTag(event: vscode.TextDocumentChangeEvent): void {
    if (!event.contentChanges[0]) {
        return;
    }
    const isRightAngleBracket = CheckRightAngleBracket(event.contentChanges[0]);
    if (!isRightAngleBracket && event.contentChanges[0].text !== '/') {
        return;
    }

    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const config = vscode.workspace.getConfiguration('auto-close-tag', editor.document.uri);
    if (!config.get<boolean>('enableAutoCloseTag', true)) {
        return;
    }

    const languageId = editor.document.languageId;
    const languages = config.get<string[]>('activationOnLanguage', ['*']);
    if (languages.indexOf('*') === -1 && languages.indexOf(languageId) === -1) {
        return;
    }

    const selection = editor.selection;
    const originalPosition = selection.start.translate(0, 1);
    const excludedTags = config.get<string[]>('excludedTags', []);
    const isSublimeText3Mode = config.get<boolean>('SublimeText3Mode', false);
    const enableAutoCloseSelfClosingTag = config.get<boolean>('enableAutoCloseSelfClosingTag', true);
    const isFullMode = config.get<boolean>('fullMode');

    if ((isSublimeText3Mode || isFullMode) && event.contentChanges[0].text === '/') {
        const text = editor.document.getText(new vscode.Range(new vscode.Position(0, 0), originalPosition));
        let last2chars = '';
        if (text.length > 2) {
            last2chars = text.slice(text.length - 2);
        }
        if (last2chars === '</') {
            let closeTag = getCloseTag(text, excludedTags);
            if (closeTag) {
                let nextChar = getNextChar(editor, originalPosition);
                if (nextChar === '>') {
                    closeTag = closeTag.slice(0, closeTag.length - 1);
                }
                editor.edit((editBuilder) => {
                    editBuilder.insert(originalPosition, closeTag);
                }).then(() => {
                    if (nextChar === '>') {
                        editor.selection = moveSelectionRight(editor.selection, 1);
                    }
                });
            }
        }
    }

    if (((!isSublimeText3Mode || isFullMode) && isRightAngleBracket) ||
        (enableAutoCloseSelfClosingTag && event.contentChanges[0].text === '/')) {
        const textLine = editor.document.lineAt(selection.start);
        const text = textLine.text.slice(0, selection.start.character + 1);
        const result = /<([a-zA-Z][a-zA-Z0-9:\-_.]*)(?:\s+[^<>]*?[^\s/<>=]+?)*?\s?(\/|>)$/.exec(text);
        if (result !== null && ((occurrenceCount(result[0], "'") % 2 === 0)
            && (occurrenceCount(result[0], '"') % 2 === 0) && (occurrenceCount(result[0], '`') % 2 === 0))) {
            if (result[2] === '>') {
                if (excludedTags.indexOf(result[1].toLowerCase()) === -1) {
                    editor.edit((editBuilder) => {
                        editBuilder.insert(originalPosition, '</' + result[1] + '>');
                    }).then(() => {
                        editor.selection = new vscode.Selection(originalPosition, originalPosition);
                    });
                }
            } else {
                if (textLine.text.length <= selection.start.character + 1 || textLine.text[selection.start.character + 1] !== '>') { // if not typing "/" just before ">", add the ">" after "/"
                    editor.edit((editBuilder) => {
                        editBuilder.insert(originalPosition, '>');
                    });
                }
            }
        }
    }
}

function CheckRightAngleBracket(contentChange: vscode.TextDocumentContentChangeEvent): boolean {
    return contentChange.text === '>' || CheckRightAngleBracketInVSCode_1_8(contentChange);
}

function CheckRightAngleBracketInVSCode_1_8(contentChange: vscode.TextDocumentContentChangeEvent): boolean {
    return contentChange.text.endsWith('>') && contentChange.range.start.character === 0
        && contentChange.range.start.line === contentChange.range.end.line
        && !contentChange.range.end.isEqual(new vscode.Position(0, 0));
}

function insertCloseTag(): void {
    const editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    const selection = editor.selection;
    const originalPosition = selection.start;
    const config = vscode.workspace.getConfiguration('auto-close-tag', editor.document.uri);
    const excludedTags = config.get<string[]>('excludedTags', []);
    const text = editor.document.getText(new vscode.Range(new vscode.Position(0, 0), originalPosition));
    if (text.length > 2) {
        const closeTag = getCloseTag(text, excludedTags);
        if (closeTag) {
            editor.edit((editBuilder) => {
                editBuilder.insert(originalPosition, closeTag);
            });
        }
    }
}

function getNextChar(editor: vscode.TextEditor, position: vscode.Position): string {
    const nextPosition = position.translate(0, 1);
    const text = editor.document.getText(new vscode.Range(position, nextPosition));
    return text;
}



function moveSelectionRight(selection: vscode.Selection, shift: number): vscode.Selection {
    const newPosition = selection.active.translate(0, shift);
    return new vscode.Selection(newPosition, newPosition);
}

function occurrenceCount(source: string, find: string): number {
    return source.split(find).length - 1;
} 
