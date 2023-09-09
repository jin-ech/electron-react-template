/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-09 15:17:37
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-09 19:25:31
 * @FilePath: \electron-react-template\process\appGgenerator.js
 * @Description: app generator
 */

const electron = require('electron');
const { consoleLog } = require('../middleware/utils');

class AppGenerator {
    constructor(initParams) {
        this.exectors = [];
        this.initParams = {...electron, ...initParams};
        this.hasNext = false;
    }

    static getInstance(params) {
        return new AppGenerator({...electron, ...params});
    }

    next() {
        this.hasNext = true;
    }

    exec() {
        for (let i = 0; i < this.exectors.length; i++) {
            try {
                const exector = this.exectors[i];
                exector(this.initParams, () => this.next());
                if (!this.hasNext) {
                    return;
                }
            }
            catch(err) {
                consoleLog(`[MiddleWare Error]: ${err}`, 'red');
            }
        }
    }

    use(func) {
        this.exectors.push(func);
    }
}

module.exports = AppGenerator;