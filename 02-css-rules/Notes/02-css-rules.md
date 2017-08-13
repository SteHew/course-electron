---
gitrepo: "https://github.com/bcsjk11/electron-basic-start/blob/master/NOTES/02-css-rules.md"


---

# Electron Desktop Apps

| Course | Semester | Week | Type | Learning Outcome |
| :--- | :--- | :--- | :--- | :-- |
| ![badge](https://img.shields.io/badge/Course-COMP6001-0099cc.svg) |![badge](https://img.shields.io/badge/Semester-17B-red.svg) |![badge](https://img.shields.io/badge/Week-01-green.svg) | ![badge](https://img.shields.io/badge/Type-Notes-orange.svg) | ![badge](https://img.shields.io/badge/LO-1-yellow.svg)

---

## CSS location

---

Since the basic structure of an Electron app is essentially like a website [or a nodejs application] we can use the same folder structure as one.

> **Just a reminder on conventions:**<br>
*Keep your folders all in lower-case so that it is easier to match them in your code. Javascript is a case sensitive language which is our base language.*

Therefore it makes sense to create a folder called `css` and place in the root directory of your project. If you create a file called styles.css in that folder then you can access it in your `HTML` file using:

`<link rel="stylesheet" href="css/styles.css">`

---

## CSS properties

---

Electron uses web technologies so as part of that CSS manages the "look" and "feel" of the app.  
If you build the app from the previous lab, you would have noticed that you cannot move it around the screen.

This is because we set the `frame` to `false` and set the `titleBar` to `hidden`.

We are able to set the properties to move the application around the screen in other blocks, by applying some css rules. This will return a more `native-feel` to the application.

| CSS Property: Value | Description |
| --- | --- |
| `-webkit-app-region: no-drag;` | Stop the window from being dragged from selecting a specific element on a page |
| `-webkit-app-region: drag;` | An element can now be selected and drag the whole window |
| `-webkit-user-select: none;` | Stop an item or text from being selected |

An example for basic titlebar would be:

In your HTML set create a tag and give it the class `titlebar` so that it can matched in your css.

```html
<header class="titlebar">Click and Drag</header>
```
In your css file, create a rule for the `.titlebar` class. In the example below it also disable text selection for all the items.

```css
.titlebar {
    /* adding the ability to drag the app on this class */
    -webkit-app-region: drag;

    /* position, margin and padding */
    position: relative;
    top:0;
    left: 0;
    margin: 0;
    padding: 5px;
    box-sizing: border-box;

    /* set the width and colors */
    width: 100%;
    height: 50px;
    background-color: purple;
    color: white;

    /* font properties */
    text-align: center;
    font-family: arial;
    font-size: 20px;
}

/* Disable text selection on the following elements */
h1, h2, h3, h4, h5, h6, p {
    -webkit-user-select: none;
}
```

Which creates something like this:

![titlebar](../../images.Titlebar.gif)

> NOTE: You are able to set the `-webkit-app-region:` property on the whole app, but the user experience would not feel natural and may confuse the end user.

---

## Other CSS

---

The rest of the CSS is completely normal so if you want to add any other rules or libraries like bootstrap, you are free to do that.