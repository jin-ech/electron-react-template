/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 14:48:12
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-10 16:39:30
 * @FilePath: \electron-react-template\src\pages\goods\useGoodItemModal\model.jsx
 * @Description: 模型
 */

import React, { useEffect, useRef } from 'react';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useLoader, useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';

import { getStaticPath } from '@/utils';

import styles from './index.module.less';

const pointList = [
    { position: [0, 0.7, 2], label: 1 },
    { position: [1, 1, 0], label: 2 },
    { position: [0, 0.9, -2.6], label: 3 },
    { position: [0, 1, 0], label: 4 }
];

const staticPath = getStaticPath('/static/models/aston_marten_db11_car/scene.gltf');

useGLTF.preload(staticPath);

const Model = ({
    ...props
}) => {
    const { scene } = useGLTF(staticPath, true);
    const groupRef = useRef();

    return (
        <mesh ref={groupRef} {...props}>
            {pointList.map((point, index) => (
                <Html position={point.position} key={index}>
                    <div className={styles.point}>{point.label}</div>
                </Html>
            ))}
            <primitive object={scene} />
        </mesh>
    );
};

export default Model;