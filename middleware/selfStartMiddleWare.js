
module.exports = (args = {}, _next) => {
    const http = require('http');
    const { getLocalIpAddress, consoleLog } = require('./utils');
    const { host = getLocalIpAddress(), port = 3000, win } = args;
    const timeout = 1500;

    const checkAddressAvailability = (url, timeout) => {
        return new Promise((resolve, reject) => {
            try {
                let intervalTimer = null;
                const timerTask = () => {
                    http.get(url, res => {
                        clearInterval(intervalTimer);
                        intervalTimer = null;
                        if (res.statusCode === 200) {
                            consoleLog('client serve validate success', 'green');
                            resolve(true);
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
            win.webContents.reload();
        })
        .catch((error) => {
            console.error('error occurred while checking address accessibility:', error);
        });

    require('electron-reloader')(module);
};