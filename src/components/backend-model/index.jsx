/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 21:47:27
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-03 21:46:33
 * @FilePath: \electron-react-template\src\pages\dashboard\Model.jsx
 * @Description: 背景模型
 */

import React, { Suspense } from 'react';

import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

import useLoaderUrl from '@/hooks/useLoaderUrl';
import FallbackLoading from '../fallback-loading';

const targetPosition = [0, -3, -3];

function Model({
    url
}) {
    const gltf = useLoader(GLTFLoader, url);

    return (
        <group position={targetPosition}>
            <primitive object={gltf.scene} />
        </group>
    );
}

const staticPath = '/static/models/real-time_light_demo_rotate_lighting_alt-drag/scene.gltf';
function BackModel() {
    const { url } = useLoaderUrl(staticPath);

    if (!url) {
        return;
    }

    return (
        <Suspense fallback={<FallbackLoading />}>
            <Canvas style={{ width: '100vw', height: '100vh' }}>
                <ambientLight intensity={4} color="#fff" />
                <pointLight intensity={8} color="#fff" position={[0, 20, -20]} />
                <directionalLight intensity={4} color="#fff" position={[0, 20, -20]} />
                <directionalLight intensity={2} color="#fff" position={[20, 20, 0]} />
                <directionalLight intensity={4} color="#fff" position={[0, 20, 20]} />
                <directionalLight intensity={2} color="#fff" position={[-20, 20, 0]} />
                <Model url={url} />
                <OrbitControls
                    target={targetPosition} // 设置观察目标的位置
                    minDistance={2}    // 设置最小缩放距离
                    maxDistance={10}   // 设置最大缩放距离
                    minPolarAngle={0}
                    maxPolarAngle={Math.PI / 2}
                    minAzimuthAngle={-Math.PI * (60 / 180)}
                    maxAzimuthAngle={Math.PI * (60 / 180)}
                    rotateSpeed={0.3}
                />
            </Canvas>
        </Suspense>
    );
}

export default BackModel;