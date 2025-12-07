import React from 'react';
import styles from './ButtonGroup.module.scss';

export interface ButtonGroupProps {
    children: React.ReactNode;
    className?: string;
    orientation?: 'horizontal' | 'vertical';
    style?: React.CSSProperties;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
    children,
    className,
    orientation = 'horizontal',
    style
}) => {
    return (
        <div className={`${styles.buttonGroup} ${styles[orientation]} ${className || ''}`} style={style}>
            {children}
        </div>
    );
};
