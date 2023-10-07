/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:33:49
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 21:45:48
 * @FilePath: \electron-react-template\src\pages\not-found\index.jsx
 * @Description: 404页面
 */

import React from 'react';

import { Button, Result } from 'antd';
import { useNavigate } from 'react-router';

import styles from './index.module.less';

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <div className={styles.contaner}>
            <Result
                status='404'
                title='404'
                subTitle="Sorry, the page you visited does not exist."
                extra={<Button type="primary" onClick={() => navigate('/')}>Back Home</Button>}
            />
        </div>
    );
};

export default NotFound;