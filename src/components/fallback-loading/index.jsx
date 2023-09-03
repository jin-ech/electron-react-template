/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-03 21:31:18
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-03 21:34:38
 * @FilePath: \electron-react-template\src\components\fallback-loading\index.jsx
 * @Description: loading
 */

import React from 'react';

import { LoadingOutlined } from '@ant-design/icons';

import styles from './index.module.less';

const FallbackLoading = () => {

    return (
        <div className={styles.container} >
            <LoadingOutlined style={{ color: '#1677ff' }} />
        </div>
    );
}

export default FallbackLoading;