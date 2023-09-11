/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-03 21:31:18
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-11 12:13:48
 * @FilePath: \electron-react-template\src\components\fallback-loading\index.jsx
 * @Description: loading
 */

import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import styles from './index.module.less';

const FallbackLoading = () => {

    return (
        <div className={styles.container} >
            <LoadingOutlined />
        </div>
    );
}

export default FallbackLoading;