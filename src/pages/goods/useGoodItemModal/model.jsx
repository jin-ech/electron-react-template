/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 14:48:12
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-11 14:57:42
 * @FilePath: \electron-react-template\src\pages\goods\useGoodItemModal\model.jsx
 * @Description: 模型
 */

import React, { useRef, useEffect } from 'react';
import { Tooltip } from 'antd';

import { useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import TWEEN from 'tween.js';

import { getStaticPath } from '@/utils';

import styles from './index.module.less';

export const pointList = [
    { position: [0, 1.15, 2.6], cameraPositon: [0, 1, 2.3], label: 1, tooltip: 'car logo' },
    { position: [1, 1.4, 0.8], cameraPositon: [1.6, 1.4, 0.5], label: 2, tooltip: 'car window' },
    { position: [-0.1, 1.4, -2.5], cameraPositon: [0, 1.4, -2.8], label: 3, tooltip: 'car rear' }
];

export const staticPath = getStaticPath('/static/models/jeep_compass_car/scene.gltf');

const Model = ({
    cameraPosition,
    color,
    ...props
}) => {
    const { scene } = useGLTF(staticPath, true);
    const groupRef = useRef();
    const { camera } = useThree();

    const animateCamera = (position = []) => {
        new TWEEN.Tween(camera.position)
            .to(new THREE.Vector3(...position), 1000)
            .easing(TWEEN.Easing.Quadratic.InOut)
            .onUpdate(() => {
                const pos = camera.position;
                camera.position.x = pos.x;
                camera.position.y = pos.y;
                camera.position.z = pos.z;
            })
            .start();
    };

    useEffect(() => {
        animateCamera(cameraPosition);
    }, [cameraPosition]);

    useEffect(() => {
        scene.traverse(child => {
            if (child.isMesh) {
                child.material.roughness = 0.3;
                if (child.parent?.name?.includes('body')) {
                    child.material.roughness = 0.2;
                    child.material.metalness = 0.8
                    child.material.color.set(color);
                }
            }
        });
    }, [color]);

    // 提高相机移动帧率=>~60fps
    useEffect(() => {
        const animate = () => { 
            TWEEN.update();
            requestAnimationFrame(animate); 
        } 
        animate();
    }, []);

    const handleAnimation = point => {
        animateCamera(point.cameraPositon);
    };

    return (
        <mesh ref={groupRef} {...props}>
            {pointList.map((point, index) => (
                <Html position={point.position} key={index}>
                    <Tooltip trigger='click' placement='right' title={point.tooltip} getPopupContainer={el => el}>
                        <div className={styles.point} onClick={() => handleAnimation(point)}>{point.label}</div>
                    </Tooltip>
                </Html>
            ))}
            <primitive object={scene} />
        </mesh>
    );
};

export default Model;