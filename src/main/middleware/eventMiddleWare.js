/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-09 15:17:37
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-10-08 17:40:56
 * @FilePath: \electron-next-template\middleware\eventMiddleWare.js
 * @Description: 事件注册插件
 */

module.exports = ({ win, app, ipcMain, rumtime }, next) => {
    const { Notification } = require('electron');
    const path = require('path');

    // 客户端加载完毕
    win.webContents.on('did-finish-load', () => {
        // TODO
    });

    // 监听来自渲染进程的事件
    ipcMain.on('resize-request', event => {
        const isMaximized = win.isMaximized();
        event.sender.send('window-resize', isMaximized);
    });

    win.on('resize', () => {
        const isMaximized = win.isMaximized();
        win.webContents.send('window-resize', isMaximized);
    });

    ipcMain.on('hide', () => {
        win.hide();
    });

    ipcMain.on('close', () => {
        app.quit();
        rumtime?.kill();
    });

    ipcMain.on('minimize', () => {
        win.minimize();
    });

    ipcMain.on('maximize', () => {
        win.maximize();
    });

    ipcMain.on('unmaximize', () => {
        win.unmaximize();
    });

    // 处理渲染进程发送的请求
    ipcMain.on('client-getAppData', event => {
        const appRootPath = path.dirname(app.getAppPath('exe'));
        // 发送应用程序信息给渲染进程
        event.reply('main-appData', { appRootPath });
    });

    ipcMain.on('notification', (_, args) => {
        new Notification({
            title: 'info',
            body: args.message
        }).show();
    });

    app.on('activate', () => {
        // On macOS it's common to re-create a window in the app when the
        // dock icon is clicked and there are no other windows open.
        // eslint-disable-next-line no-undef
        if (BrowserWindow.getAllWindows().length === 0) {
            // eslint-disable-next-line no-undef
            createWindow();
        }
    });

    app.on('window-all-closed', function () {
        // if (process.platform !== 'darwin') {
        //     app.quit();
        // }
    });
    next();
};
