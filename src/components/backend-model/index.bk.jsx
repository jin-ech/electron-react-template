/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 21:47:27
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-13 23:20:56
 * @FilePath: \electron-react-template\src\pages\dashboard\Model.jsx
 * @Description: 背景模型贴图
 */

import React, { Suspense, useRef } from 'react';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useFrame, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

import FallbackLoading from '../fallback-loading';
import { getStaticPath } from '@/utils';

const targetPosition = [0, 0, 0];
const staticPath = getStaticPath('/static/models/free_-_skybox_cliffside/scene.gltf');

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

const orbitControlsProps = {
    // 垂直
    minPolarAngle: Math.PI * (45 / 180),
    maxPolarAngle: Math.PI * (135 / 180),
    // 水平
    // minAzimuthAngle: -Math.PI * (120 / 180),
    // maxAzimuthAngle: Math.PI * (120 / 180),
    rotateSpeed: 0.3,
    enableRotate: true,
    // minDistance: 2,
    // maxDistance: 20,
    enableZoom: true
};

const MovingPoint = () => {
    const point = useRef(); // 移动的点
    const { camera } = useThree();
    const texture = useLoader(THREE.TextureLoader, '/static/images/Scene_-_Root_diffuse.jpeg');

    // 这一段同requestAnimationFrame渲染器渲染
    useFrame(({ clock }) => {
        const t = clock.getElapsedTime(); // 获取经过的时间

        // 根据时间来更新点的位置
        point.current.position.x = point.current.position.x + 1;
        point.current.position.y = 0;
        point.current.position.z = 0;

        // 设置相机围绕点旋转
        const radius = 4; // 公转半径
        const angle = t; // 动画进行时间，搭配正余弦用于计算旋转角度
        camera.position.x = point.current.position.x + Math.sin(angle) * radius;
        camera.position.y = point.current.position.y;
        camera.position.z = point.current.position.z + Math.cos(angle) * radius;
        camera.lookAt(point.current.position);
    });

    return (
        <mesh ref={point} position={[0, 0, 0]}>
            <sphereGeometry args={[1, 32, 32]} />
            <meshBasicMaterial map={texture} />
        </mesh>
    );
};

const BackModel = () => {

    return (
        <Suspense fallback={<FallbackLoading />}>
            <Canvas style={{ width: '100vw', height: '100vh' }}>
                <ambientLight intensity={4} color="#fff" />
                <Model />
                <PerspectiveCamera position={new THREE.Vector3(0, 0, 2)} />
                <OrbitControls {...orbitControlsProps} />
                <MovingPoint />
            </Canvas>
        </Suspense>
    );
}

export default BackModel;