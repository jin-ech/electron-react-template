/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 20:51:24
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 21:06:39
 * @FilePath: \electron-react-template\src\store\user.slice.js
 * @Description: user local store
 */

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    detail: {},
    goods: []
};

export const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        updateUserInfo: (state, action) => (state.detail = action.payload),
        updateUserGoods: (state, action) => {
            state.goods.push(action.payload);
        },
    }
});

export const userDetail = state => state.userSlice;

export const { updateUserInfo, updateUserGoods } = userSlice.actions;

