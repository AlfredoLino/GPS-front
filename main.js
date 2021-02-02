const {app, BrowserWindow, ipcMain, Notification, dialog} = require('electron')

const path = require('path')

const isDev = !app.isPackaged
const createWindow = ()=>{
    const win = new BrowserWindow({
        width: 1325,
        height: 680,
        webPreferences:{
            nodeIntegration: true,
            contextIsolation: false,
            //worldSafeExecuteJavaScript: false,
            preload: path.join(__dirname, 'preload.js')
        },
        minHeight: 680,
        minWidth: 1325,
        
    })
    
    win.loadFile('./src/views/index.html')


}

if(isDev){
    require('electron-reload')(__dirname, {
        electron: path.join(__dirname, "node_modules", '.bin', 'electron')
    })
}

app.whenReady().then(createWindow)
/*
ipcMain.on('notify', (_, message) => {
    new Notification({title: 'Notification', body: message}).show();
})

ipcMain.on('dia', (event, arg)=>{
        
    event.sender.send
    /*
        try{
            const path = dialog.showOpenDialogSync({
                title: "Archivo",
                defaultPath: __dirname,
                buttonLabel: "subir"
            })
            event.reply('a')
        }catch(err){
            event.returnValue("hola")
        }
    
})*/