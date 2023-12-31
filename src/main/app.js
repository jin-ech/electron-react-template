/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 13:13:05
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-10-07 11:19:42
 * @FilePath: \app\app.js
 * @Description: electron 入口文件
 */

const { app, BrowserWindow } = require('electron');
const path = require('path');

const AppGenerator = require('./process/appGgenerator');
const coreMiddleWare = require('./middleware/coreMiddleWare');
// const createProxyService = require('./process/createProxyService');
const eventMiddleWare = require('./middleware/eventMiddleWare');
const commandMiddleWare = require('./middleware/commandMiddleWare');
const selftStartMiddleWare = require('./middleware/selfStartMiddleWare');
const { getClientEnvironment, getLocalIpAddress } = require('./middleware/utils');

const isDev = !app.isPackaged;
const env = getClientEnvironment(isDev);
const host = getLocalIpAddress() || 'localhost';
const PORT = env.PORT || 3000;
const preloadPath = path.resolve(__dirname, '../../public/loading.html');
const prodPath = `file://${path.resolve(__dirname, '../../build/index.html')}`;

const createMainWindow = () => {
    // 创建主窗口
    const mainWindow = new BrowserWindow({
        title: 'electron-react-template',
        icon: path.join(__dirname, './public/favicon.ico'),
        width: 1348,
        minWidth: 1082,
        height: 838,
        minHeight: 686,
        frame: false,
        webPreferences: {
            preload: path.join(__dirname, './process/preload.js'),
            nodeIntegration: true,
            contextIsolation: false,
            contentSecurityPolicy: "default-src 'self'"
        }
    });
    // 加载app内容
    isDev ? mainWindow.loadFile(preloadPath) : mainWindow.loadURL(prodPath);
    return mainWindow;
};

app.whenReady().then(() => {
    const win = createMainWindow();
    const $app = AppGenerator.getInstance({
        win,
        isDev,
        port: PORT,
        host
    });
    // 基础&核心功能注册
    $app.use(coreMiddleWare);
    // 注册事件
    $app.use(eventMiddleWare);
    if (isDev) {
        // 注册快捷键
        $app.use(commandMiddleWare);
        // 自启动 & 热更新模块
        $app.use(selftStartMiddleWare);
        // 开启网关代理
        // $app.use(createProxyService);
        // 默认打开控制台
        win.webContents.openDevTools();
    }
    $app.exec();
});
