/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 11:20:35
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 11:49:34
 * @FilePath: \electron-react-template\src\hooks\useCloseModal\index.jsx
 * @Description: 关闭弹窗
 */

import React, { useMemo, useState } from 'react';
import { map } from 'lodash';

import { Modal, Radio } from 'antd';

import useWindowResize from '../useWindowResize';
import { transformObjToArr } from '@/utils';
import { CloseModeEnum } from '@/constants';

import styles from './index.module.less';

const closeModeList = transformObjToArr(CloseModeEnum);

const useCloseModal = () => {
    const [visible, updateVisible] = useState(false);
    const { onClose, onHide } = useWindowResize();

    const closeModal = () => {
        updateVisible(false);
    };

    const handleGroupChange = modeValue => {
        if (modeValue === CloseModeEnum.close.value) {
            onClose();
        }
        else {
            closeModal();
            setTimeout(() => {
                onHide();
            }, 500);
        }
    };

    const showModal = () => {
        updateVisible(true);
    };

    const modalRenderer = useMemo(() => (
        <Modal
            open={visible}
            title='关闭主界面时'
            closable
            maskClosable
            destroyOnClose
            onCancel={closeModal}
            width={240}
            footer={null}
            className={styles.container}
        >
            <Radio.Group onChange={e => handleGroupChange(e.target.value)}>
                {map(closeModeList, item => (
                    <Radio
                        key={item.value}
                        value={item.value}
                        style={{ margin: '12px 0' }}
                    >
                        {item.label}
                    </Radio>
                ))}
            </Radio.Group>
        </Modal>
    ), [visible]);

    return {
        showModal,
        closeModal,
        modalRenderer
    };
};

export default useCloseModal;
