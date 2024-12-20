# codeTagger

A VS Code extension that allows you to tag users in code comments, making it easy to track and manage tasks directly within your codebase.

## Features

`codeTagger` provides a simple and efficient way to tag your team members directly in your code comments. This helps streamline communication and task management without leaving your coding environment.

### Key Features:

*   **Tagging Syntax:** Use `@username` or `#username` within code comments to tag team members. For example, `@john` or `#doe`.
*   **Tag Visualization:** A dedicated tree view in the activity bar lists all tagged users, grouped by the user they're assigned to.
*   **Navigation:** Click on a tagged user in the tree view to jump directly to the corresponding file and line in your code.
*   **Persistent Storage:** Tags are stored within your workspace, ensuring your tag information persists across VS Code sessions and even when you close and re-open the project.
*   **Real-Time Updates:** The tag view automatically updates when you add, edit, or delete tags in your code.
*   **Clear Tags:** A command to clear all existing tags from the project.
*   **Customizable Tag Icon:** You can customize the icon for the tag in the activity bar through the `codeTagger.tagIcon` settings.
*   **Context Menu:** You can access the `Clear Tags` command directly on the view title.

### Screenshot

![codeTagger example](images/code-tagger-example.png)

*Example of how codeTagger will be displayed.*

## Requirements

`codeTagger` has no external dependencies beyond what comes bundled with VS Code. It should work out of the box with any programming language that supports comments.

## Extension Settings

`codeTagger` contributes the following settings:

*   `codeTagger.tagIcon`: This string defines the icon to be used on the tag view and activity bar. You can change this setting in the VS Code settings menu by searching for "Code Tagger". The default value is "$(tag)".

## Known Issues

*   The extension currently parses comments on files on the `javascript` and `typescript` languages only.
*   The icon badge is limited to show 99 tags max on the UI, anything beyond that will not be displayed.
*   If the icon is changed in the settings, the icon will not be updated until a code change is detected.
*   Large files may cause a performance decrease when parsing.

## Release Notes

### 0.0.1

*   Initial release.
*   Implemented basic tag detection using `@` and `#` prefixes in comments.
*   Implemented basic tree view to display tagged users and tag locations.
*   Added navigation functionality to jump to tagged lines of code.
*   Added `Clear Tags` command.

### 0.0.2

*   Added `Clear Tags` command to the context menu on the view title.
*   Added icon badge to display the number of tags in the project.
*   Added `codeTagger.tagIcon` to be able to change the view icon.

### 0.0.3

*   Fix for test environment.
*   Updated README.

---

## Following extension guidelines

Ensure that you've read through the extensions guidelines and follow the best practices for creating your extension.

*   [Extension Guidelines](https://code.visualstudio.com/api/references/extension-guidelines)

## Working with Markdown

You can author your README using Visual Studio Code. Here are some useful editor keyboard shortcuts:

*   Split the editor (`Cmd+\` on macOS or `Ctrl+\` on Windows and Linux).
*   Toggle preview (`Shift+Cmd+V` on macOS or `Shift+Ctrl+V` on Windows and Linux).
*   Press `Ctrl+Space` (Windows, Linux, macOS) to see a list of Markdown snippets.

## For more information

*   [Visual Studio Code's Markdown Support](http://code.visualstudio.com/docs/languages/markdown)
*   [Markdown Syntax Reference](https://help.github.com/articles/markdown-basics/)

## Author

This extension is developed by \[Quadri Olashina Sikiru].

*   [GitHub Profile](https://github.com/olashina201)
*   [Twitter Profile](https://twitter.com/code_advocate)
*   [LinkedIn Profile](https://linkedin.com/in/quadri-sikiru)

**Enjoy!**