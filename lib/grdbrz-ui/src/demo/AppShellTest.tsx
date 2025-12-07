import { AppShell } from '../lib/components/templates/AppShell';
import { Box } from '../lib/components/layout/Box';
import { Panel } from '../lib/components/primitives/Panel';
import { Heading, Text } from '../lib/components/primitives/Typography';

export const AppShellTest = () => {
    return (
        <AppShell
            title="TEST APP"
            sidebar={
                <Panel header="Sidebar">
                    <Text>Sidebar Content</Text>
                </Panel>
            }
        >
            <Box p="xl" style={{ height: '100%', width: '100%', overflow: 'hidden', background: 'red' }}>
                <Box background="panel" border="subtle" p="lg" style={{ height: '100%', width: '100%' }}>
                    <Heading size="xl">Main Content</Heading>
                    <Text>This should be fullscreen.</Text>
                </Box>
            </Box>
        </AppShell>
    );
};
