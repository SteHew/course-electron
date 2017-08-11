# Electron Desktop Apps

---

## Electron Introduction:

---

Electron is a opensource project that creates native applications using web technologies. Rather than wrapping these webpages inside of a special frame, Electron is able to target the native api's of macOS, Windows and Linux directly.

It does this by combining Nodejs and the Chromium Engine.
Because the apps are native, they can do things native apps can do. This means, you can write content to a harddrive, and interact with the filesystem that is on it.

---

## Electron Parts:

---

Quick one-liner overview off each part of the app.

* `package.json` - Lists all the meta data and settings for app, without this the app cannot run.
* `main.js` - Creates main starting processes and objects
* `node_modules` folder, the plugins that are downloaded after the `npm install` command.
* `index.html` - base page for the project

> Note: `main.js` is a name by convention, but it can be called whatever you want it to be, as long as it is referenced in the `package.json` file

> Note: `index.html` is a name by convention, but it can be called whatever you want it to be. You just need to call it from the js process file.

---

## Setting up a new project

---

For the purpose of explaining the following parts, the `package.json` calls the `main.js` file. These are created when setting up a new project.

Create your new project by typing in the following commands:

* `git init <project-name>` => Creates folder with a git repository included.
* `cd <project-name>` => Go into the folder you have just created
* `touch main.js package.json` => Creates the 2 base files that any Electron app needs.
* `code .` => Open your favourite code editor (mine is <a href="https://code.visualstudio.com" target="_blank">VSCode</a>)

---

## Setting up `package.json`

---

Next we need to setup the `package.json` so that we can run the application.

In the terminal type in `npm init` and you will be taken through a set of steps. Fill in what is required, press <ENTER> when you want to accept the default value:

There are is an option to accept all the default values, for this you will need to run:
`npm init -f`

Once the `package.json` has been populated you will need to make one change to the file by using a code editor.

Change the script key and value

```json
"scripts": {
"test": "start: electron ."
},
```

into 

```json
"scripts": {
    "start": "electron ."
},
```    

Now we can start the electron app by typing in `npm start`

Technically that is all you need to setup a new project, but at this stage you will not see anything, because you haven't created anything yet. That comes next when we look at the `main.js` file.

---

## Setting up `main.js`

---

The `main.js` file sets up your project and for this you can really create anything, it also depends if you want to create a view (someting you see) which you do most of the time.

The first thing you really need is the following line at the very top.

```js
const {app, BrowserWindow} = require('electron')
```

This creates 2 constants, one called `app` and one called `BrowserWindow` and they are both based on an electron object, but are used for different purposes.

Since we are loading a local `HTML` file, we also need to create 2 more constants. The first one allows use to set the path to a file, and the second sets the url that is loaded in the `BrowserWindow` object.

```js
const path = require('path')
const url = require('url')
```

Next we need to create a variable that will hold the view we are going to create. Since we are using ES6 syntax, we need to set it up after the constants, so we can access it in multiple functions laters on.

```js
let win
```

Now it is time to create the function that will create our browser window (our view). The reason we put it into a function is so that we can create a new instance of this window if we need to at another stage.

Read the comments in the code below to see what each part does:

```js
//Create the function - we use the ES6 syntax for this
let createWindow = () => {
  
    /* 
        Set the value for the win variable, which is an instance of the `BrowserWindow` with a few options:
        * `frame: false`, removes the default menu bar
        * `titleBarStyle:'hidden'` hides the titlebar, now our app is launched center screen and can't be moved.
        * `width and height` sets the frame for the window
        * `minWidth` and `minHeight` set the restriction for the minimum frame size
     */
    win = new BrowserWindow({frame: false, titleBarStyle:'hidden', width: 900, height: 600, minWidth: 400, minHeight: 400})

    /*
        * `.loadURL()` is a function that loads the url
        * `url.format` this function allows us to create a properly formatted URL from a local path
        * `pathname:` uses `path.join()` to set the local inapp directory as the root folder and links to the local index.html file`
        * protocal defines the type of url
        * slashes is set to true, so that they are accepted as part of the url.
    */
    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))  

    /* 
        Loads the Chrome Dev Tools, which are useful for debugging. These should be disabled, by comment or removing the following line, when the app goes into production
    */
    win.webContents.openDevTools()

    /*
        When the window is closed, clear the variable
    */
    win.on('closed', () => {
        win = null
    })
}
```

Now we call the `createWindow()` function when the `app` has finished loading.

```js
app.on('ready', createWindow)
```

The next two parts are specific to macOS. Since we are creating a cross-platform application, we need to accomodate some custom behavior at different times for certain operating systems.

`darwin` is the name of the macOS kernel
The default behavior for a mac app is that the app is not shutdown completely when we close it. Since this is optional we need to specify it intentially

So the code below means that if the app is on windows or linux kill the app when the window is closed.

```js
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})
```

If the app becomes active, but the `win` variable is empty then the instruction is set to create a new window.

This is the reason why the `createWindow()` function was setup as a function and not loaded directly in the `app.on('ready')` function. This way we create a new instance of it when we need to load a new window.

```js
app.on('activate', () => {
  if (win === null) {
    createWindow()
  }
})
```

There ya go - a basic `main.js` is all setup now.

---

## Web files

---

For this project we have very simple `HTML` code and some `CSS` code. This code simply creates a label and a button.

We also have some JavaScript code, which I will briefly explain:

```js
//Create a variable that looks at the id of the button
let button = document.getElementById('mainButton');

//Add an `addEventListener()` to the button so we can call a function when it is clicked
button.addEventListener("click", () => {
    dothis(); //call the function below
});

//This function simply prints out a line to the console.
let dothis = () => {
    console.log("Button Clicked!");
}
```

---

## END OF BASIC_START

---






