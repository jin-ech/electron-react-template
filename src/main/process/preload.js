/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-09 15:17:37
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-10-07 11:20:10
 * @FilePath: \electron-react-template\process\preload.js
 * @Description: preload
 */

window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector);
        if (element) {
            element.innerText = text;
        }
    };

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type]);
    }
});