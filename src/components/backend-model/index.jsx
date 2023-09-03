/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 21:47:27
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-03 21:57:18
 * @FilePath: \electron-react-template\src\pages\dashboard\Model.jsx
 * @Description: 背景模型
 */

import React, { Suspense, useRef } from 'react';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useFrame, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import useLoaderUrl from '@/hooks/useLoaderUrl';
import FallbackLoading from '../fallback-loading';

const targetPosition = [0, 0, 0];

const Model = ({
    url
}) => {
    const gltf = useLoader(GLTFLoader, url);
    const groupRef = useRef();

    useFrame(() => {
        groupRef.current.rotation.y += 0.001;
    });

    return (
        <group ref={groupRef} position={targetPosition}>
            <primitive object={gltf.scene} />
        </group>
    );
}

const staticPath = '/static/models/free_-_skybox_cliffside/scene.gltf';
const BackModel = () => {
    const { url } = useLoaderUrl(staticPath);

    if (!url) {
        return;
    }

    return (
        <Suspense fallback={<FallbackLoading />}>
            <Canvas style={{ width: '100vw', height: '100vh' }}>
                <ambientLight intensity={4} color="#fff" />
                <Model url={url} />
                <OrbitControls
                    target={targetPosition}
                    minDistance={2}
                    maxDistance={20}
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2}
                    minAzimuthAngle={-Math.PI * (120 / 180)}
                    maxAzimuthAngle={Math.PI * (120 / 180)}
                    rotateSpeed={0.3}
                />
            </Canvas>
        </Suspense>
    );
}

export default BackModel;