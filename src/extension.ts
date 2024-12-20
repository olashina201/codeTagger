import * as vscode from "vscode";
import { TagProvider } from "./tagProvider";
import { TagViewProvider } from "./tagView";
import { Tag } from "./types";

export function activate(context: vscode.ExtensionContext) {
  const tagProvider = new TagProvider(context);

  const updateIcon = (tagCount: number) => {
    vscode.commands.executeCommand(
      "setContext",
      "code-tagger.hasTags",
      tagCount > 0
    );
    vscode.commands.executeCommand(
      "setContext",
      "code-tagger.iconPath",
      "$(tag)"
    );
    vscode.commands.executeCommand(
      "setContext",
      "code-tagger.badgeCount",
      tagCount > 0 ? tagCount : ""
    );
  };

  const tagViewProvider = new TagViewProvider(tagProvider, updateIcon);

  vscode.window.registerTreeDataProvider("code-tagger-view", tagViewProvider);

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) => {
      tagProvider.onDidChangeTextDocument(event).then(() => {
        tagViewProvider.refresh();
      });
    }),
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        tagProvider.updateTags(editor.document).then(() => {
          tagViewProvider.refresh();
        });
      }
    }),
    vscode.commands.registerCommand("code-tagger.clearTags", () => {
      tagProvider.clearTags();
      tagViewProvider.refresh();
    }),
    vscode.commands.registerCommand("code-tagger.openTag", (tag: Tag) => {
      vscode.window
        .showTextDocument(vscode.Uri.file(tag.file))
        .then((editor) => {
          const position = new vscode.Position(tag.line - 1, 0);
          editor.revealRange(new vscode.Range(position, position));
          editor.selection = new vscode.Selection(position, position);
        });
    })
  );

  vscode.workspace.onDidSaveTextDocument((document) => {
    tagProvider.updateTags(document).then(() => {
      tagViewProvider.refresh();
    });
  });

  if (vscode.window.activeTextEditor) {
    tagProvider.updateTags(vscode.window.activeTextEditor.document).then(() => {
      tagViewProvider.refresh();
    });
  }
  updateIcon(tagProvider.tags.length || 1);
}

export function deactivate() {}
