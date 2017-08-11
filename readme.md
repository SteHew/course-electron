# Electron Desktop Apps

## Electron Introduction:

Electron is a opensource project that creates native applications using web technologies. Rather than wrapping these webpages inside of a special frame, Electron is able to target the native api's of macOS, Windows and Linux directly.

It does this by combining Nodejs and the Chromium Engine.
Because the apps are native, they can do things native apps can do. This means, you can write content to a harddrive, and interact with the filesystem that is on it.

---

## Electron Parts:

Quick one-liner overview off each part of the app.

* `package.json` - Lists all the meta data and settings for app, without this the app cannot run.
* `main.js` - Creates main starting processes and objects
* `node_modules` folder, the plugins that are downloaded after the `npm install` command.
* `index.html` - base page for the project

> Note: `main.js` is a name by convention, but it can be called whatever you want it to be, as long as it is referenced in the `package.json` file

> Note: `index.html` is a name by convention, but it can be called whatever you want it to be. You just need to call it from the js process file.

---


  