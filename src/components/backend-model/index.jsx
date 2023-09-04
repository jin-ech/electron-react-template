/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 21:47:27
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-04 15:01:12
 * @FilePath: \electron-react-template\src\pages\dashboard\Model.jsx
 * @Description: 背景模型贴图
 */

import React, { Suspense, useRef } from 'react';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import FallbackLoading from '../fallback-loading';
import { getStaticPath } from '@/utils';

const targetPosition = [0, 0, 0];
const staticPath = '/static/models/free_-_skybox_cliffside/scene.gltf';

const Model = () => {
    const gltf = useLoader(GLTFLoader, getStaticPath(staticPath));
    const groupRef = useRef();

    useFrame(() => {
        groupRef.current.rotation.y += 0.001;
    });

    return (
        <group ref={groupRef} position={targetPosition}>
            <primitive object={gltf.scene} />
        </group>
    );
};

const BackModel = () => {

    const orbitControlsProps = {
        target: targetPosition,
        minDistance: 2,
        maxDistance: 20,
        // 垂直
        minPolarAngle: Math.PI * (45 / 180),
        maxPolarAngle: Math.PI * (135 / 180),
        // 水平
        // minAzimuthAngle: -Math.PI * (120 / 180),
        // maxAzimuthAngle: Math.PI * (120 / 180),
        rotateSpeed: 0.3
    };

    return (
        <Suspense fallback={<FallbackLoading />}>
            <Canvas style={{ width: '100vw', height: '100vh' }}>
                <ambientLight intensity={4} color="#fff" />
                <Model />
                <OrbitControls {...orbitControlsProps} />
            </Canvas>
        </Suspense>
    );
}

export default BackModel;