
window.addEventListener('DOMContentLoaded', () => {
    const replaceText = (selector, text) => {
        const element = document.getElementById(selector)
        if (element) element.innerText = text
    }

    for (const type of ['chrome', 'node', 'electron']) {
        replaceText(`${type}-version`, process.versions[type])
    }
});

// /**
//  * @description: exposure electron api
//  * @return {*}
//  */
// (() => {
//     const { contextBridge, ipcRenderer, remote, shell } = require('electron');
//     contextBridge.exposeInMainWorld('electron', {
//         ipcRenderer,
//         remote,
//         shell,
//         isElectron: true
//     });
// })();

