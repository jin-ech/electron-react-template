/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 14:33:29
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-11 11:41:04
 * @FilePath: \electron-react-template\src\pages\goods\useGoodItemModal\modal-content.jsx
 * @Description: 弹窗内容
 */

import React, { useMemo, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sphere, useGLTF, useProgress } from '@react-three/drei';
import { Button, ColorPicker, ConfigProvider, Progress, Select, Typography } from 'antd';

import Model, { pointList, staticPath } from './model';
import { DollarOutlined } from '@ant-design/icons';

import useUserInfo from '@/hooks/useUserInfo';

import styles from './index.module.less';

const selectList = pointList.map(item => ({ label: item.tooltip, value: JSON.stringify(item.cameraPositon) }));
const defaultCameraPosition = [3, 3, 6];
const minPolarAngle = Math.PI * (45 / 180);
const maxPolarAngle = Math.PI * (75 / 180);

useGLTF.preload(staticPath);

const ModelContent = ({
    onCancel
}) => {
    const [color, updateColor] = useState('#fff');
    const [cameraPosition, updateCameraPosition] = useState(defaultCameraPosition);
    const { dispatchAddUserGoods } = useUserInfo();
    const { progress } = useProgress();

    const handleBuy = () => {
        dispatchAddUserGoods({
            id: 'xxxid',
            title: 'car',
            price: '1230.00'
        });
    };

    const handleSelectChange = pos => {
        updateCameraPosition(JSON.parse(pos));
    };

    const handleColorChange = ({ metaColor }) => {
        const r = (+metaColor.r).toFixed(0);
        const g = (+metaColor.g).toFixed(0);
        const b = (+metaColor.b).toFixed(0);
        const a = (+metaColor.a).toFixed(1);
        updateColor(`rgba(${r},${g},${b},${a})`);
    };

    const modelRenderer = useMemo(() => (
        <Canvas>
            <Sphere args={[5, 32, 32]}>
                <meshBasicMaterial color='#fff' roughness={0} metalness={1} />
            </Sphere>
            <ambientLight intensity={4} color="#fff" />
            <pointLight intensity={2} color="#fff" position={[0, 1.2, 0]}></pointLight>
            {/* 前 */}
            <directionalLight intensity={2} color="#fff" position={[0, 4, 4]}></directionalLight>
            {/* 后 */}
            <directionalLight intensity={2} color="#fff" position={[0, 0, -4]}></directionalLight>
            {/* 上 */}
            <directionalLight intensity={2} color="#fff" position={[0, 4, 0]}></directionalLight>
            <Model
                position={[0, 0, 0]}
                color={color}
                cameraPosition={cameraPosition}
            />
            <PerspectiveCamera position={defaultCameraPosition} makeDefault />
            <OrbitControls
                minPolarAngle={minPolarAngle}
                maxPolarAngle={maxPolarAngle}
                rotateSpeed={0.3}
                enableRotate
                enableZoom
                // minDistance={5}
                maxDistance={5}
            />
        </Canvas>
    ), [color, cameraPosition]);

    const toolbarRenderer = useMemo(() => (
        <div className={styles.toolbar}>
            <div className={styles.title}>
                <span>Jeep1</span>
                <span>$303000.00</span>
            </div>
            <Typography.Paragraph className={styles.description}>
                Experience the great outdoors with the Jeep Compass 3D . This iconic car offers a dynamic exterior,
                luxurious interior, and an advanced infotainment system that allows you to explore the limitless possibilities .
                Enjoy the power, versatility, and stylish design of the Compass 3D, and take your adventures to a whole new level.
            </Typography.Paragraph>
            <div className={styles.row}>
                <label>color</label>
                <ColorPicker
                    value={color}
                    onChange={handleColorChange}
                />
            </div>
            <div className={styles.row}>
                <label>position</label>
                <Select
                    style={{ width: 120 }}
                    options={selectList}
                    onChange={handleSelectChange}
                />
            </div>
            <div className={styles.row}>
                <ConfigProvider theme={{ token: { colorPrimary: '#fff' } }}>
                    <Button type='primary' ghost onClick={onCancel}>Cancel</Button>
                    <Button
                        type='primary'
                        ghost
                        className={styles.buy}
                        icon={<DollarOutlined />}
                        onClick={handleBuy}
                    >Buy $303000.00</Button>
                </ConfigProvider>
            </div>
        </div>
    ), []);

    const p = Math.floor(progress);

    return (
        <div className={styles.container}>
            {p === 100 ? modelRenderer : <Progress percent={p} />}
            {toolbarRenderer}
        </div>
    );
}

export default ModelContent;