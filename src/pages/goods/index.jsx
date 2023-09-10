/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 12:01:49
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 14:32:22
 * @FilePath: \electron-react-template\src\pages\goods\index.jsx
 * @Description: 商品列表
 */

import React, { useEffect, useState, useTransition } from 'react';
import { Card, Col, Row } from 'antd';
import useGoodItemModal from './useGoodItemModal';

import dataset from './data.json';

import styles from './index.module.less';

const data = new Array(4).fill('').reduce(res => {
    res.push(dataset.results);
    return res;
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
        <Card
            className={styles.card}
            bordered
            hoverable
            style={{ padding: 0 }}
            cover={<img draggable={false} src={data.thumbnails?.images?.[0]?.url} />}
            onClick={showModal}
        >
            {/* {data.thumbnails?.images?.map(item => (
                <img key={item.url} src={item?.url}></img>
            ))} */}
            <div className={styles.info}>
                <span>{data?.name}</span>
                <span style={{ color: '#389e0d' }}>${(+(data?.price * 60)).toFixed(2)}</span>
            </div>
        </Card>
    );

    return (
        <div className={styles.container}>
            {dataSource.map((row, index) => (
                <Row key={index} gutter={[16, 16]}>
                    {row.map(col => (
                        <Col key={col.uid} span={6}>
                            {renderCard(col)}
                        </Col>
                    ))}
                </Row>
            ))}
            {modalRenderer}
        </div>
    );
};

export default Goods;