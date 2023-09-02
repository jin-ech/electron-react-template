/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:12:33
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 23:23:21
 * @FilePath: \electron-react-template\src\layout\primary-layout\index.jsx
 * @Description: 页面整体布局
 */

import React from 'react';

import LayoutHeader from '../layout-header';
import LayoutMain from '../layout-main';
import { Layout } from 'antd';

import styles from './index.module.less';
import BackModel from '@/components/backend-model';

const { Header, Content } = Layout;

const PrimaryLayout = () => {
    return (
        <div className={styles.container}>
            <div className={styles.back}>
                <BackModel />
            </div>
            <Layout className={styles.layout}>
                <Header className={styles.header}>
                    <LayoutHeader />
                </Header>
                <Content className={styles.content}>
                    <LayoutMain />
                </Content>
            </Layout>

        </div>
    );
};

export default PrimaryLayout;