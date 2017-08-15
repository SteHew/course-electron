const electron = require('electron');
const BrowserWindow = electron.BrowserWindow;
const app = electron.app;

let win

let createWindow = () => {

    win = new BrowserWindow({frame: false, titlebar: 'hidden', width: 300, height: 120, x: 10, y: 10})
    win.loadURL('file://' + __dirname + '/index.html')

    win.on('closed', () => {
        win = null
    })
}

app.on('ready', createWindow);

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
      app.quit()
    }
  })
  
  app.on('activate', () => {
    if (win === null) {
      createWindow()
    }
  })