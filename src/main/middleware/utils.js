/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-09 15:17:37
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-09 19:25:26
 * @FilePath: \electron-next-template\middleware\utils.js
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 */

module.exports = {
    getClientEnvironment: isDev => {
        // const dotenv = require('dotenv');
        // const result = dotenv.config({ path: `.env.${isDev ? 'development' : 'production'}` });
        // if (result.error) {
        //     console.error('an error occured on get client environment: ', result.error);
        //     return {};
        // }
        // return result.parsed || {};
        return {};
    },
    consoleLog: (message, color) => {
        const colors = {
            reset: '\x1b[0m',
            bright: '\x1b[1m',
            dim: '\x1b[2m',
            underscore: '\x1b[4m',
            blink: '\x1b[5m',
            reverse: '\x1b[7m',
            hidden: '\x1b[8m',
            black: '\x1b[30m',
            red: '\x1b[31m',
            green: '\x1b[32m',
            yellow: '\x1b[33m',
            blue: '\x1b[34m',
            magenta: '\x1b[35m',
            cyan: '\x1b[36m',
            white: '\x1b[37m',
            bgBlack: '\x1b[40m',
            bgRed: '\x1b[41m',
            bgGreen: '\x1b[42m',
            bgYellow: '\x1b[43m',
            bgBlue: '\x1b[44m',
            bgMagenta: '\x1b[45m',
            bgCyan: '\x1b[46m',
            bgWhite: '\x1b[47m'
        };

        const colorCode = colors[color] || colors.reset;

        console.log(colorCode + message + colors.reset);
    },
    getLocalIpAddress: () => {
        const os = require('os');
        const interfaces = os.networkInterfaces();

        for (const interfaceName in interfaces) {
            const interface = interfaces[interfaceName];

            for (const info of interface) {
                if (info.family === 'IPv4' && !info.internal) {
                    return info.address;
                }
            }
        }

        return null;
    }
};