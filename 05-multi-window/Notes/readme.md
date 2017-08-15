---
gitrepo: "https://github.com/bcsjk11/electron-basic-start/blob/master/NOTES/04-menu.md"


---

# Electron Desktop Apps

| Course | Semester | Week | Type | Learning Outcome |
| :--- | :--- | :--- | :--- | :-- |
| ![badge](https://img.shields.io/badge/Course-COMP6001-0099cc.svg) |![badge](https://img.shields.io/badge/Semester-17B-red.svg) |![badge](https://img.shields.io/badge/Week-01-green.svg) | ![badge](https://img.shields.io/badge/Type-Notes-orange.svg) | ![badge](https://img.shields.io/badge/LO-2-yellow.svg)


# Multi Window

Electron offers the option to create a multi-window app. This is kind of logical since we are creating a native desktop application.

We can do this in two ways:

* The first is to define a second Browser Window in our **main.js** file
* The second is to define a Browser Window using a render process

If we define a window in our **main.js** file it opens up when we start the program.
There are uses for this, but what is more common is to open up a new window when we require it.

In HTML when we want to open up a link in a new windows we use the following syntax:

```html
<a href="#link" target="_blank">Content</a>
```

This works fine for a browser, because they are designed to handle the action.
An electron app would also make this work, but if we remove the frame of the parent window the window that pops up inherrits those properties. For that reason we cannot move the child window.

We can get around this, by using a render process.

# Render Process

To understand what a render process does for us. You may have heard that the Chrome browser uses a bit of memory when you use it because every tab is a separate process. This idea transfers in a similar way to Electron, it is based on a Chromium browser.

Everytime we open up another window or start a process of another kind, we invoke an Electron Helper process. A process uses memory and so we want to use them sparingly, or at least give them a focused purpose so that they are not just wasted and cloggin up the system.

The **main.js** file is our main process and that runs on the nodejs system, which is the other part Electron is built on.  
Nodejs is a backend language of javascript and it does not have access to the DOM, it does not exist. The DOM are things like `document.getElementById();`

A render process lives outside of the NodeJS main process, but electron links the two together.
You can use the same code syntax, but the code lives in a different place.

A render process is called from the webpage, the javascript file is linked into that.
That is why we can access the DOM elements.

# Looking at the code

First the main.js does not look any different, we simply call the index.html file and display it.

In the HTML file we display the images:

```html
    <img src="images/facebook.svg" alt="facebook" id="fb">
    <img src="images/twitter.svg" alt="twitter" id="tw">
    <img src="images/youtube.svg" alt="youtube" id="yt">
    <a class="attribution" href="https://medialoot.com/item/simple-social-icons-2013/#" target="_blank"><p>Images by medialoot</p></a>
```

Note that for the purpose of this tutorial the attributions link is the traditional link, so that you can see the difference.

We use some jQuery to make life a little easier, so let's add the links and reference to the app

```html
    <script src="./bower_components/jquery/dist/jquery.js"></script>
    <script>window.$ = window.jQuery = require('./bower_components/jquery/dist/jquery.js');</script>
```

In the script tags we get the `id` values from the images and then we add a event listener to them so we can activate a function when we click on them

```js
let fb = document.getElementById('fb');
let tw = document.getElementById('tw');
let yt = document.getElementById('yt');

fb.addEventListener('click', () => {
    goToPage('https://facebook.com');
})

tw.addEventListener('click', () => {
    goToPage('https://twitter.com');
})

yt.addEventListener('click', () => {
    goToPage('https://youtube.com');
})
```

Lastly we set up the function that is being called. In this function we define a remote object which is part of the electron framework. Then we link the BrowserWindow to the remote object.

The rest should look pretty familar, we are just creating a new browser window like we do in the **main.js** file.

Lastly we stop the default behavior of an event so that it calls the remote object instead.

```js
let goToPage = (url) => {
    const electron = require('electron')
    const remote = electron.remote
    const browser = remote.BrowserWindow

    let subwin = new browser({frame: true, titlebar: 'hidden', width: 800, height: 600})
    subwin.loadURL(url)

    window.addEventListener('contextmenu', (e) => {
        e.preventDefault()
        subwin.popup(remote.getCurrentWindow())
    }, false)
} 
```

> Note: you may have noticed that you did this process in module 4 with the popup menu.
