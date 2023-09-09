/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:33:49
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-09 18:35:29
 * @FilePath: \electron-react-template\src\pages\dashboard\index.jsx
 * @Description: 首屏
 */

import React from 'react';

import { Button } from 'antd';

import styles from './index.module.less';

const electron = window.require('electron');

const Dashboard = () => {
    
    const handleClick = () => {
        electron.ipcRenderer.send('notification', { message: 'Hello Electron React Template!' });
    };
    
    const handleOpenDoc = () => {
        electron.shell.openExternal('https://www.electronjs.org/zh/docs/latest/api/app');
    };

    return (
        <div className={styles.container}>
            <div className={styles.center}>
                <div className={styles.logo}></div>
                <Button type='primary' onClick={handleClick}>click here!</Button>
                <a
                    className={styles.link}
                    onClick={handleOpenDoc}
                >https://www.electronjs.org/zh/docs/latest/api/app</a>
            </div>
        </div>
    );
};

export default Dashboard;