import React from 'react';
import styles from './GrdbrzLayout.module.scss';

export interface GrdbrzLayoutProps {
    children: React.ReactNode;
    sidebar: React.ReactNode;
    sidebarPosition?: 'left' | 'right'; // Deprecated but kept for backward compatibility if needed, though we are moving to explicit left/right props
    sidebarWidth?: string;
    rightSidebar?: React.ReactNode;
    rightSidebarWidth?: string;
    header?: React.ReactNode;
    footer?: React.ReactNode;
    fullScreen?: boolean;
    className?: string;
}

export const GrdbrzLayout: React.FC<GrdbrzLayoutProps> = ({
    children,
    sidebar,
    // sidebarPosition = 'left', // Unused
    sidebarWidth = '280px',
    rightSidebar,
    rightSidebarWidth = '280px',
    header,
    footer,
    fullScreen = false,
    className
}) => {
    return (
        <div className={`${styles.container} ${fullScreen ? styles.fullScreen : ''} ${className || ''}`}>
            {header && <header className={styles.header}>{header}</header>}

            <div className={styles.contentWrapper}>
                <aside className={`${styles.sidebar} ${styles.left}`} style={{ width: sidebarWidth }}>
                    {sidebar}
                </aside>

                <main className={styles.main}>
                    {children}
                </main>

                {rightSidebar && (
                    <aside className={`${styles.sidebar} ${styles.right}`} style={{ width: rightSidebarWidth }}>
                        {rightSidebar}
                    </aside>
                )}
            </div>

            {footer && <footer className={styles.footer}>{footer}</footer>}
        </div>
    );
};
