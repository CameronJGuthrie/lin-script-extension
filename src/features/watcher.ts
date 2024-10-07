import * as vscode from "vscode";
import { convertToLin, convertToLinscript } from "./file";

export function registerLinWatcher(context: vscode.ExtensionContext) {
  const watcher = vscode.workspace.createFileSystemWatcher("**/*.lin");

  watcher.onDidCreate(convertToLinscript);

  context.subscriptions.push(watcher);
}

export function registerLinscriptWatcher(context: vscode.ExtensionContext) {
  const watcher = vscode.workspace.createFileSystemWatcher("**/*.linscript");

  watcher.onDidChange(convertToLin);

  context.subscriptions.push(watcher);
}
