/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 13:13:05
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 16:31:25
 * @FilePath: \app\app.js
 * @Description: electron 入口文件
 */
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, globalShortcut } = require('electron')
const path = require('path');
const url = require('url');

const isDev = !app.isPackaged;

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js')
        }
    })

    // and load the index.html of the app.
    // mainWindow.loadURL('http://localhost:3000');
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`)
    // mainWindow.loadURL(url.format({
    //     pathname: path.join(__dirname, './build/index.html'),
    //     protocol: 'file:',
    //     slashes: true
    // }));

    // Open the DevTools.
    // mainWindow.webContents.openDevTools()

    return mainWindow;
}

ipcMain.on('btnClick', (event, arg) => {
    console.log('arg: ', arg);
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    const mainWindow = createWindow();

    globalShortcut.register('Alt+CommandOrControl+I', () => {
        mainWindow.webContents.openDevTools();
    });

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
})

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', function () {
    if (process.platform !== 'darwin') {
        app.quit();
    }
})

try {
    require('electron-reloader')(module)
} catch (_) { }

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.
const express = require('express');
const cors = require('cors');
const request = require('request');
// const httpProxy  = require('http-proxy');

const service = express();
// const apiProxy = httpProxy.createProxyServer();

service.use(cors());
// // service.use(express.static('./build'));

service.all('/api/*', (req, res) => {
    request.get(req.query.url, (err, _, body) => {
        if (err) {
            console.log('err: ', err);
        }
        else {
            res.end(body);
        }
    })
});

service.listen(3001, () => {
    console.log('Server is running on port 3001');
});
