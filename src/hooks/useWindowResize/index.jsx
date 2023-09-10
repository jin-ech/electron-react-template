
import { useState, useEffect } from "react";
const electron = window.require('electron');

const useWindowResize = () => {
    const [isMaximized, setIsMaximized] = useState(false);

    const onMinimize = () => {
        electron.ipcRenderer.send('minimize');
    };

    const onUnMaximize = () => {
        electron.ipcRenderer.send('unmaximize');
    };

    const onMaximize = () => {
        electron.ipcRenderer.send('maximize');
    };

    const onClose = () => {
        electron.ipcRenderer.send('close');
    };

    const onHide = () => {
        electron.ipcRenderer.send('hide');
    };

    useEffect(() => {
        // 监听来自主进程的事件
        electron.ipcRenderer.on('window-resize', (_, isMaximized) => {
            setIsMaximized(isMaximized);
        });

        // 请求窗口的初始放大和缩小状态
        electron.ipcRenderer.send('resize-request');

        // 清除事件监听
        return () => {
            electron.ipcRenderer.removeAllListeners('window-resize');
        };
    }, []);

    return {
        isMaximized,
        onMinimize,
        onMaximize,
        onUnMaximize,
        onClose,
        onHide
    };
};

export default useWindowResize;