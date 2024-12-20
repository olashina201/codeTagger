import * as vscode from "vscode";
import { Tag } from "./types";
import { TagProvider } from "./tagProvider";

export class TagViewProvider implements vscode.TreeDataProvider<Tag | string> {
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

  getTreeItem(element: Tag | string): vscode.TreeItem {
    if (typeof element === "string") {
      return new vscode.TreeItem(
        element,
        vscode.TreeItemCollapsibleState.Collapsed
      );
    }
    const treeItem = new vscode.TreeItem(
      `${element.file} - Line ${element.line}`,
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

  getChildren(element?: Tag | string): vscode.ProviderResult<Tag[] | string[]> {
    if (!element) {
      const userTags = new Map<string, number>();
      this.tagProvider.tags.forEach((tag) => {
        const count = userTags.get(tag.user) || 0;
        userTags.set(tag.user, count + 1);
      });
      return Array.from(userTags.keys());
    }
    if (typeof element === "string") {
      return this.tagProvider.tags.filter((tag) => tag.user === element);
    }

    return [];
  }
}
