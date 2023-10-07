/*
 * @Author: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @Date: 2023-09-13 15:23:09
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-13 15:47:30
 * @FilePath: \electron-react-template\src\hooks\useAnimations\index.js
 * @Description: 模型动画
 */

import { useEffect, useRef, useState } from "react";
import { AnimationMixer } from 'three';
import { useFrame } from "@react-three/fiber";

const useAnimations = ({
    scene,
    animations = [],
    name
}) => {
    const actions = useRef({});
    const mixer = useRef(null);

    const playReverseAnimation = ({ animationName = name, duration, scale = -1 } = {}) => {
        const action = actions.current[animationName];
        setActionTimeScale({ animationName, scale });
        playAnimation({ animationName, duration });
    };

    const playAnimation = ({ animationName = name, duration, scale } = {}) => {
        const action = actions.current[animationName];
        if (action) {
            scale && setActionTimeScale({ scale });
            action.reset().play();
            setTimeout(() => {
                action.paused = true;
            }, duration);
        }
    };

    const setActionTimeScale = ({ animationName = name, scale = 1 } = {}) => {
        const action = actions.current[animationName];
        action.setEffectiveTimeScale(scale);
    };

    const pausedAnimation = ({ animationName = name } = {}) => {
        const action = actions.current[animationName];
        action.paused = true;
    };

    useFrame((_, delta) => {
        if (mixer.current) {
            mixer.current.update(delta);
        }
    });

    useEffect(() => {
        const curMixer = new AnimationMixer(scene);
        mixer.current = curMixer;

        animations.forEach(clip => {
            const action = curMixer.clipAction(clip);
            actions.current[clip.name] = action;
        });

        return () => {
            mixer.current.stopAllAction();
            mixer.current = null;
            actions.current = {};
        };
    }, []);

    return {
        playAnimation,
        playReverseAnimation,
        pausedAnimation,
        setActionTimeScale
    };
};

export default useAnimations;