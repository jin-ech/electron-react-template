/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 13:13:05
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-04 15:02:48
 * @FilePath: \app\app.js
 * @Description: electron 入口文件
 */

const { app, BrowserWindow, Menu } = require('electron')
const path = require('path');

const isDev = !app.isPackaged;

const createProxyService = require('./mainProcess/createProxyService');
const registerEvent = require('./mainProcess/registerEvent');
const registerCommand = require('./mainProcess/registerCommand');

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
    mainWindow.loadURL(isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, './build/index.html')}`)

    // 开发环境默认打开控制台
    if (isDev) {
        mainWindow.webContents.openDevTools();;
    }

    return mainWindow;
}

app.whenReady().then(() => {
    const win = createWindow();
    // 注册自定义事件
    registerEvent(win);
    // 开发环境注册快捷键
    if (isDev) {
        registerCommand(win);
    }
});

// 开发环境开启代理网关&热更新模块
if (isDev) {
    try {
        createProxyService();
        require('electron-reloader')(module);
    }
    catch (_) {}
}
