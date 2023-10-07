/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 20:53:55
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 21:06:57
 * @FilePath: \electron-react-template\src\hooks\useUserInfo\index.js
 * @Description: 用户信息
 */

import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserGoods, updateUserInfo, userDetail } from '@/store/user.slice';

const useUserInfo = () => {
    const dispatch = useDispatch();
    const store = useSelector(userDetail);

    /**
     * @description: 全局挂载用户信息
     * @param {any} values
     * @return {*}
     */
    const dispatchUserInfo = values => {
        dispatch(updateUserInfo(values));
    };

    /**
     * @description: 全局挂载用户信息
     * @param {any} values
     * @return {*}
     */
    const dispatchAddUserGoods = values => {
        dispatch(updateUserGoods(values));
    };

    /**
     * @description: 获取用户信息
     * @param {PersonalInfo} values
     * @return {*}
     */
    const getUserInfoTask = async values => {
        try {
            // const res = await getMenuAction(values);
            // dispatchUserInfo(res?.data);
            // return res;
        }
        catch {
            // dispatch(updateUserDetail(null));
        }
    };

    /**
     * @description: 登出
     * @return {*}
     */
    const logout = path => {
        // localStorage.setItem('Token', '');
        // dispatchUserInfo(null);
    };

    return {
        store,
        getUserInfoTask,
        dispatchUserInfo,
        dispatchAddUserGoods,
        logout
    };
};

export default useUserInfo;