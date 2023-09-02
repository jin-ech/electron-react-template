/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-02 21:47:27
 * @LastEditors: JC96821 13478707150@163.com
 * @LastEditTime: 2023-09-02 22:37:55
 * @FilePath: \electron-react-template\src\pages\dashboard\Model.jsx
 * @Description: 背景模型
 */
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { Canvas, useLoader, useThree } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

import { useEffect } from 'react';

const targetPosition = [0, -3, -3];

function Model() {
    const gltf = useLoader(GLTFLoader, '/static/real-time_light_demo_rotate_lighting_alt-drag/scene.gltf');

    return (
        <group position={targetPosition}>
            <primitive object={gltf.scene} />
        </group>
    );
}

function BackModel() {
    
    return (
        <Canvas style={{ width: '100vw', height: '100vh' }}>
            <ambientLight color="#fff" />
            <directionalLight color="#fff" position={[0, 20, -20]} />
            <directionalLight color="#fff" position={[0, 20, 20]} />
            <directionalLight color="#fff" position={[0, 20, 0]} />
            <directionalLight color="#fff" position={[-20, 20, 0]} />
            <Model />
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
    );
}

export default BackModel;