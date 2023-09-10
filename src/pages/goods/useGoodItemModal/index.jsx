/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 14:30:46
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 16:54:03
 * @FilePath: \electron-react-template\src\pages\goods\useGoodItemModal\index.jsx
 * @Description: 商品详情弹窗
 */

import React, { useEffect, useMemo, useState } from 'react';

import { Modal } from 'antd';
import ModelContent from './modal-content';

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
        <React.Fragment>
            <Modal
                open={visible}
                closable={false}
                maskClosable
                width={1080}
                onCancel={closeModal}
                footer={null}
                modalRender={modalRender}
                forceRender
                destroyOnClose={false}
                getContainer={el => document.querySelector('#root')}
            />
        </React.Fragment>
    ), [visible]);

    return {
        showModal,
        closeModal,
        modalRenderer
    };
};

export default useGoodItemModal;
