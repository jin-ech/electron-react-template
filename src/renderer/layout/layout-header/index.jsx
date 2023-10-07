/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:25:53
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 11:33:42
 * @FilePath: \electron-react-template\src\layout\layout-header\index.jsx
 * @Description: 页面头部
 */

import React from 'react';
import cls from 'classnames';

import { CloseOutlined } from '@ant-design/icons';

import useWindowResize from '@/hooks/useWindowResize';
import useCloseModal from '@/hooks/useCloseModal';

import styles from './index.module.less';

const LayoutHeader = () => {
    const { isMaximized, onMinimize, onMaximize, onUnMaximize } = useWindowResize();
    const { modalRenderer, showModal } = useCloseModal();

    return (
        <div className={styles.container}>
            <div className={styles.left}>
                <div className={styles.logo}></div>
                <div className={styles.title}> electron-react-template</div>
            </div>
            <div className={styles.center}>
                {/* TODO */}
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