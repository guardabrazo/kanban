import React from 'react';
import styles from './Button.module.scss';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'subtle';
    active?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
    children,
    variant = 'primary',
    active = false,
    className,
    ...props
}) => {
    const classes = [
        styles.button,
        styles[variant],
        active ? styles.active : '',
        className
    ].filter(Boolean).join(' ');

    return (
        <button className={classes} data-active={active ? 'true' : undefined} {...props}>
            {children}
        </button>
    );
};
