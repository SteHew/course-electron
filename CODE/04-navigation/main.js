const {app, BrowserWindow, globalShortcut} = require('electron')
const Menu = require('electron').Menu
const path = require('path')
const url = require('url')

let win

let createWindow = () => {

    win = new BrowserWindow({width: 800, height: 600})

    win.loadURL(url.format({
        pathname: path.join(__dirname, 'index.html'),
        protocol: 'file:',
        slashes: true
    }))  

    win.on('closed', () => {
        win = null
    })

    //Shortcuts
    globalShortcut.register('CommandOrControl+Plus+G', () => {
        win.loadURL('https://google.com')
    })

    globalShortcut.register('CommandOrControl+Q', () => {
        app.quit()
    })

    //Menu     
    const template = [
        {

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
        },
        {
            label : 'Menu',
            submenu : [
                {role: 'undo'},
                {role: 'redo'},
                {type: 'separator'},
                {label: "Show Google", accelerator: 'CommandOrControl+G', 
                    click() { win.loadURL('https://google.com') }
                },
                {label: "Submenu",
                    submenu: [
                        {label: "Second Item"}
                    ]
                }
            ]
        },
        {
            label : 'Window',
            role: 'window'
        }
    ]

    if (process.platform === 'darwin') {
        
        template.unshift({
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

        template[0].submenu.push (
            {type: 'separator'},
            {
                label: 'Speech',
                submenu: [
                    {role: 'startspeaking'},
                    {role: 'stopspeaking'}
                ]
            }
        )
    }
    
    const menu = Menu.buildFromTemplate(template)
    Menu.setApplicationMenu(menu)
}

app.on('ready', createWindow)

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