/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 12:01:49
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 13:36:08
 * @FilePath: \electron-react-template\src\pages\goods\index.jsx
 * @Description: 商品列表
 */

import React from 'react';
import { Card, Col, Row } from 'antd';

import dataset from './data.json';

import styles from './index.module.less';

const dataSource = new Array(4).fill('').reduce(res => {
    res.push(dataset.results);
    return res;
}, []);
console.log('data source: ', dataSource);

const Goods = () => {

    const renderCard = data => (
        <Card
            className={styles.card}
            bordered
            hoverable
            style={{ padding: 0 }}
            cover={<img src={data.thumbnails?.images?.[0]?.url}></img>}
        >
            {/* {data.thumbnails?.images?.map(item => (
                <img key={item.url} src={item?.url}></img>
            ))} */}
            <div className={styles.info}>
                <span>{data?.name}</span>
                <span style={{ color: '#389e0d' }}>${(+(data?.price / 100)).toFixed(2)}</span>
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
        </div>
    );
};

export default Goods;