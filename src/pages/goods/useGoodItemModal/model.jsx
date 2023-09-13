/*
 * @Author: JC96821 13478707150@163.com
 * @Date: 2023-09-10 14:48:12
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-13 16:55:28
 * @FilePath: \electron-react-template\src\pages\goods\useGoodItemModal\model.jsx
 * @Description: 模型
 */

import React, { useRef, useEffect } from 'react';
import { Tooltip } from 'antd';

import { useThree } from '@react-three/fiber';
import { Html, useGLTF } from '@react-three/drei';
import * as THREE from 'three';
import TWEEN from 'tween.js';

import useAnimations from '@/hooks/useAnimations';
import { getStaticPath } from '@/utils';

import styles from './index.module.less';

export const pointList = [
    { position: [0, 0.6, 2.4], cameraPositon: [0, 0.6, 2.8], label: 1, tooltip: 'car logo' },
    { position: [1, 1, 0.8], cameraPositon: [1.4, 1, 0.8], label: 2, tooltip: 'car window' },
    { position: [0, 1, -2.4], cameraPositon: [0, 1, -3], label: 3, tooltip: 'car rear' },
    { position: [0, 1, 0], cameraPositon: [0, 1, 0], label: 4, tooltip: 'car rear', lookAt: [0, 1, 10] }
];

export const materials = {
    interior: { label: '内饰', value: 'Interior' },
    Wheel_0: { label: 'Wheel_0', value: 'Wheel_0' },
    Wheel001_1: { label: 'Wheel001_1', value: 'Wheel001_1' },
    Wheel003_2: { label: 'Wheel003_2', value: 'Wheel003_2' },
    Wheel002_3: { label: 'Wheel002_3', value: 'Wheel002_3' },
    Wheel004_4: { label: 'Wheel004_4', value: 'Wheel004_4' },
    Seats_9: { label: 'Seats_9', value: 'Seats_9' },
    Left_Door001_19: { label: 'Left_Door001_19', value: 'Left_Door001_19' },
    Left_Door002_15: { label: 'Left_Door002_15', value: 'Left_Door002_15' },
    KLM001_13: { label: 'KLM001_13', value: 'KLM001_13' },
    KLM003_18: { label: 'KLM003_18', value: 'KLM003_18' },
    KLM_26: { label: 'KLM_26', value: 'KLM_26' },
    cr1: { label: 'CR001_12', value: 'CR001_12' },
    cr2: { label: 'CR002_17', value: 'CR002_17' },
    cr3: { label: 'CR_27', value: 'CR_27' },
    moteur: { label: 'moteur', value: 'moteur' },
};

// export const staticPath = getStaticPath('/static/models/jeep_compass_car/scene.gltf');
export const staticPath = getStaticPath('/static/models/lamborghini_centenario_lp-770_interior_sdc/scene.gltf');

const Model = ({
    currMaterial,
    cameraPosition,
    color,
    ...props
}) => {
    const { scene, animations } = useGLTF(staticPath);
    const groupRef = useRef();
    const modelRef = useRef();
    const { camera } = useThree();
    const { playAnimation, playReverseAnimation } = useAnimations({ scene, animations, name: 'Animation' });

    const animateCamera = ({ from, to, delay = 1000 }) => {
        new TWEEN.Tween(from)
            .to(new THREE.Vector3(...to), delay)
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
        animateCamera({ from: camera.position, to: cameraPosition });
    }, [cameraPosition]);

    const handleCameraAnimation = point => {
        animateCamera({
            from: camera.position,
            to: point.cameraPositon
        });
    };

    const throlleRef = useRef(false);
    const isReverRef = useRef(false);
    const handlePlayAnimation = () => {
        if (throlleRef.current) {
            return;
        }
        isReverRef.current
            ? playReverseAnimation({ duration: 2000, scale: -2 })
            : playAnimation({ duration: 2000, scale: 2 });
        isReverRef.current = !isReverRef.current;
        throlleRef.current = true;
        setTimeout(() => {
            throlleRef.current = false;
        }, 2000);
    };

    const setMaterialColor = (name = '', color) => {
        if (!name) {
            return;
        }
        scene.traverse(child => {
            if (child.isMesh) {
                child.material.roughness = 0.3;
                console.log('name: ', child.parent?.name);
                if (child.parent?.name?.includes(name)) {
                    child.material.roughness = 0.2;
                    child.material.metalness = 0.8
                    child.material.color.set(color);
                }
            }
        });
    };

    useEffect(() => {
        setMaterialColor(currMaterial, color);
    }, [color, currMaterial]);

    // 提高相机移动帧率=>~60fps
    useEffect(() => {
        const animate = () => {
            TWEEN.update();
            requestAnimationFrame(animate);
        }
        animate();
    }, []);

    return (
        <mesh ref={groupRef} {...props}>
            {pointList.map((point, index) => (
                <Html position={point.position} key={index}>
                    <Tooltip trigger='click' placement='right' title={point.tooltip} getPopupContainer={el => el}>
                        <div className={styles.point} onClick={() => handleCameraAnimation(point)}>{point.label}</div>
                    </Tooltip>
                </Html>
            ))}
            <mesh ref={modelRef} onClick={handlePlayAnimation}>
                <primitive object={scene} />
            </mesh>
        </mesh>
    );
};

export default Model;