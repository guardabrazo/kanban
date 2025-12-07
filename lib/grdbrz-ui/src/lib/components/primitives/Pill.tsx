import React from 'react';
import styles from './Pill.module.scss';

export interface PillProps {
    label: string;
    variant?: 'default' | 'primary' | 'accent' | 'muted';
    className?: string;
}

export const Pill: React.FC<PillProps> = ({
    label,
    variant = 'default',
    className
}) => {
    const classes = [
        styles.pill,
        styles[variant],
        className
    ].filter(Boolean).join(' ');

    return (
        <span className={classes}>
            {label}
        </span>
    );
};
