/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-09 19:14:53
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-09 19:32:13
 * @FilePath: \electron-react-template\middleware\coreMiddleWare.js
 * @Description: 基础&核心功能注册
 */

const { Menu, Tray, shell } = require("electron");

module.exports = ({ app, isDev }, next) => {

    // 隐藏菜单
    const menu = Menu.buildFromTemplate([]);
    Menu.setApplicationMenu(menu);

    // 设置系统托盘
    const tray = new Tray(isDev ? './public/favicon.ico' : process.resourcesPath + '/static/icons/favicon.ico');
    const contextMenu = Menu.buildFromTemplate([
        { label: 'github', type: 'normal', click: () => shell.openExternal('https://github.com/jin-ech/electron-react-template') },
        { label: '退出应用', type: 'normal', click: () => app.quit() }
    ])
    tray.setToolTip('electron-react-template');
    tray.setContextMenu(contextMenu);

    next();
};
