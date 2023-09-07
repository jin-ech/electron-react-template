

module.exports = ({ win, app, ipcMain }, next) => {
    const { Notification } = require('electron');
    const path = require('path');

    // 客户端加载完毕
    win.webContents.on('did-finish-load', () => {
        // TODO
    });

    ipcMain.on('close', (event, arg) => {
        win.close();
    });

    // 处理渲染进程发送的请求
    ipcMain.on('client-getAppData', event => {
        const appRootPath = path.dirname(app.getAppPath('exe'));
        // 发送应用程序根路径给渲染进程
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
        if (BrowserWindow.getAllWindows().length === 0) {
            createWindow();
        }
    });

    app.on('window-all-closed', function () {
        if (process.platform !== 'darwin') {
            app.quit();
        }
    });
    next();
};
