/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 20:39:19
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 22:55:40
 * @FilePath: \electron-react-template\src\configure\routes\utils.jsx
 * @Description: 路由渲染工具包
 */

import React from 'react';
import { Route, Navigate, Routes } from 'react-router-dom';

export const renderRoutes = (routes = []) => {
    return (
        <Routes>
            {routes.map((route, index) => {
                const { path, element: Element, children, redirect } = route;

                if (redirect) {
                    return <Route key={index} path={path} element={<Navigate to={redirect} />} />;
                }

                return (
                    <Route
                        key={index}
                        path={path}
                        element={<Element />}
                    >
                        {children && (
                            <Routes>
                                {renderRoutes(children)}
                            </Routes>
                        )}
                    </Route>
                );
            })}
        </Routes>
    );
};