# Absolute XPath Button Locator

XPath is a query language, that within the context of web applications is used to precisely locate elements, which comes handy in Selenium testing framework, which is used to simulate website-user interaction.

This project is a Chrome extension, which locates buttons on a current webpage and writes out their absolute (unique) XPath.

There are four types of buttons, which this extension considers:

`<button> <input type="button"> <input type="submit"> <input type="reset">`

## How to run this project

1. Download (and unzip) this repository.

2. Load this as a Chrome extension (locate the folder with manifest.json, popup.html, script.js).

![load.png](readme-pictures%2Fload.png)

3. Pin the extension.

![pin.png](readme-pictures%2Fpin.png)

4. On a desired website open the extension and click the button (example: google.com).

![use.png](readme-pictures%2Fuse.png)