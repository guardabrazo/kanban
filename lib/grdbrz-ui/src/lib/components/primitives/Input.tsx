import React from 'react';
import styles from './Input.module.scss';

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    variant?: 'default' | 'sensitive';
}

export const Input: React.FC<InputProps> = ({
    variant = 'default',
    className,
    ...props
}) => {
    const classes = [
        styles.input,
        (variant === 'sensitive' || props.type === 'password') ? styles.sensitive : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <input className={classes} {...props} />
    );
};
