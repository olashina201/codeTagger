import * as vscode from "vscode";
import { Tag } from "./types";
import { TagProvider } from "./tagProvider";

export class TagViewProvider implements vscode.TreeDataProvider<Tag> {
  private _onDidChangeTreeData: vscode.EventEmitter<
    Tag | undefined | null | void
  > = new vscode.EventEmitter<Tag | undefined | null | void>();
  readonly onDidChangeTreeData: vscode.Event<Tag | undefined | null | void> =
    this._onDidChangeTreeData.event;

  constructor(
    private tagProvider: TagProvider,
    private _updateIconCallback: (tagCount: number) => void
  ) {}

  refresh(): void {
    this._updateIconCallback(this.tagProvider.tags.length);
    this._onDidChangeTreeData.fire();
  }

  getTreeItem(element: Tag): vscode.TreeItem {
    const treeItem = new vscode.TreeItem(
      `${element.user}: ${element.file} - Line ${element.line}`,
      vscode.TreeItemCollapsibleState.None
    );
    treeItem.tooltip = element.comment;
    treeItem.command = {
      command: "code-tagger.openTag",
      title: "Open Tag",
      arguments: [element],
    };
    return treeItem;
  }

  getChildren(element?: Tag): vscode.ProviderResult<Tag[]> {
    if (element) {
      return [];
    }
    return this.tagProvider.tags;
  }
}
