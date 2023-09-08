/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 16:37:44
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-08 11:04:09
 * @FilePath: \electron-react-template\src\index.js
 * @Description: 客户端程序入口
 */
import React from 'react';
import ReactDOM from 'react-dom/client';
import { HashRouter } from 'react-router-dom';

import PrimaryLayout from './layout/primary-layout';
import { ConfigProvider as AntdConfigProvider, theme } from 'antd';
import { initAppData } from './utils';

import themeColors from './style/themeColors';

import './index.less';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode>
        <HashRouter>
            <AntdConfigProvider theme={{token: themeColors,  algorithm: theme.darkAlgorithm,}}>
                <PrimaryLayout />
            </AntdConfigProvider>
        </HashRouter>
    </React.StrictMode>
);

initAppData();

// Webpack Hot Module Replacement API
if (module?.hot) {
    module?.hot.accept();
}
