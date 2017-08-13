---
gitrepo: "https://github.com/bcsjk11/electron-basic-start/blob/master/NOTES/04-menu.md"


---

# Electron Desktop Apps

| Course | Semester | Week | Type | Learning Outcome |
| :--- | :--- | :--- | :--- | :-- |
| ![badge](https://img.shields.io/badge/Course-COMP6001-0099cc.svg) |![badge](https://img.shields.io/badge/Semester-17B-red.svg) |![badge](https://img.shields.io/badge/Week-01-green.svg) | ![badge](https://img.shields.io/badge/Type-Notes-orange.svg) | ![badge](https://img.shields.io/badge/LO-2-yellow.svg)


# Navigation Menu

To create a menu in Electron we need to create a JavaScript array. Basically we want a single menu with the main items that we see in the menu bar and all of the sub items are another array inside of those items. If one of the sub menu items has a sub menu of it's own, that is also represented by another array.

> TIP: since we are nesting arrays inside of each other, code indentation is super important so that we can easily see what menu belongs to what part of the menu overall.

The menu API is built into the electron object that you create at the top. We could just reference that, but perhaps a better way is to set a constant to the Menu API specifically. So add this line to the top of your `main.js`:

```js
const Menu = require('electron').Menu
```

Before we can link the menu to the application we need to create it:

```js
/* Make sure you use the correct order of the brackets:
    * the [] indicate an array
    * the {} indicate we are creating an array of objects.
*/
const template = [{
    //Menu items go here
}]
```
The menu API has a number of keywords that are used for specific reasons:

`label` => What is being displayed to the user
`role` => Predefined menu items
`type` => Define a submenu or a separator
`submenu` => Array to a submenu
`Accelarator` => Set Keyboard shortcut keys
`click` => Set a custom function to the menu

For example take this little menu:

```js
    const template = [{

        label : 'Custom',
        submenu : [
            {role: 'undo'},
            {role: 'redo'},
            {type: 'separator'},
            {label: "Show Google", accelerator: 'CommandOrControl+G', 
                click() { win.loadURL('https://google.com') }
            },
            {label: "Submenu",
                submenu: [
                    {label: "First Item"}
                ]
            }
        ]
    }]
```

The next 2 lines are placed under the menu array and they link the menu to the main application:

```js
//Menu is the constant declared at the top of the file

//.buildFromTemplate() is the method that holds the array with the menu items
const menu = Menu.buildFromTemplate(template)

//.setApplication() links the menu constant into the application
Menu.setApplicationMenu(menu)
```

Once you have done that you should see something like this:

![Menu Bar](../../images.menu-bar.gif)

# Moving the Menu

As you can probably see a menu get can very big very fast and can make the `main.js` file really hard to read.

So we are able to move the menu to a separate file.

In the `js` folder, or where you save your custom javascript files, create a file called `menu-items.js`

**Everything** you added to the `main.js` to do with the menu needs to be moved into this file:

Starting with:

```js
const Menu = require('electron').Menu
```

Next the menu itself:

```js
    const template = [{

        //The whole menu
    }]
```

Then the 2 functions that link the menu to the application:

```js
const menu = Menu.buildFromTemplate(template)
Menu.setApplicationMenu(menu)
```

Next back in the `main.js`file, just before the `createWindow()` ends add this line, to link the menu into the `main.js` file.

```js
require('./js/mainmenu')
```

That should do it.

# Advanced Menu's

That little menu just above includes all the options of what you need for a menu, but let's go over 2 parts in detail

```js
//Previous part of menu
    /* 
        This part is made up of 3 parts:
        * label
        * accelerator
        * click()

        The label should be straight forward
        The accelerator is the keyboard shortcut
        The click() allows you to include a custom function, in this case load the google home page
    */
    {   label: "Show Google", 
        accelerator: 'CommandOrControl+G', 
        click() { win.loadURL('https://google.com') }
    },

    /*  In this section you can see how to add a submemu:
        * label - again should be staright forward
        * submenu, create another array and fill it up with items
    */
    {   label: "Submenu",
        submenu: [
            {label: "First Item"}
        ]
    }
//The rest of the menu
```

# Menu's for macOS

macOS has its application menu displayed at the top and it is replaced by the menu of the current active app.

In addition to this, the name of the app is the first item in the menu, followed by the items off the application. This is different from both Windows and Linux.

For this to work, you need to set up the an extra menu. Often this is the default menu that comes in under the app name.

To do this, place the following code under the menu you have created, but before the menu integration lines:

```js
if (process.platform === 'darwin') {
    //Adding an item to the start of the array
    template.unshift({
        //Set the app name as the menu item label
        label: app.getName(),
        submenu: [
        {role: 'about'},
        {type: 'separator'},
        {role: 'services', submenu: []},
        {type: 'separator'},
        {role: 'hide'},
        {role: 'hideothers'},
        {role: 'unhide'},
        {type: 'separator'},
        {role: 'quit'}
        ]
    })
```

In macOS the app name is always the first item you see after the  symbol. Without the `if statement` above, your first menu will be listed under that name - regardless of the label you had set yourself.

Javascript Arrays have a function called `unshift()` which allows you to add items to the start of the array.

Since `template` is an array, we add another submenu of roles to it and then our own menu appears after it. Because the `unshift()` function is in an `if statement` it will only be added on the app when created for macOS since it is checking if the system is `darwin` based. Darwin is the name of the macOS kernel.

There a few more customisations that can and should be made to make a menu completly macOS friendly. You can find them in <a href="https://electron.atom.io/docs/api/menu/#notes-on-macos-application-menu" target="_blank">the documentation</a>.

# Shortcut keys - Accelerators

You will have noticed that when you look in the menu of an application you will see some keyboard shortcuts for most of the options that are listed.

These are known as **accelerators**, because they accelerate your workflow.

To set these up, you need to do 2 things:

* Make them known to the program
* List them as an option in the menu - or to the user in another way

## Setting up an accelerator

The accelerators need to be set up in the `app.on('ready', createWindow)` function and in our case since we calling a createWindow function we can add them into that. Again if you have a lot of them, you can add them in a seperate file and function and import them into this function.

Before we can set up an accelerator, we need a `globalShortcut` object, which you can add to the:

`const {app, BrowserWindow} = require('electron')` line at the top.

Change the first line into this:

```js
const {app, BrowserWindow, globalShortcut} = require('electron')
```

For now let's place an accelerator into the `createWindow()` function:

```js
    //Use the .register() function to specify the shortcut key follow by the function of what is suppose to happen.
    globalShortcut.register('CommandOrControl+G', () => {
        win.loadURL('https://google.com')
    })
```

<a href="https://electron.atom.io/docs/api/accelerator/#available-modifiers" target="_blank">You can find a list of shortkey options here</a>

<a href="https://electron.atom.io/docs/api/accelerator/#available-key-codes" target="_blank">You can find the key combination list here</a>

By looking at the links above, you can make up the combinations for the shortcuts you wish to create.

As you can see in the code above the links, I am just opening a google page which is bound to the key accelerator of CMD+G on macOS or Ctrl+G on Windows and Linux.

Now if we want to make this shortcut known to the user as part of our menu, we need to use the accelerator parameter as part of our menu setup.

Earlier we had a look at this:

```js
    {   label: "Show Google", 
        accelerator: 'CommandOrControl+G', 
        click() { win.loadURL('https://google.com') }
    },
```

You can see that we have a single object, with 3 properties - label, accelerator and a click() function.
That is it - electron will do the correct aligning for you, we do no need to do anything special.

# Pop up menu - right click

It is also possible to create a custom menu that "pops up" when you right click on your application. 
The example here assumes you have not got the constant Menu created yet, since it is often placed on the `HTML` file itself:

```html
<!-- index.html -->
<script>
//Create the constants you need for your menu
const {remote} = require('electron')
const {Menu, MenuItem} = remote

//Add items to yoru menu, this looks a little different, but we are essentially doing the same - adding menu items to our menu.
const menu = new Menu()
menu.append(new MenuItem({label: 'MenuItem1', click() { console.log('item 1 clicked') }}))
menu.append(new MenuItem({type: 'separator'}))
menu.append(new MenuItem({label: 'MenuItem2', type: 'checkbox', checked: true}))

//Here we are adding the eventListener so it responds to when we right click on our app
window.addEventListener('contextmenu', (e) => {
  e.preventDefault()
  menu.popup(remote.getCurrentWindow())
}, false)
</script>
```

As you experiment with the menu options, you will see that they can get pretty big an complex. Therefore it is good to have a plan and see how you can best put them together using custom functions. This way to stop you from rewriting lot's of code, you can reuse those functions in several places.