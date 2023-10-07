/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:25:59
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 12:01:23
 * @FilePath: \electron-react-template\src\layout\layout-main\index.jsx
 * @Description: 页面主体
 */

import React, { Suspense } from 'react';

import { Dropdown, FloatButton } from 'antd';
import { MenuOutlined } from '@ant-design/icons';
import FallbackLoading from '@/components/fallback-loading';

import useMenuLayout from '@/hooks/useMenuLayout';
import routes from '../../configure/routes';
import { renderRoutes } from '@/configure/routes/utils';

import styles from './index.module.less';

const LayoutMain = () => {
    const { items } = useMenuLayout();

    return (
        <div className={styles.contaner}>
            <Dropdown menu={{ items }}>
                <FloatButton icon={<MenuOutlined />} type="primary" style={{ left: 24, bottom: 24 }} />
            </Dropdown>
            <Suspense fallback={<FallbackLoading />}>
                {renderRoutes(routes)}
            </Suspense>
        </div>
    );
};

export default LayoutMain;