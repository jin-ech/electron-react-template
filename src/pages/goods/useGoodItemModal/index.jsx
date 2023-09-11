/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 14:30:46
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-11 11:39:41
 * @FilePath: \electron-react-template\src\pages\goods\useGoodItemModal\index.jsx
 * @Description: 商品详情弹窗
 */

import React, { useMemo, useState } from 'react';

import ModelContent from './modal-content';
import MaskModel from '@/components/mask-modal';

import styles from './index.module.less';

const useGoodItemModal = () => {
    const [visible, updateVisible] = useState(false);

    const showModal = () => {
        updateVisible(true);
    };

    const closeModal = () => {
        updateVisible(false);
    };

    const modalRenderer = useMemo(() => (
        <MaskModel
            open={visible}
            maskClosable={false}
            centered
            onCancel={closeModal}
            className={styles.wrapper}
            destoryOnClose
        >
            <ModelContent onCancel={closeModal} />
        </MaskModel>
    ), [visible]);

    return {
        showModal,
        closeModal,
        modalRenderer
    };
};

export default useGoodItemModal;
