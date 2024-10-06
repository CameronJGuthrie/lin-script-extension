import * as vscode from "vscode";

import { linscriptFunctions } from "./linscript-functions";
import { createCompleteFunctionRegex, findIndexesOf } from "./regex-help";

export function activate(context: vscode.ExtensionContext) {
  // Create a decoration type for the inline hints
  const decorationType = vscode.window.createTextEditorDecorationType({
    after: {
      fontStyle: "italic",
      color: "gray",
    },
  });

  linscriptFunctions.forEach((functionDetails) => {
    const updateDecorations = (editor: vscode.TextEditor) => {
      const document = editor.document;
      const text = document.getText();

      const completeFunctionRegex = createCompleteFunctionRegex(
        functionDetails.name,
        functionDetails.parameters.length
      );

      const decorations: vscode.DecorationOptions[] = [];
      let match;

      while ((match = completeFunctionRegex.exec(text)) !== null) {
        const matchIndex = match.index;

        const firstSlot = findIndexesOf("(", match[0]);
        // Shift over one so that the hint is next to the parameter rather then the comma
        const secondSlots = findIndexesOf(",", match[0]).map((i) => i + 1);

        const separatorLocalMatchIndexes = [...firstSlot, ...secondSlots];

        if (separatorLocalMatchIndexes.length !== functionDetails.parameters.length) {
          throw new Error("FATAL: function parameters differ in length");
        }

        // Indexes of either ',' or '('
        separatorLocalMatchIndexes.forEach((stringIndex, arrayIndex) => {
          const param = functionDetails.parameters[arrayIndex];
          const rangePos = document.positionAt(matchIndex + stringIndex + 1); // Position for each parameter
          const isFirstParameter = arrayIndex === 0;

          decorations.push({
            range: new vscode.Range(rangePos, rangePos),
            renderOptions: {
              after: {
                contentText: `${param.name}=`, // Inline hint for each parameter
                margin: isFirstParameter ? "0 0 0 0" : "0 0 0 0",
              },
            },
          });
        });
      }

      // TODO: Nice to Have feature to show functions when writing them

      // const incompleteFunctionRegex = createIncompleteFunctionRegex(
      //   functionDetails.name,
      //   functionDetails.parameters.length
      // );

      // while ((match = incompleteFunctionRegex.exec(text)) !== null) {
      //   const matchIndex = match.index;
      //   const rangePos = document.positionAt(matchIndex + match[0].length - 1); // Position for each parameter

      //   decorations.push({
      //     range: new vscode.Range(rangePos, rangePos),
      //     renderOptions: {
      //       after: {
      //         // contentText: `${functionDetails.name}(${functionDetails.parameters.join(",")})`, // Inline hint for each parameter
      //         contentText: `Banana`, // Inline hint for each parameter
      //       },
      //     },
      //   });
      // }

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
  });
}

export function deactivate() {}
