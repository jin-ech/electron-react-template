/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 14:33:29
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 16:47:51
 * @FilePath: \electron-react-template\src\pages\goods\useGoodItemModal\modal-content.jsx
 * @Description: 弹窗内容
 */

import React, { Suspense, useEffect, useMemo } from 'react';

import { Canvas } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, useProgress } from '@react-three/drei';
import { Progress } from 'antd';

import Model from './model';

import styles from './index.module.less';

const ModelContent = () => {
    const { progress } = useProgress();

    return (
        <div className={styles.container}>
            <Suspense fallback={<Progress percent={Math.floor(progress / 100)} />}>
                <Canvas>
                    <ambientLight intensity={2} color="#fff" />
                    <pointLight intensity={2} color="#fff" position={[0, 4, 4]}></pointLight>
                    <pointLight intensity={2} color="#fff" position={[2, 2, 4]}></pointLight>
                    <directionalLight intensity={4} color="#fff" position={[0, 0, 4]}></directionalLight>
                    <directionalLight intensity={4} color="#fff" position={[4, 0, 0]}></directionalLight>
                    <directionalLight intensity={4} color="#fff" position={[-4, 0, 0]}></directionalLight>
                    <directionalLight intensity={4} color="#fff" position={[0, 0, -4]}></directionalLight>
                    <directionalLight intensity={4} color="#fff" position={[0, 4, 0]}></directionalLight>
                    <Model position={[0, 0, 0]} />
                    <PerspectiveCamera position={[3, 3, 3]} makeDefault />
                    <OrbitControls
                        minPolarAngle={Math.PI * (45 / 180)}
                        maxPolarAngle={Math.PI * (75 / 180)}
                        rotateSpeed={0.3}
                        enableRotate
                        enableZoom
                        minDistance={3}
                        maxDistance={8}
                    />
                </Canvas>
            </Suspense>
        </div>
    );
}

export default ModelContent;