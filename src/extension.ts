import * as vscode from "vscode";

import { registerDecoration } from "./features/decoration";
import { registerLinscriptWatcher, registerLinWatcher } from "./features/watcher";
import { isRootWorkspace } from "./features/workspace";

export function activate(context: vscode.ExtensionContext) {
  if (isRootWorkspace()) {
    registerLinWatcher(context);
    registerLinscriptWatcher(context);
  }
  registerDecoration();
}

export function deactivate() {}
