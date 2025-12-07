import React from 'react';
import styles from './Box.module.scss';

type Spacing = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export interface BoxProps extends React.HTMLAttributes<HTMLDivElement> {
    children?: React.ReactNode;
    p?: Spacing;
    px?: Spacing;
    py?: Spacing;
    pt?: Spacing;
    pb?: Spacing;
    pl?: Spacing;
    pr?: Spacing;
    background?: 'panel' | 'surface' | 'app';
    border?: 'subtle' | 'strong' | 'opaque';
    borderSide?: 'bottom' | 'top';
    className?: string;
}

export const Box: React.FC<BoxProps> = ({
    children,
    p,
    px,
    py,
    pt,
    pb,
    pl,
    pr,
    background,
    border,
    borderSide,
    className,
    ...props
}) => {
    const classes = [
        styles.box,
        p && styles[`p-${p}`],
        px && styles[`px-${px}`],
        py && styles[`py-${py}`],
        pt && styles[`pt-${pt}`],
        pb && styles[`pb-${pb}`],
        pl && styles[`pl-${pl}`],
        pr && styles[`pr-${pr}`],
        background && styles[`bg-${background}`],
        border && styles[`border-${border}`],
        borderSide === 'bottom' && styles['border-b'],
        borderSide === 'top' && styles['border-t'],
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} {...props}>
            {children}
        </div>
    );
};
