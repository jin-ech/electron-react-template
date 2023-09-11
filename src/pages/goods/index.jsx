/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 12:01:49
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-11 14:27:59
 * @FilePath: \electron-react-template\src\pages\goods\index.jsx
 * @Description: 商品列表
 */

import React, { useEffect, useState, useTransition } from 'react';
import { Card, Col, Row } from 'antd';
import useGoodItemModal from './useGoodItemModal';

import dataset from './data.json';

import styles from './index.module.less';

const data = new Array(10).fill('').reduce(res => {
    return res.concat(dataset.results);
}, []);

const Goods = () => {
    const [dataSource, updateDataSource] = useState([]);
    const [, startTransition] = useTransition();
    const { showModal, modalRenderer } = useGoodItemModal();

    useEffect(() => {
        startTransition(() => {
            updateDataSource(data)
        });
    }, []);

    const renderCard = data => (
        <div
            className={styles.card}
            onClick={showModal}
        >
            <div className={styles.image} style={{backgroundImage: `url(${data.thumbnails?.images?.[0]?.url})`}} />
            <div className={styles.info}>
                <span>{data?.name}</span>
                <span style={{ color: '#389e0d' }}>${(+(data?.price * 60)).toFixed(2)}</span>
            </div>
        </div>
    );

    return (
        <div className={styles.container}>
            {dataSource.map((row, index) => (
                <div className={styles.wrapper} key={index}>
                    {renderCard(row)}
                </div>
            ))}
            {modalRenderer}
        </div>
    );
};

export default Goods;