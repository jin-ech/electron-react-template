
import React from "react";
import { createPortal } from "react-dom";
import cls from 'classnames';

import { useKeyPress } from 'ahooks';

import styles from './index.module.less';

interface MaskModelProps {
    children?: React.ReactNode;
    open?: boolean;
    className?: string;
    onCancel?: () => void;
    getContainer?: () => HTMLElement;
    maskClosable?: boolean;
    centered?: boolean;
    destoryOnClose?: boolean;
}

const MaskModel: React.FC<MaskModelProps> = ({
    children,
    open,
    className,
    onCancel,
    getContainer = () => document.querySelector('#root'),
    maskClosable = true,
    centered,
    destoryOnClose = false
}) => {
    const prefix = cls(styles.container, className, {
        [styles.open]: open,

    });

    useKeyPress('esc', () => {
        onCancel();
    });

    const inner = (
        <div className={cls(styles.content, { [styles.centered]: centered })}>
            {children}
        </div>
    );

    const contentRenderer = (
        <div className={prefix}>
            {maskClosable && (
                <div className={styles.mask} onClick={onCancel}></div>
            )}
            {destoryOnClose ? (open && inner) : inner}
        </div>
    );

    return createPortal(contentRenderer, getContainer());
};

export default MaskModel;