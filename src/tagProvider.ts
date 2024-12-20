import * as vscode from "vscode";
import { Tag } from "./types";

export class TagProvider {
  private _tags: Tag[] = [];
  private _tagRegex = /(#|@)(\w+)/g; // Matches # or @ followed by one or more word characters

  constructor(private context: vscode.ExtensionContext) {
    this.loadTags();
  }

  public get tags(): Tag[] {
    return this._tags;
  }
  // @Quadri ,nfnd
  private loadTags() {
    const storedTags = this.context.workspaceState.get<Tag[]>("codeTags");
    if (storedTags) {
      this._tags = storedTags;
    }
  }

  private saveTags() {
    this.context.workspaceState.update("codeTags", this._tags);
  }

  public async updateTags(document: vscode.TextDocument): Promise<void> {
    this._tags = []; // Clear existing tags
    const text = document.getText();

    const lines = text.split("\n");

    lines.forEach((line, index) => {
      const tagMatches = line.matchAll(this._tagRegex);
      if (tagMatches) {
        for (const match of tagMatches) {
          const user = match[2];
          const commentText = line.trim(); // whole comment
          this._tags.push({
            user,
            file: document.uri.fsPath,
            line: index + 1,
            text: `${user} on line ${index + 1}`,
            comment: commentText,
          });
        }
      }
    });

    this.saveTags();
  }

  public clearTags() {
    this._tags = [];
    this.saveTags();
  }

  public async onDidChangeTextDocument(
    event: vscode.TextDocumentChangeEvent
  ): Promise<void> {
    if (
      event.document.languageId !== "javascript" &&
      event.document.languageId !== "typescript"
    ) {
      return;
    }
    await this.updateTags(event.document);
  }
}
