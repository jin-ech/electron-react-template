/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 13:13:05
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 23:36:13
 * @FilePath: \app\app.js
 * @Description: electron 入口文件
 */
// Modules to control application life and create native browser window
const { app, BrowserWindow, ipcMain, globalShortcut, Menu, contextBridge, ipcRenderer } = require('electron')
const path = require('path');

const isDev = !app.isPackaged;

let rootWindow = null;

function createWindow() {
    // Create the browser window.
    const mainWindow = new BrowserWindow({
        title: 'electron-react-template',
        icon: path.join(__dirname, './public/favicon.ico'),
        width: 1200,
        height: 780,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            contentSecurityPolicy: "default-src 'self'; script-src 'self';"
        }
    });

    // hidden menus
    const menu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(menu);

    // and load the index.html of the app.
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`)

    if (isDev) {
        mainWindow.webContents.openDevTools();;
    }

    rootWindow = mainWindow;
}

ipcMain.on('close', (event, arg) => {
    rootWindow.close();
});

// 处理渲染进程发送的请求
ipcMain.on('getAppData', (event) => {
    const appRootPath = path.dirname(app.getAppPath('exe'));
    // 发送应用程序根路径给渲染进程
    event.reply('appData', { appRootPath });
});

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
    createWindow();
    // // 向客户端插入 JavaScript 代码
    // rootWindow.webContents.executeJavaScript(`
    //     console.log('this is a log');
    // `);
    if (isDev) {
        globalShortcut.register('Alt+CommandOrControl+I', () => {
            rootWindow.webContents.openDevTools();
        });
        globalShortcut.register('CommandOrControl+R', () => {
            rootWindow.webContents.reload();
        });
    }

    app.on('activate', function () {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        if (BrowserWindow.getAllWindows().length === 0) createWindow()
    })
});

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

/**
 * @description: create service
 * @return {*}
 */
(() => {
    const express = require('express');
    const cors = require('cors');
    const request = require('request');
    const service = express();
    service.use(cors());

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
})();