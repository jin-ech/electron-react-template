/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:25:53
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 21:13:32
 * @FilePath: \electron-react-template\src\layout\layout-header\index.jsx
 * @Description: 页面头部
 */

import React from 'react';
import cls from 'classnames';
import { useNavigate } from 'react-router';

import { CloseOutlined, ShoppingCartOutlined, ShoppingOutlined, UserOutlined } from '@ant-design/icons';

import useWindowResize from '@/hooks/useWindowResize';
import useCloseModal from '@/hooks/useCloseModal';

import styles from './index.module.less';
import useUserInfo from '@/hooks/useUserInfo';
import { Avatar, Badge } from 'antd';

const LayoutHeader = () => {
    const { isMaximized, onMinimize, onMaximize, onUnMaximize } = useWindowResize();
    const { modalRenderer, showModal } = useCloseModal();
    const navigate = useNavigate();
    const { store } = useUserInfo();
    console.log('store: ', store);
    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.logo} onClick={() => navigate('/')}></div>
                <div className={styles.title}> electron-react-template</div>
                <Avatar
                    size='small'
                    src='https://xsgames.co/randomusers/avatar.php?g=pixel&key=1'
                    style={{ margin: '0 8px 0 18px' }}
                />
                <Badge count={store?.goods?.length} size='small'>
                    <ShoppingCartOutlined style={{ fontSize: 18 }} />
                </Badge>
            </div>
            <div className={styles.center}>
            </div>
            <div className={styles.right}>
                <div className={cls(styles.icon, styles.minimize)} onClick={onMinimize}></div>
                {isMaximized ? (
                    <div className={cls(styles.icon, styles.unmaximize)} onClick={onUnMaximize}></div>
                ) : (
                    <div className={cls(styles.icon, styles.maximize)} onClick={onMaximize}></div>
                )}
                <CloseOutlined className={styles.icon} onClick={showModal} />
            </div>
            {modalRenderer}
        </div>
    );
};

export default LayoutHeader;