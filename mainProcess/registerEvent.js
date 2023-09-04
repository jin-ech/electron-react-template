
const { app, ipcMain } = require('electron')
const path = require('path');

module.exports = win => {
    ipcMain.on('close', (event, arg) => {
        win.close();
    });

    // 处理渲染进程发送的请求
    ipcMain.on('getAppData', (event) => {
        const appRootPath = path.dirname(app.getAppPath('exe'));
        // 发送应用程序根路径给渲染进程
        event.reply('appData', { appRootPath });
    });
    
    app.on('activate', function () {
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
};