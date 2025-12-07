import React from 'react';
import styles from './Panel.module.scss';
import { Heading } from './Typography';

export interface PanelProps {
    children: React.ReactNode;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    className?: string;
    style?: React.CSSProperties;
}

export const Panel: React.FC<PanelProps> = ({
    children,
    header,
    footer,
    className,
    style
}) => {
    return (
        <div className={`${styles.panel} ${className || ''}`} style={style}>
            {header && (
                <div className={styles.header}>
                    {typeof header === 'string' ? (
                        <Heading as="h3" size="md">{header}</Heading>
                    ) : (
                        header
                    )}
                </div>
            )}
            <div className={styles.content}>
                {children}
            </div>
            {footer && (
                <div className={styles.footer}>
                    {footer}
                </div>
            )}
        </div>
    );
};
