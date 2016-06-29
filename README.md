# Auto Close Tag

![Marketplace Version](http://vsmarketplacebadge.apphb.com/version/formulahendry.auto-close-tag.svg) ![Installs](http://vsmarketplacebadge.apphb.com/installs/formulahendry.auto-close-tag.svg) ![Rating](http://vsmarketplacebadge.apphb.com/rating/formulahendry.auto-close-tag.svg)

Automatically add close tag, same as Visual Studio IDE does.

## Features

* Automatically add closing tag when you type in the closing bracket of the opening tag
* After closing tag is inserted, the cursor is between the opening and closing tag

## Usages

After typing in the closing bracket of the opening tag, the closing tag will be inserted automatically.

![Usage](images/usage.gif)

## Configuration

Add entry into `auto-close-tag.activationOnLanguage` to set the languages that the extension will be activated.
By default, it is ["*"] and will be activated for all languages.
```json
{
    "auto-close-tag.activationOnLanguage": [
        "html",
        "xml",
        "php"
    ]
}
```

## Change Log
### 0.0.2
* Add configuration to set the languages that the extension will be activated
* Add support for tag with attribute. e.g. <a href="https://www.microsoft.com"></a>, so </a> will be Automatically added.
* Minor bug fix

### 0.0.1
* Initial Release

## Issues
Submit the [issues](https://github.com/formulahendry/vscode-auto-close-tag/issues) if you find any bug or have any suggestion.

## Contribution
Fork the [repo](https://github.com/formulahendry/vscode-auto-close-tag) and submit pull requests.