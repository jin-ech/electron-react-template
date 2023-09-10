/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 14:30:46
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 20:38:08
 * @FilePath: \electron-react-template\src\pages\goods\useGoodItemModal\index.jsx
 * @Description: 商品详情弹窗
 */

import React, { useEffect, useMemo, useState } from 'react';

import { Modal } from 'antd';
import ModelContent from './modal-content';

import styles from './index.module.less';
import { LoadingOutlined } from '@ant-design/icons';

const LazyModel = ({ visible, ...props }) => {
    const [showComponent, setShowComponent] = useState(false);

    useEffect(() => {
        if (!visible) {
            setShowComponent(false);
            return;
        }
        const timer = setTimeout(() => {
            setShowComponent(true);
        }, 500);

        return () => {
            clearTimeout(timer);
        };
    }, [visible]);

    return (
        <React.Fragment>
            {showComponent
                ? <ModelContent {...props} />
                : <LoadingOutlined style={{ fontSize: 32, marginLeft: 380 }} />}
        </React.Fragment>
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
            <LazyModel visible={visible} onCancel={closeModal} />
        </Modal>
    ), [visible]);

    return {
        showModal,
        closeModal,
        modalRenderer
    };
};

export default useGoodItemModal;
