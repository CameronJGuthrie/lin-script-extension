import * as vscode from "vscode";

export function isRootWorkspace(): boolean {
  return vscode.workspace.workspaceFolders?.[0]?.name === "workspace";
}
