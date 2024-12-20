import * as assert from "assert";
import * as vscode from "vscode";
import { TagProvider } from "../tagProvider"; // Your tag provider class

suite("Tag Provider Tests", () => {
  let tagProvider: TagProvider;
  const mockContext = {
    workspaceState: {
      get: () => {
        return undefined;
      },
      update: () => {},
    },
  } as unknown as vscode.ExtensionContext;

  setup(() => {
    tagProvider = new TagProvider(mockContext);
  });

  test("Should find tags with @", async () => {
    const doc = await vscode.workspace.openTextDocument({
      content: `
          // test @user1
          // other comment
          // test @user2 other comment
      `,
    });
    await tagProvider.updateTags(doc);
    const tags = tagProvider.tags;
    assert.strictEqual(tags.length, 2);
    assert.strictEqual(tags[0].user, "user1");
    assert.strictEqual(tags[1].user, "user2");
  });
  test("Should find tags with #", async () => {
    const doc = await vscode.workspace.openTextDocument({
      content: `
               // test #user1
               // other comment
               // test #user2 other comment
           `,
    });
    await tagProvider.updateTags(doc);
    const tags = tagProvider.tags;
    assert.strictEqual(tags.length, 2);
    assert.strictEqual(tags[0].user, "user1");
    assert.strictEqual(tags[1].user, "user2");
  });
  test("Should not find any tags without # or @", async () => {
    const doc = await vscode.workspace.openTextDocument({
      content: `
            // test user1
            // other comment
            // test user2 other comment
        `,
    });
    await tagProvider.updateTags(doc);
    const tags = tagProvider.tags;
    assert.strictEqual(tags.length, 0);
  });
});
