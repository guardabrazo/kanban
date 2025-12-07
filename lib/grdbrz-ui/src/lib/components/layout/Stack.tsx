import React from 'react';
import styles from './Stack.module.scss';

export interface StackProps extends React.HTMLAttributes<HTMLDivElement> {
    children: React.ReactNode;
    direction?: 'row' | 'column';
    gap?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'none';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    grow?: boolean;
    className?: string;
}

export const Stack: React.FC<StackProps> = ({
    children,
    direction = 'column',
    gap = 'md',
    align = 'stretch',
    justify = 'start',
    grow = false,
    className,
    ...props
}) => {
    const classes = [
        styles.stack,
        styles[direction],
        styles[`gap-${gap}`],
        styles[`align-${align}`],
        styles[`justify-${justify}`],
        grow && styles.grow,
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};
