import React from 'react';
import {
    Panel,
    Stack,
    Heading,
    Text,
    Button,
    Select
} from '../../lib';

interface DashboardLayoutProps {
    layoutMode?: 'stacked' | 'distributed' | 'centered';
}

export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ layoutMode = 'stacked' }) => {
    const [user, setUser] = React.useState('user');

    return (
        <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: 'var(--bg-app)' }}>
            {/* Top Bar */}
            <div style={{
                padding: '24px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-panel)'
            }}>
                <Stack direction="row" gap="lg" align="center">
                    <Heading as="h2" size="lg">DASHBOARD</Heading>
                </Stack>
                <div style={{ width: '200px' }}>
                    <Select
                        value={user}
                        options={[{ value: 'user', label: 'ADMIN USER' }, { value: 'guest', label: 'GUEST' }]}
                        onChange={setUser}
                    />
                </div>
            </div>

            {/* Main Content */}
            <div style={{ flex: 1, padding: '32px', overflowY: 'auto' }}>
                <Stack gap="xl" style={{
                    height: '100%',
                    justifyContent: layoutMode === 'distributed' ? 'space-between' :
                        layoutMode === 'centered' ? 'center' : 'flex-start'
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <div>
                            <Heading as="h1" size="xl">SYSTEM STATUS</Heading>
                            <Text variant="secondary" style={{ marginTop: '8px' }}>LAST UPDATED: 10:42 AM</Text>
                        </div>
                        <Button variant="primary">REFRESH DATA</Button>
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '24px' }}>
                        <Panel header="SERVER LOAD">
                            <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Heading size="xl">42%</Heading>
                            </div>
                        </Panel>
                        <Panel header="ACTIVE USERS">
                            <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Heading size="xl">1,284</Heading>
                            </div>
                        </Panel>
                        <Panel header="ERROR RATE">
                            <div style={{ height: '120px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                <Heading size="xl" style={{ color: '#ff4444' }}>0.01%</Heading>
                            </div>
                        </Panel>
                    </div>

                    <Panel header="RECENT ACTIVITY">
                        <Stack gap="md">
                            {[1, 2, 3, 4, 5].map((i) => (
                                <div key={i} style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '12px 0',
                                    borderBottom: i < 5 ? '1px solid var(--border-subtle)' : 'none'
                                }}>
                                    <Text>USER ACTION #{i}</Text>
                                    <Text variant="muted">2 MIN AGO</Text>
                                </div>
                            ))}
                        </Stack>
                    </Panel>
                </Stack>
            </div>
        </div>
    );
};
