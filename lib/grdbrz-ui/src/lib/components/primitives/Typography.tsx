import React from 'react';
import styles from './Typography.module.scss';

export interface TypographyProps extends React.HTMLAttributes<HTMLElement> {
    children: React.ReactNode;
    as?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'p' | 'span' | 'label';
    size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    variant?: 'primary' | 'secondary' | 'muted' | 'accent';
    className?: string;
}

export const Text: React.FC<TypographyProps> = ({
    children,
    as: Component = 'p',
    size = 'md',
    variant = 'primary',
    className,
    ...props
}) => {
    const classes = [
        styles.text,
        styles[size],
        styles[variant],
        className
    ].filter(Boolean).join(' ');

    return (
        <Component className={classes} {...props}>
            {children}
        </Component>
    );
};

export const Heading: React.FC<TypographyProps> = ({
    children,
    as = 'h2',
    size = 'lg',
    ...props
}) => {
    return <Text as={as} size={size} {...props}>{children}</Text>;
};

export const Label: React.FC<TypographyProps> = ({
    children,
    as = 'label',
    size = 'xs',
    variant = 'secondary',
    ...props
}) => {
    return <Text as={as} size={size} variant={variant} {...props}>{children}</Text>;
};
