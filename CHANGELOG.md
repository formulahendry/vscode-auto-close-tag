### 0.5.5 (2017-12-03)
* Handle void tags that are written in other case than lowercase (HTML tag names are case-insensitive)

### 0.5.4 (2017-11-30)
* Add support for CFML

### 0.5.3 (2017-11-04)
* Add support for Multi Root Workspace

### 0.5.2 (2017-10-22)
* [#65](https://github.com/formulahendry/vscode-auto-close-tag/issues/65): Enable Auto Close Tag on erb file

### 0.5.1 (2017-09-29)
* [#63](https://github.com/formulahendry/vscode-auto-close-tag/issues/63): Handle space before closing parentheses

### 0.5.0 (2017-09-08)
* Not enabled for HTML, Handlebars and Razor files, since VS Code has built-in support from v1.16

### 0.4.3 (2017-06-30)
* [#49](https://github.com/formulahendry/vscode-auto-close-tag/issues/49)

### 0.4.2 (2017-05-22)
* [#46](https://github.com/formulahendry/vscode-auto-close-tag/issues/46): Enable Auto Close Tag on Liquid

### 0.4.1 (2017-05-14)
* Enable Auto Close Tag on more template engines

### 0.4.0 (2017-05-12)
* [#26](https://github.com/formulahendry/vscode-auto-close-tag/issues/26): Enable Auto Close Tag only on a set of languages

### 0.3.12 (2017-05-02)
* Remove 'Keymaps' category per VS Code team's suggestion

### 0.3.11 (2017-04-16)
* Resolve [GitHub issue#33](https://github.com/formulahendry/vscode-auto-close-tag/issues/33): Add config entry to enable both Visual Studio and Sublime Text mode

### 0.3.10 (2017-03-10)
* Resolve [GitHub issue#30](https://github.com/formulahendry/vscode-auto-close-tag/issues/30): Should not close tag inside template literals

### 0.3.9
* Update key binding to align with Sublime Text
* Resolve [GitHub issue#23](https://github.com/formulahendry/vscode-auto-close-tag/issues/23): Tag should not be auto closed inside quotes

### 0.3.8
* Resolve [GitHub issue#20](https://github.com/formulahendry/vscode-auto-close-tag/issues/20): Fix automatic close tag after tab switch

### 0.3.7
* Resolve [GitHub issue#19](https://github.com/formulahendry/vscode-auto-close-tag/issues/19): Fix Auto Close Tag not working in HTML/XML file due to VS Code 1.8 breaking changes

### 0.3.6
* Resolve [GitHub issue#18](https://github.com/formulahendry/vscode-auto-close-tag/issues/18): Support `.` (dot) in tags

### 0.3.5
* Merge [PR #15](https://github.com/formulahendry/vscode-auto-close-tag/pull/15)
  * Avoid closing brackets duplication
  * Support `:-_` in tags

### 0.3.4
* Resolve [GitHub issue#12](https://github.com/formulahendry/vscode-auto-close-tag/issues/12): Path symbol "/" problem

### 0.3.3
* Merge [PR#11](https://github.com/formulahendry/vscode-auto-close-tag/pull/11): Remove left over console.log command

### 0.3.2
* Resolve [GitHub issue#10](https://github.com/formulahendry/vscode-auto-close-tag/issues/10): add support to close self-closing tag automatically in Sublime Text 3 mode

### 0.3.1
* Add support to close self-closing tag automatically

### 0.3.0
* Use Keyboard Shortcut or Command Palette to add close tag manually
* Add config entry to turn on/off auto close tag

### 0.2.0
* Add config entry to support auto close tag of Sublime Text 3 Mode

### 0.1.4
* Resolve [GitHub issue#5](https://github.com/formulahendry/vscode-auto-close-tag/issues/5): arrow function shouldn't trigger auto-close

### 0.1.3
* Resolve [GitHub issue#4](https://github.com/formulahendry/vscode-auto-close-tag/issues/4): providie a config entry to set the tag list that would not be auto closed

### 0.1.2
* Update README.md to clarify the configuration for `auto-close-tag.activationOnLanguage`

### 0.1.1
* Match correct opening tag in some corner cases

### 0.1.0
* Bug fixes
* Add blog info 

### 0.0.3
* Update README.md

### 0.0.2
* Add configuration to set the languages that the extension will be activated
* Add support for tag with attribute. e.g. `<a href="https://www.microsoft.com"></a>`. So `</a>` will be automatically added.
* Minor bug fix

### 0.0.1
* Initial Release