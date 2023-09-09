/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-09 15:17:37
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-09 21:34:29
 * @FilePath: \electron-react-template\middleware\commandMiddleWare.js
 * @Description: 快捷键注册插件
 */

module.exports = ({ win, globalShortcut }, next) => {
    const commands = [
        {
            command: 'CommandOrControl+F12',
            task: win => {
                if (win.webContents.isDevToolsOpened()) {
                    win.webContents.closeDevTools();
                }
                else {
                    win.webContents.openDevTools();
                }
            }
        },
        {
            command: 'CommandOrControl+R',
            task: win => {
                win.webContents.reload();
            }
        }
    ];
    commands.forEach(e => {
        globalShortcut.register(e.command, () => e.task(win));
    });
    next();
};