/*
 * @Author: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @Date: 2023-09-12 16:05:48
 * @LastEditors: WIN-J7OL7MK489U\EDY 13478707150@163.com
 * @LastEditTime: 2023-09-12 16:11:19
 * @FilePath: \electron-react-template\src\hooks\useModelProgress\index.jsx
 * @Description: 进度
 */

import React, { useEffect, useMemo, useRef, useState } from 'react';
import FakeProgress from 'fake-progress';

import { useProgress } from '@react-three/drei';
import { Progress } from 'antd';

const p = new FakeProgress({
    timeConstant: 10000,
    autoStart: false
});

const useModelProgress = () => {
    const { progress } = useProgress();
    const intervalRef = useRef();

    const [_, updateKey] = useState();

    const done = useMemo(() => {
        const $done = Math.floor(progress) === 100;
        $done && p.end();
        return $done;
    }, [_]);


    useEffect(() => {
        p.start();
        updateKey(`${+new Date()}`);
        intervalRef.current = setInterval(() => {
            updateKey(`${+new Date()}`);
        }, 1000);
        return () => {
            clearInterval(intervalRef.current);
            intervalRef.current = null;
        };
    }, []);

    const progressRenderer = useMemo(() => (
        <Progress
            percent={p.progress * 100}
            status='active'
            style={{ width: 180 }}
            strokeColor="#000"
            trailColor="#eaeaea"
            showInfo={false}
        />
    ), [p.progress]);

    return {
        progressRenderer,
        done,
        p
    };
}

export default useModelProgress;