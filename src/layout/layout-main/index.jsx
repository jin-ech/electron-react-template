/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:25:59
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 21:11:55
 * @FilePath: \electron-react-template\src\layout\layout-main\index.jsx
 * @Description: 页面主体
 */

import React, { Suspense } from 'react';

import routes from '../../configure/routes';
import { renderRoutes } from '@/configure/routes/utils';

import styles from './index.module.less';

const LayoutMain = () => {
    return (
        <div className={styles.contaner}>
            <Suspense fallback="loading...">
                {renderRoutes(routes)}
            </Suspense>
        </div>
    );
};

export default LayoutMain;