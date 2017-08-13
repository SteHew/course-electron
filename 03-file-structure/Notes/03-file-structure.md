---
gitrepo: "https://github.com/bcsjk11/electron-basic-start/blob/master/NOTES/03-file-structure.md"


---

# Electron Desktop Apps

| Course | Semester | Week | Type | Learning Outcome |
| :--- | :--- | :--- | :--- | :-- |
| ![badge](https://img.shields.io/badge/Course-COMP6001-0099cc.svg) |![badge](https://img.shields.io/badge/Semester-17B-red.svg) |![badge](https://img.shields.io/badge/Week-01-green.svg) | ![badge](https://img.shields.io/badge/Type-Notes-orange.svg) | ![badge](https://img.shields.io/badge/LO-1-yellow.svg)


# File Locations


As mentioned on the [css-rules](02-css-rules) page, the file structure of the electron application resembles that of a web app.

The `main.js` file is called by the `package.json` file. The `main.js` file calls the `index.html` file so if you want to call any other files and funtions from the main page it is good practice and also logical to put those in a separate page.

For example, you can use Javascript to add event listeners, and any other custom functions. These should be placed in a file called `functions.js` inside of a `js` folder.

> NOTE: all the names above are placeholder names with their purpose explained in the file name. You are of course free to call them what you want.

Use the `<link>` tag to call the css files you create

`<link rel="stylesheet" href="css/styles.css">`

Use the `<script>` tag to call the javascript files you want to link to

`<script src="js/functions.js">`


# Using Jquery

Electron is a nodejs app and therefore uses that as the base file. Unlike a normal website we have to use the node package manager to link jquery into our project

If you want to use jquery in your application you can do 1 of 2 things.

## Install them manually as you go

If you only have a sinle dependency to add, or a small number, the following approach is the easiest.

The following command adds the latest jquery library to your project.

`npm install jquery --save`

You can also add them to your dependancy section in your `package.json` file

Update the following section:

```js
"dependencies": {
    "electron": "^1.7.5"
}
```

Into this:

```js
"dependencies": {
    "electron": "^1.7.5",
    "jquery": "^3.2.1"
}
```

Note that the version you may use when you do this module might be newer.

If you don't know what the current version number is set your dependency section to this:

```js
"dependencies": {
    "electron": "*",
    "jquery": "*"
}
```

The risk of course with this last approach is that if anything is changed within the different versions that you depend on it might break your application.

You can find the versions of the libraries you need on the respective websites.

In your `HTML` file you normally would just need the following line:

`<script src="js/jquery.js"></script>`

But to use it with an electron app you need to add the following line instead to it:

`<script>window.$ = window.jQuery = require('jquery');</script>`

If you don't the `$` sign in the jQuery syntax will not be recognised. It is also important that that is the first line when you start defining your `script` tags

The code in your HTML file should look like this:

```html
    </section>

    <!-- THIS MUST COME FIRST -->    
    <script>window.$ = window.jQuery = require('jquery');</script>
    <!-- add any other script files here -->
    <script src="functions.js"></script>
  </body>
```