/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 14:30:46
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 19:57:27
 * @FilePath: \electron-react-template\src\pages\goods\useGoodItemModal\index.jsx
 * @Description: 商品详情弹窗
 */

import React, { useEffect, useMemo, useState } from 'react';

import { Modal } from 'antd';
import ModelContent from './modal-content';

import styles from './index.module.less';

const LazyModel = ({ visible }) => {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        if (!visible) {
            setShowComponent(false);
            return;
        }
        const timer = setTimeout(() => {
            setShowComponent(true);
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    }, [visible]);

    return (
        <div>
            {showComponent && <ModelContent />}
        </div>
    );
};

const useGoodItemModal = () => {
    const [visible, updateVisible] = useState(false);

    const showModal = () => {
        updateVisible(true);
    };

    const closeModal = () => {
        updateVisible(false);
    };

    // 禁用Modal的transform属性
    const modalRender = () => {
        return <LazyModel visible={visible} />;
    };

    const modalRenderer = useMemo(() => (
        <Modal
            open={visible}
            closable={false}
            maskClosable={false}
            width={1080}
            onCancel={closeModal}
            centered
            footer={null}
            // modalRender={modalRender}
            className={styles.wrapper}
            forceRender
            destroyOnClose={false}
            getContainer={el => el}
        >
            {modalRender()}
        </Modal>
    ), [visible]);

    return {
        showModal,
        closeModal,
        modalRenderer
    };
};

export default useGoodItemModal;
