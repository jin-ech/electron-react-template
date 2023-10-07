/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:21:47
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 20:41:08
 * @FilePath: \electron-react-template\src\configure\routes\index.jsx
 * @Description: 路由配置导出
 */

import React from 'react';

const routes = [
    {
        path: '/',
        exact: true,
        redirect: '/dashboard'
    },
    {
        path: '/dashboard',
        exact: true,
        element: React.lazy(() => import('@/pages/dashboard'))
    },
    {
        path: '/goods',
        exact: true,
        element: React.lazy(() => import('@/pages/goods'))
    },
    {
        path: '/user-info',
        exact: true,
        element: React.lazy(() => import('@/pages/user-info'))
    },
    {
        path: '*',
        element: React.lazy(() => import('@/pages/not-found'))
    }
];

export default routes;
