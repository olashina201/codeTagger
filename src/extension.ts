import * as vscode from "vscode";
import { TagProvider } from "./tagProvider";
import { TagViewProvider } from "./tagView";
import { Tag } from "./types";
import * as path from "path";

let tagCount = 0;

export function activate(context: vscode.ExtensionContext) {
  const tagProvider = new TagProvider(context);
  const updateIcon = (tagCount: number) => {
    const iconPath =
      tagCount > 0
        ? path.join(
            __filename,
            "..",
            "..",
            "resources",
            `tag-count-${tagCount}.svg`
          )
        : path.join(__filename, "..", "..", "resources", `tag.svg`);
    vscode.commands.executeCommand(
      "setContext",
      "code-tagger.hasTags",
      tagCount > 0
    );
    vscode.commands.executeCommand(
      "setContext",
      "code-tagger.iconPath",
      iconPath
    );
  };
  const tagViewProvider = new TagViewProvider(tagProvider, updateIcon);

  vscode.window.registerTreeDataProvider("code-tagger-view", tagViewProvider);

  context.subscriptions.push(
    vscode.workspace.onDidChangeTextDocument((event) =>
      tagProvider.onDidChangeTextDocument(event)
    ),
    vscode.window.onDidChangeActiveTextEditor((editor) => {
      if (editor) {
        tagProvider.updateTags(editor.document);
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
    tagProvider.updateTags(document);
    tagViewProvider.refresh();
  });

  if (vscode.window.activeTextEditor) {
    tagProvider.updateTags(vscode.window.activeTextEditor.document);
  }
  updateIcon(tagProvider.tags.length);
}

export function deactivate() {}
