/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:33:49
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 22:15:17
 * @FilePath: \electron-react-template\src\pages\dashboard\index.jsx
 * @Description: 首屏
 */

import React from 'react';

import { Button } from 'antd';

import styles from './index.module.less';

const Dashboard = () => (
    <div className={styles.contaner}>
        <Button type='primary'>click here!</Button>
    </div>
);

export default Dashboard;