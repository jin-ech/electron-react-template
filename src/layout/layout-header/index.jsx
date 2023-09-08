/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:25:53
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 23:30:44
 * @FilePath: \electron-react-template\src\layout\layout-header\index.jsx
 * @Description: 页面头部
 */

import React, { useEffect, useMemo, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import { CloseOutlined } from '@ant-design/icons';
import layoutConfig from '@/configure/layout';

import styles from './index.module.less';

const LayoutHeader = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKeys, updateSelectedKeys] = useState([]);

    const handleClose = () => {
        const electron = window.require('electron');
        electron.ipcRenderer.send('close');
    };

    useEffect(() => {
        updateSelectedKeys(location.pathname);
    }, [location]);

    const items = useMemo(() => layoutConfig.map(menu => ({
        key: menu.key,
        title: menu.title,
        label: menu.title,
        onClick: () => navigate(menu.path)
    })), []);

    return (
        <div className={styles.container}>
            <div className={styles.logo}></div>
            <Menu
                className={styles.menu}
                style={{ background: 'transparent' }}
                mode='horizontal'
                selectedKeys={selectedKeys}
                items={items}
            />
            <div className={styles.center}>
                electron-react-template
            </div>
            <div className={styles.right}>
                <CloseOutlined className={styles.icon} onClick={handleClose} />
            </div>
        </div>
    );
};

export default LayoutHeader;