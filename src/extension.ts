'use strict';
import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    console.log('Congratulations, your extension "auto-close-tag" is now active!');

    vscode.workspace.onDidChangeTextDocument(event => {
        insertCloseTag();
    });
}

// this method is called when your extension is deactivated
export function deactivate() {
}

function insertCloseTag(): void {
    let editor = vscode.window.activeTextEditor;
    if (!editor) {
        return;
    }
    let selection = editor.selection;
    let textLine = editor.document.lineAt(selection.start);

    if (textLine.range.end.character >= selection.start.character + 1) {
        let originalPosition = selection.start.translate(0, 1);
        let text = textLine.text.substring(0, selection.start.character + 1);
        var result = /<([a-zA-Z0-9]+)>$/g.exec(text);
        if (result !== null) {
            editor.edit((editBuilder) => {
                editBuilder.insert(originalPosition, "</" + result[1] + ">");
            }).then(() => {
                editor.selection = new vscode.Selection(originalPosition, originalPosition);
            });
        }
    }
}