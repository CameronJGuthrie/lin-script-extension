import * as vscode from "vscode";

import { linscriptFunctions } from "./linscript-functions";
import { createCompleteFunctionRegex, getArgumentsFromFunctionLike } from "./string-util";

export function activate(context: vscode.ExtensionContext) {
  // Create a decoration type for the inline hints
  const decorationType = vscode.window.createTextEditorDecorationType({
    after: {
      fontStyle: "italic",
      color: "gray",
    },
  });

  const updateDecorations = (editor: vscode.TextEditor) => {
    const decorations: vscode.DecorationOptions[] = [];

    linscriptFunctions.forEach((functionDetails) => {
      const document = editor.document;
      const text = document.getText();

      const completeFunctionRegex = createCompleteFunctionRegex(
        functionDetails.name,
        functionDetails.parameters.length
      );

      let match;

      while ((match = completeFunctionRegex.exec(text)) !== null) {
        const matchIndex = match.index;

        const args = getArgumentsFromFunctionLike(match[0]);

        if (args.length !== functionDetails.parameters.length) {
          throw new Error("FATAL: function parameters and expected args differ in length");
        }

        args.forEach(([stringIndex, argValue], argIndex) => {
          const param = functionDetails.parameters[argIndex];
          const rangePos = document.positionAt(matchIndex + stringIndex); // Position for each parameter
          const isFirstParameter = argIndex === 0;

          let contentText;

          if (param.unknown) {
            contentText = "?=";
          } else if (param.values && argValue in param.values) {
            contentText = `${param.name}=${param.values[argValue]} `;
          } else {
            contentText = `${param.name}=`;
          }

          decorations.push({
            range: new vscode.Range(rangePos, rangePos),
            renderOptions: {
              after: {
                contentText,
                margin: isFirstParameter ? "0 0 0 0" : "0 0 0 0",
              },
            },
          });
        });
      }
    });

    editor.setDecorations(decorationType, decorations);
  };

  // Listen for changes in the active text editor
  vscode.window.onDidChangeActiveTextEditor((editor) => {
    if (editor) {
      updateDecorations(editor);
    }
  });

  // Listen for changes in the text editor
  vscode.workspace.onDidChangeTextDocument((event) => {
    const editor = vscode.window.activeTextEditor;
    if (editor && event.document === editor.document) {
      updateDecorations(editor);
    }
  });

  // Initial decoration update for the active editor
  if (vscode.window.activeTextEditor) {
    updateDecorations(vscode.window.activeTextEditor);
  }
}

export function deactivate() {}
