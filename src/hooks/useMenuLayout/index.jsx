/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-09 16:14:10
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 12:05:00
 * @FilePath: \electron-react-template\src\hooks\useMenuLayout\index.jsx
 * @Description: 菜单栏
 */

import React, { useEffect, useMemo, useState } from 'react';

import { useLocation, useNavigate } from 'react-router-dom';
import { Menu } from 'antd';
import layoutConfig from '@/configure/layout';

import styles from './index.module.less';

const useMenuLayout = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const [selectedKeys, updateSelectedKeys] = useState([]);

    useEffect(() => {
        updateSelectedKeys(location.pathname);
    }, [location]);

    const items = useMemo(() => layoutConfig.map(menu => ({
        key: menu.key,
        title: menu.title,
        label: menu.title,
        onClick: () => navigate(menu.path)
    })), []);

    const menuRenderer = useMemo(() => (
        <Menu
            className={styles.container}
            style={{ background: 'transparent' }}
            mode='horizontal'
            selectedKeys={selectedKeys}
            items={items}
        />
    ), [selectedKeys, items, location]);

    return {
        menuRenderer,
        items
    };
};

export default useMenuLayout;