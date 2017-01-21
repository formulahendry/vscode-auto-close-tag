# Auto Close Tag

[![Marketplace Version](http://vsmarketplacebadge.apphb.com/version/formulahendry.auto-close-tag.svg)](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) [![Installs](http://vsmarketplacebadge.apphb.com/installs/formulahendry.auto-close-tag.svg)](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) [![Rating](http://vsmarketplacebadge.apphb.com/rating/formulahendry.auto-close-tag.svg)](https://marketplace.visualstudio.com/items?itemName=formulahendry.auto-close-tag) [![Build Status](https://travis-ci.org/formulahendry/vscode-auto-close-tag.svg?branch=master)](https://travis-ci.org/formulahendry/vscode-auto-close-tag)

Automatically add HTML/XML close tag, same as Visual Studio IDE or Sublime Text does.

## Features

* Automatically add closing tag when you type in the closing bracket of the opening tag
* After closing tag is inserted, the cursor is between the opening and closing tag
* Set the tag list that would not be auto closed
* Automatically close self-closing tag
* Support auto close tag as Sublime Text 3
* Use Keyboard Shortcut or Command Palette to add close tag manually

## Usages

After typing in the closing bracket of the opening tag, the closing tag will be inserted automatically.

![Usage](images/usage.gif)

To add close tag manually, use shortcut `Alt+.` (`Command+Alt+.` for Mac), or press `F1` and then select/type `Close Tag`

![Usage](images/close-tag.gif)

## Sublime Text 3 Mode

To automatically add close tag when `</` is typed (same as Sublime Text 3 does), set the below config as `true`:
```json
{
    "auto-close-tag.SublimeText3Mode": true
}
```
The setting is `false` by default.

![Sublime Text 3](images/st3.gif)

## Configuration

Use `auto-close-tag.enableAutoCloseTag` to set whether to insert close tag automatically (it is `true` by default):
```json
{
    "auto-close-tag.enableAutoCloseTag": true
}
```

To set whether to close self-closing tag automatically (e.g. type `<br`, then type `/`, `>` will be added automatically) (it is `true` by default):
```json
{
    "auto-close-tag.enableAutoCloseSelfClosingTag": true
}
```

Add entry into `auto-close-tag.activationOnLanguage` to set the languages that the extension will be activated.
By default, it is `["*"]` and will be activated for all languages.
```json
{
    "auto-close-tag.activationOnLanguage": [
        "html",
        "xml",
        "php",
        "javascript"
    ]
}
```
**Note:** The setting should be set with language id defined in [VS Code](https://github.com/Microsoft/vscode/tree/master/extensions). Taking [javascript definition](https://github.com/Microsoft/vscode/blob/master/extensions/javascript/package.json) as an example, we need to use `javascript` for `.js` and `.es6`, use `javascriptreact` for `.jsx`. So, if you want to enable this extension on `.js` file, you need to add `javascript` in settings.json.

You could also set the tag list that would not be auto closed. Below are the default settings for void elements in HTML per [W3C spec](https://www.w3.org/TR/html-markup/syntax.html#syntax-elements), and you could overwrite it:
```json
{
    "auto-close-tag.excludedTags": [
        "area",
        "base",
        "br",
        "col",
        "command",
        "embed",
        "hr",
        "img",
        "input",
        "keygen",
        "link",
        "meta",
        "param",
        "source",
        "track",
        "wbr"
    ]
}
```

## Change Log
See Change Log [here](CHANGELOG.md)

## Issues
Submit the [issues](https://github.com/formulahendry/vscode-auto-close-tag/issues) if you find any bug or have any suggestion.

## Contribution
Fork the [repo](https://github.com/formulahendry/vscode-auto-close-tag) and submit pull requests.

## Blog
Visit the [blog](https://blogs.msdn.microsoft.com/formulahendry) or the [post](https://blogs.msdn.microsoft.com/formulahendry/2016/06/29/auto-close-tag-for-visual-studio-code/) for more detailed info 