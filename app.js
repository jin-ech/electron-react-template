/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 13:13:05
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-05 11:17:34
 * @FilePath: \app\app.js
 * @Description: electron 入口文件
 */

const { app, BrowserWindow, Menu } = require('electron')
const path = require('path');

const createProxyService = require('./process/createProxyService');
const registerEvent = require('./process/registerEvent');
const registerCommand = require('./process/registerCommand');
const selfStartingModule = require('./process/selfStartingModule');
const { getClientEnvironment, getLocalIpAddress } = require('./process/utils');

const isDev = !app.isPackaged;
const env = getClientEnvironment(isDev);
const host = getLocalIpAddress() || 'localhost';
const PORT = env.PORT || 3000;

const createWindow = () => {
    // 创建主窗口
    const mainWindow = new BrowserWindow({
        title: 'electron-react-template',
        icon: path.join(__dirname, './public/favicon.ico'),
        width: 1200,
        height: 780,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, './mainProcess/preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            contentSecurityPolicy: "default-src 'self'"
        }
    });

    // 隐藏菜单
    const menu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(menu);

    // 加载app内容
    mainWindow.loadURL(isDev ? `http://${host}:${PORT}` : `file://${path.join(__dirname, './build/index.html')}`)

    return mainWindow;
}

app.whenReady().then(() => {
    const win = createWindow();
    // 注册自定义事件
    registerEvent(win);
    if (isDev) {
        try {
            // 注册快捷键
            registerCommand(win);
            // 默认打开控制台
            win.webContents.openDevTools();;
            // 开启网关代理
            createProxyService(win);
            // 热更新模块
            require('electron-reloader')(module);
            // 自启动模块
            selfStartingModule({ win, host, port: PORT });
        }
        catch (_) {}
    }
});
