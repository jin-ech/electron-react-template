/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 21:47:27
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 22:37:55
 * @FilePath: \electron-react-template\src\hooks\useLoader\index.jsx
 * @Description: 模型加载
 */

import React, { useEffect, useState } from 'react';

import { initAppData, isDev } from '@/utils';

function useLoaderUrl(staticPath) {
    const [url, updateUrl] = useState(null);

    useEffect(() => {
        if (isDev) {
            updateUrl(staticPath);
        }
        else {
            initAppData().then(res => {
                const $path = res.appRootPath + staticPath;
                updateUrl($path);
            });
        }
    }, []);

    return {
        url
    };
}

export default useLoaderUrl;
