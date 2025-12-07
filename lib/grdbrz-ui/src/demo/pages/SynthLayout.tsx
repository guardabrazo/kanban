import React from 'react';
import {
    GrdbrzLayout,
    Panel,
    Stack,
    Heading,
    Text,
    Slider,
    Toggle,
    Select,
    Button
} from '../../lib';

export const SynthLayout: React.FC = () => {
    const sidebar = (
        <Stack gap="lg">
            <Panel header="OSCILLATOR 1">
                <Stack gap="md">
                    <Select
                        label="WAVEFORM"
                        value="saw"
                        options={[
                            { value: 'saw', label: 'SAWTOOTH' },
                            { value: 'sqr', label: 'SQUARE' },
                            { value: 'sin', label: 'SINE' },
                        ]}
                        onChange={() => { }}
                    />
                    <Slider label="DETUNE" value={25} onChange={() => { }} unit="%" />
                    <Slider label="PW" value={50} onChange={() => { }} unit="%" />
                </Stack>
            </Panel>

            <Panel header="FILTER">
                <Stack gap="md">
                    <Slider label="CUTOFF" value={1200} max={20000} onChange={() => { }} unit="Hz" />
                    <Slider label="RES" value={4.5} max={10} onChange={() => { }} />
                    <Toggle label="DRIVE" checked={true} onChange={() => { }} />
                </Stack>
            </Panel>

            <Panel header="ENVELOPE">
                <Stack gap="md">
                    <Slider label="ATTACK" value={10} onChange={() => { }} unit="ms" />
                    <Slider label="DECAY" value={200} onChange={() => { }} unit="ms" />
                    <Slider label="SUSTAIN" value={70} onChange={() => { }} unit="%" />
                    <Slider label="RELEASE" value={500} onChange={() => { }} unit="ms" />
                </Stack>
            </Panel>
        </Stack>
    );

    return (
        <GrdbrzLayout sidebar={sidebar} sidebarPosition="left" sidebarWidth="320px">
            <Stack gap="none" style={{ height: '100%' }}>
                <div style={{
                    padding: '24px',
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                }}>
                    <Heading as="h1" size="lg">SWARM SYNTH V2</Heading>
                    <Stack direction="row" gap="md">
                        <Button>PRESETS</Button>
                        <Button variant="primary">SETTINGS</Button>
                    </Stack>
                </div>

                <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '24px',
                    gap: '24px',
                    background: 'var(--bg-app)',
                    overflowY: 'auto'
                }}>
                    <Panel header="MAIN OUTPUT">
                        <div style={{
                            height: '150px',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--bg-surface)'
                        }}>
                            <Stack gap="md" align="center">
                                <Text variant="muted">VISUALIZER PLACEHOLDER</Text>
                                <Button variant="primary">START AUDIO</Button>
                            </Stack>
                        </div>
                    </Panel>
                </div>

                <div style={{
                    padding: '24px',
                    borderTop: '1px solid var(--border-subtle)',
                    background: 'var(--bg-panel)'
                }}>
                    <Stack direction="row" justify="between" align="center">
                        <Stack direction="row" gap="xl">
                            <div style={{ width: '100px' }}>
                                <Slider label="MASTER" value={80} onChange={() => { }} unit="%" />
                            </div>
                            <div style={{ width: '100px' }}>
                                <Slider label="REVERB" value={45} onChange={() => { }} unit="%" />
                            </div>
                        </Stack>
                        <Button variant="primary">START AUDIO</Button>
                    </Stack>
                </div>
            </Stack>
        </GrdbrzLayout>
    );
};
