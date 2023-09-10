/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 20:51:24
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 20:51:46
 * @FilePath: \electron-react-template\src\store\index.js
 * @Description: local store
 */

import { configureStore } from '@reduxjs/toolkit';
import { userSlice } from './user.slice.js';

export const rootReducer = {
    userSlice: userSlice.reducer,
};

export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware({
        serializableCheck: false
    })
});
