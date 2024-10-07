import * as vscode from "vscode";

import { registerDecoration } from "./features/decoration";
import { registerLinscriptWatcher, registerLinWatcher } from "./features/watcher";

export function activate(context: vscode.ExtensionContext) {
  console.log("Activating extension");

  registerLinWatcher(context);
  registerLinscriptWatcher(context);

  registerDecoration();
}

export function deactivate() {}
