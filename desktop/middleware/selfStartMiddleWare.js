/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-09 15:17:37
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-09 20:21:26
 * @FilePath: \electron-react-template\middleware\selfStartMiddleWare.js
 * @Description: 自启动模块(仅开发环境启用)
 */

module.exports = (args = {}, _next) => {
    const http = require('http');
    const { getLocalIpAddress, consoleLog } = require('./utils');
    const { host = getLocalIpAddress(), port = 3000, win } = args;
    const timeout = 1500;

    const checkAddressAvailability = (url, timeout) => {
        return new Promise((resolve, reject) => {
            try {
                let intervalTimer = null;

                const $clearInterval = () => {
                    clearInterval(intervalTimer);
                    intervalTimer = null;
                };

                const timerTask = () => {
                    http.get(url, res => {
                        if (res.statusCode === 200) {
                            consoleLog('client serve validate success', 'green');
                            $clearInterval();
                            resolve();
                        }
                    }).on('error', () => {
                        consoleLog('client serve validating...', 'blue');
                    });
                };
                intervalTimer = setInterval(timerTask, timeout);
            }
            catch (err) {
                reject(err);
            }
        });
    };

    const url = `http:${host}:${port}`;
    checkAddressAvailability(url, timeout)
        .then(() => {
            win.webContents.loadURL(`http://${host}:${port}`);
        })
        .catch((error) => {
            console.error('error occurred while checking address accessibility:', error);
        });

    require('electron-reloader')(module);
};