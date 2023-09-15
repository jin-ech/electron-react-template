/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 14:33:29
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-14 18:00:19
 * @FilePath: \electron-react-template\src\pages\goods\useGoodItemModal\modal-content.jsx
 * @Description: 弹窗内容
 */

import React, { useMemo, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, Sphere, useGLTF } from '@react-three/drei';
import { Button, ColorPicker, ConfigProvider, Select, Typography } from 'antd';

import Model, { materials, pointList, staticPath } from './model';
import { DollarOutlined } from '@ant-design/icons';

import useUserInfo from '@/hooks/useUserInfo';
import useModelProgress from '@/hooks/useModelProgress';
import { transformObjToArr } from '@/utils';

import styles from './index.module.less';

const posList = pointList.map(item => ({ label: item.tooltip, value: JSON.stringify(item.cameraPositon) }));
const materialList = transformObjToArr(materials);
const defaultCameraPosition = [1.5, 2, 3];
const minPolarAngle = Math.PI * (45 / 180);
const maxPolarAngle = Math.PI * (75 / 180);

useGLTF.preload(staticPath);

const ModelContent = ({
    onCancel
}) => {
    const [color, updateColor] = useState('#fff');
    const [cameraPosition, updateCameraPosition] = useState(defaultCameraPosition);
    const [currMaterial, updateCurrMaterial] = useState();
    const { dispatchAddUserGoods } = useUserInfo();
    const { done, progressRenderer } = useModelProgress();

    const handleBuy = () => {
        dispatchAddUserGoods({
            id: 'xxxid',
            title: 'car',
            price: '1230.00'
        });
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
            <Sphere args={[15, 32, 32]}>
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
                color={color}
                currMaterial={currMaterial}
                cameraPosition={cameraPosition}
            />
            <OrbitControls
                minPolarAngle={minPolarAngle}
                maxPolarAngle={maxPolarAngle}
                rotateSpeed={0.3}
                enableRotate
                enableZoom
                minDistance={1}
                maxDistance={8}
            />
        </Canvas>
    ), [color, currMaterial, cameraPosition]);

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
            <ConfigProvider theme={{ token: { colorPrimary: '#fff' } }}>
                <div className={styles.row}>
                    <label>color</label>
                    <Select
                        style={{ width: 120, marginRight: 12 }}
                        options={materialList}
                        onChange={mater => updateCurrMaterial(mater)}
                    />
                    <ColorPicker
                        value={color}
                        onChange={handleColorChange}
                    />
                </div>
                <div className={styles.row}>
                    <label>position</label>
                    <Select
                        style={{ width: 120 }}
                        options={posList}
                        onChange={pos => updateCameraPosition(JSON.parse(pos))}
                    />
                </div>
                <div className={styles.row}>
                    <Button type='primary' ghost onClick={onCancel}>Cancel</Button>
                    <Button
                        type='primary'
                        ghost
                        className={styles.buy}
                        icon={<DollarOutlined />}
                        onClick={handleBuy}
                    >Buy $303000.00</Button>
                </div>
            </ConfigProvider>
        </div>
    ), []);

    return (
        <div className={styles.container}>
            <div className={styles.progress} style={{ display: done ? 'none' : 'flex' }}>
                {progressRenderer}
            </div>
            <div style={{ opacity: done ? '1' : '0' }}>
                {modelRenderer}
            </div>
            {toolbarRenderer}
        </div>
    );
}

export default ModelContent;