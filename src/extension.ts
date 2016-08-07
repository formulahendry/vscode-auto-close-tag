'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "auto-close-tag" is now active!');

    vscode.workspace.onDidChangeTextDocument(event => {
        insertCloseTag(event);
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function insertCloseTag(event: vscode.TextDocumentChangeEvent): void {
    if (event.contentChanges[0].text !== ">") {
        return;
    }

    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }

    let languageId = editor.document.languageId;
    let config = vscode.workspace.getConfiguration('auto-close-tag');
    let languages = config.get<string[]>("activationOnLanguage", ["*"]);
    if (languages.indexOf("*") === -1 && languages.indexOf(languageId) === -1) {
        return;
    }

    let selection = editor.selection;
    let textLine = editor.document.lineAt(selection.start);
    let originalPosition = selection.start.translate(0, 1);
    let text = textLine.text.substring(0, selection.start.character + 1);
    let result = /<([a-zA-Z][a-zA-Z0-9]*)(?:\s[^\s<>]*?[^\s/<>]+?)*?>$/g.exec(text);
    if (result !== null) {
        let excludedTags = config.get<string[]>("excludedTags", []);
        if (excludedTags.indexOf(result[1]) === -1) {
            editor.edit((editBuilder) => {
                editBuilder.insert(originalPosition, "</" + result[1] + ">");
            }).then(() => {
                editor.selection = new vscode.Selection(originalPosition, originalPosition);
            });
        }
    }

}