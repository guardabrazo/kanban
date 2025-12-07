import React from 'react';
import { ThemeProvider, type ThemeName } from '../theme/ThemeProvider';
import { GrdbrzLayout } from '../layout/GrdbrzLayout';
import { Heading } from '../primitives/Typography';
import { Stack } from '../layout/Stack';
import { Text } from '../primitives/Typography';

import { Box } from '../layout/Box';

export interface AppShellProps {
    /** The title of the application displayed in the header */
    title: string;
    /** Optional content to display in the header (e.g., user profile, actions) */
    headerActions?: React.ReactNode;
    /** Content for the left sidebar */
    sidebar?: React.ReactNode;
    /** Content for the right sidebar */
    rightSidebar?: React.ReactNode;
    /** Content for the footer */
    footer?: React.ReactNode;
    /** The main content of the application */
    children: React.ReactNode;
    /** The initial theme to use */
    defaultTheme?: ThemeName;
}

export const AppShell: React.FC<AppShellProps> = ({
    title,
    headerActions,
    sidebar,
    rightSidebar,
    footer,
    children,
    defaultTheme = 'darkDefault'
}) => {
    const defaultHeader = (
        <Stack direction="row" justify="between" align="center" style={{ width: '100%', padding: '0 24px', height: '60px' }}>
            <Heading as="h1" size="xl" style={{ letterSpacing: '4px' }}>{title}</Heading>
            {headerActions && (
                <Stack direction="row" gap="md">
                    {headerActions}
                </Stack>
            )}
        </Stack>
    );



    const defaultFooter = footer ? (
        <Box px="xl" style={{ height: '40px', display: 'flex', alignItems: 'center', width: '100%' }}>
            {footer}
        </Box>
    ) : (
        <Stack direction="row" justify="between" align="center" style={{ width: '100%', padding: '0 24px', height: '40px' }}>
            <Text size="xs" variant="muted">© {new Date().getFullYear()} {title}</Text>
        </Stack>
    );

    return (
        <ThemeProvider defaultTheme={defaultTheme}>
            <GrdbrzLayout
                header={defaultHeader}
                sidebar={sidebar}
                rightSidebar={rightSidebar}
                footer={defaultFooter}
                fullScreen={true}
            >
                {children}
            </GrdbrzLayout>
        </ThemeProvider>
    );
};
