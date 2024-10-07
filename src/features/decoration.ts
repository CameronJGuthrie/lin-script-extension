import * as vscode from "vscode";

import { createCompleteFunctionRegex, getArgumentsFromFunctionLike } from "../shared/string-util";

import { background } from "../functions/Background";
import { interaction } from "../functions/Interaction";
import { item } from "../functions/Item";
import { movie } from "../functions/Movie";
import { sound } from "../functions/Sound";
import { speaker } from "../functions/Speaker";
import { sprite } from "../functions/Sprite";
import { voice } from "../functions/Voice";

const functions = [item, interaction, movie, background, sound, speaker, sprite, voice];

// Create a decoration type for the inline hints
const decorationType = vscode.window.createTextEditorDecorationType({
  after: {
    fontStyle: "italic",
    color: "gray",
  },
});

export function registerDecoration() {
  const updateDecorations = (editor: vscode.TextEditor) => {
    const decorations: vscode.DecorationOptions[] = [];

    functions.forEach((functionDetails) => {
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

        args.forEach(({ stringIndex, argValue }, argIndex) => {
          const param = functionDetails.parameters[argIndex];
          const rangePos = document.positionAt(matchIndex + stringIndex); // Position for each parameter

          let contentText;

          if (param.unused) {
            const endRangePos = document.positionAt(matchIndex + stringIndex + String(argValue).length); // Position for each parameter
            decorations.push({
              range: new vscode.Range(rangePos, endRangePos),
              renderOptions: {
                before: {
                  textDecoration: "line-through", // Strike through the actual text
                  contentText: " ", // Additional content after the text
                  color: "gray",
                  fontStyle: "italic",
                },
                after: {
                  contentText: " ", // Additional content after the text
                  textDecoration: "line-through", // Strikethrough effect for additional content
                },
              },
            });
          } else {
            if (param.handler) {
              // contentText = `${param.name}=${param.handler(args)} `;
              contentText = `${param.handler(args)}=`;
            } else if (param.unknown) {
              contentText = "?=";
            } else if (param.values && argValue in param.values) {
              // contentText = `${param.name}=${param.values[argValue]} `;
              contentText = `${param.values[argValue]}=`;
            } else {
              contentText = `${param.name}=`;
            }

            decorations.push({
              range: new vscode.Range(rangePos, rangePos),
              renderOptions: {
                after: {
                  contentText,
                },
              },
            });
          }
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
