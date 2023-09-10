/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 14:33:29
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 20:57:39
 * @FilePath: \electron-react-template\src\pages\goods\useGoodItemModal\modal-content.jsx
 * @Description: 弹窗内容
 */

import React, { Suspense, useMemo, useState } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Sphere, useProgress } from '@react-three/drei';
import { Button, ColorPicker, Progress, Select, Typography } from 'antd';

import Model, { pointList } from './model';
import { DollarOutlined } from '@ant-design/icons';

import useUserInfo from '@/hooks/useUserInfo';

import styles from './index.module.less';

const selectList = pointList.map(item => ({ label: item.tooltip, value: JSON.stringify(item.cameraPositon) }));
const defaultCameraPosition = [2, 2, 5];

const ModelContent = ({
    onCancel
}) => {
    const { progress } = useProgress();
    const [color, updateColor] = useState('red');
    const [cameraPosition, updateCameraPosition] = useState(defaultCameraPosition);
    const { dispatchAddUserGoods } = useUserInfo();

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

    const modalRenderer = useMemo(() => (
        <Model
            position={[0, 0, 0]}
            color={color}
            cameraPosition={cameraPosition}
        />
    ), [color, cameraPosition]);

    return (
        <div className={styles.container}>
            <Suspense fallback={<Progress percent={Math.floor(progress / 100)} />}>
                <Canvas>
                    <Sphere args={[10, 32, 32]}>
                        <meshBasicMaterial color='red' />
                    </Sphere>
                    <ambientLight intensity={4} color="#fff" />
                    <pointLight intensity={0.5} color="#fff" position={[0, 1.2, 0]}></pointLight>
                    {/* 前 */}
                    <directionalLight intensity={2} color="#fff" position={[0, 4, 4]}></directionalLight>
                    {/* 后 */}
                    <directionalLight intensity={2} color="#fff" position={[0, 0, -4]}></directionalLight>
                    {/* 上 */}
                    <directionalLight intensity={2} color="#fff" position={[0, 4, 0]}></directionalLight>
                    {modalRenderer}
                    <PerspectiveCamera position={defaultCameraPosition} makeDefault />
                    <OrbitControls
                        minPolarAngle={Math.PI * (45 / 180)}
                        maxPolarAngle={Math.PI * (75 / 180)}
                        rotateSpeed={0.3}
                        enableRotate
                        enableZoom
                        // minDistance={5}
                        maxDistance={5}
                    />
                </Canvas>
                <div className={styles.toolbar}>
                    <div className={styles.title}>
                        <span>Jeep1</span>
                        <span>$303000.00</span>
                    </div>
                    <Typography.Paragraph className={styles.description}>
                        Experience the great outdoors with the Jeep Compass 3D . This iconic car offers a dynamic exterior, luxurious interior, and an advanced infotainment system that allows you to explore the limitless possibilities . Enjoy the power, versatility, and stylish design of the Compass 3D, and take your adventures to a whole new level.
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
                        <Button type='text' onClick={onCancel}>Cancel</Button>
                        <Button
                            type='text'
                            className={styles.buy}
                            icon={<DollarOutlined />}
                            onClick={handleBuy}
                        >Buy $303000.00</Button>
                    </div>
                </div>
            </Suspense>
        </div>
    );
}

export default ModelContent;