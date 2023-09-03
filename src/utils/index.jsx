/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:14:32
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-03 21:27:51
 * @FilePath: \electron-react-template\src\utils\index.jsx
 * @Description: 工具包
 */

const { ipcRenderer } = window.require('electron');

/**
 * @description: 当前运行环境
 * @return {*}
 */
export const isDev = process.env.NODE_ENV === 'development';

/**
 * @description: 获取App文件绝对路径
 * @return {*}
 */
export const getAppPath = () => localStorage.getItem('appPath');

/**
 * @description: 获取静态文件路径
 * @param {*} path
 * @return {*}
 */
export const getStaticPath = path => {
    if (isDev) {
        return path;
    }
    return getAppPath() + path;
};

/**
 * @description: 初始化app句柄信息
 * @return {*}
 */
export const initAppData = () => {
    ipcRenderer.send('getAppData');

    return new Promise(resolve => {
        ipcRenderer.on('appData', (_, data) => {
            localStorage.setItem('appPath', data.appRootPath);
            resolve(data);
        });
    });
};