import React, { useState } from 'react';
import {

    Panel,
    Stack,
    Heading,
    Text,
    Slider,
    Toggle,
    Select,
    Button,
    Knob,
    XYPad
} from '../../lib';

interface StudioLayoutProps {
    layoutMode?: 'stacked' | 'distributed' | 'centered';
}

export const StudioLayout: React.FC<StudioLayoutProps> = ({ layoutMode = 'stacked' }) => {
    // State for interactivity
    const [waveform, setWaveform] = useState('saw');
    const [detune, setDetune] = useState(25);
    const [pw, setPw] = useState(50);
    const [cutoff, setCutoff] = useState(1200);
    const [res, setRes] = useState(4.5);
    const [drive, setDrive] = useState(true);
    const [attack, setAttack] = useState(10);
    const [decay, setDecay] = useState(200);
    const [sustain, setSustain] = useState(70);
    const [release, setRelease] = useState(500);
    const [reverbSend, setReverbSend] = useState(-12);
    const [delaySend, setDelaySend] = useState(-24);
    const [drums, setDrums] = useState(true);
    const [vocals, setVocals] = useState(true);
    const [input, setInput] = useState('in1');
    const [gain, setGain] = useState(0);
    const [phase, setPhase] = useState(false);
    const [eqHigh, setEqHigh] = useState(0);
    const [eqMid, setEqMid] = useState(2);
    const [eqLow, setEqLow] = useState(-3);
    const [bypass, setBypass] = useState(false);
    const [thresh, setThresh] = useState(-20);
    const [ratio, setRatio] = useState(4);
    const [makeup, setMakeup] = useState(3);
    const [vectorX, setVectorX] = useState(0.5);
    const [vectorY, setVectorY] = useState(0.5);

    const columnStyle: React.CSSProperties = {
        height: '100%',
        justifyContent: layoutMode === 'distributed' ? 'space-between' :
            layoutMode === 'centered' ? 'center' : 'flex-start'
    };

    return (
        <Stack gap="none" style={{ height: '100%' }}>
            <div style={{
                padding: '24px',
                borderBottom: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                background: 'var(--bg-panel)'
            }}>
                <Heading as="h1" size="lg">STUDIO CONSOLE</Heading>
                <Stack direction="row" gap="md">
                    <Button>LOAD PROJECT</Button>
                    <Button variant="primary">SAVE</Button>
                </Stack>
            </div>

            <div style={{
                flex: 1,
                display: 'grid',
                gridTemplateColumns: '1fr 1fr 1fr',
                padding: '24px',
                gap: '24px',
                background: 'var(--bg-app)',
                overflowY: 'auto'
            }}>
                {/* Column 1 */}
                <Stack gap="lg" style={columnStyle}>
                    <Panel header="CHANNEL STRIP">
                        <Stack gap="md">
                            <Select
                                label="INPUT"
                                value={input}
                                options={[
                                    { value: 'in1', label: 'INPUT 1' },
                                    { value: 'in2', label: 'INPUT 2' },
                                    { value: 'bus1', label: 'BUS A' },
                                ]}
                                onChange={setInput}
                            />
                            <Slider label="GAIN" value={gain} min={-60} max={12} onChange={setGain} unit="dB" />
                            <Toggle label="PHASE INVERT" checked={phase} onChange={setPhase} />
                        </Stack>
                    </Panel>

                    <Panel header="OSCILLATOR">
                        <Stack gap="md">
                            <Select
                                label="WAVEFORM"
                                value={waveform}
                                options={[
                                    { value: 'saw', label: 'SAWTOOTH' },
                                    { value: 'sqr', label: 'SQUARE' },
                                    { value: 'sin', label: 'SINE' },
                                ]}
                                onChange={setWaveform}
                            />
                            <Stack direction="row" gap="md">
                                <Knob label="DETUNE" value={detune} onChange={setDetune} size="sm" />
                                <Knob label="PW" value={pw} onChange={setPw} size="sm" />
                            </Stack>
                            <XYPad
                                label="VECTOR"
                                x={vectorX}
                                y={vectorY}
                                onChange={(x, y) => { setVectorX(x); setVectorY(y); }}
                            />
                        </Stack>
                    </Panel>

                    <Panel header="FILTER">
                        <Stack gap="md">
                            <Stack direction="row" gap="md" justify="between">
                                <Knob label="CUTOFF" value={cutoff} max={20000} onChange={setCutoff} />
                                <Knob label="RES" value={res} max={10} onChange={setRes} />
                            </Stack>
                            <Toggle label="DRIVE" checked={drive} onChange={setDrive} />
                        </Stack>
                    </Panel>
                </Stack>

                {/* Column 2 */}
                <Stack gap="lg" style={columnStyle}>
                    <Panel header="ENVELOPE">
                        <Stack gap="md">
                            <Slider label="ATTACK" value={attack} onChange={setAttack} unit="ms" />
                            <Slider label="DECAY" value={decay} onChange={setDecay} unit="ms" />
                            <Slider label="SUSTAIN" value={sustain} onChange={setSustain} unit="%" />
                            <Slider label="RELEASE" value={release} onChange={setRelease} unit="ms" />
                        </Stack>
                    </Panel>

                    <Panel header="EQ SECTION">
                        <Stack gap="md">
                            <Stack direction="row" gap="md" style={{ justifyContent: 'space-between' }}>
                                <Knob label="HIGH" value={eqHigh} min={-12} max={12} onChange={setEqHigh} size="sm" />
                                <Knob label="MID" value={eqMid} min={-12} max={12} onChange={setEqMid} size="sm" />
                                <Knob label="LOW" value={eqLow} min={-12} max={12} onChange={setEqLow} size="sm" />
                            </Stack>
                            <Toggle label="BYPASS" checked={bypass} onChange={setBypass} />
                        </Stack>
                    </Panel>

                    <Panel header="DYNAMICS">
                        <Stack gap="md">
                            <Slider label="THRESH" value={thresh} onChange={setThresh} unit="dB" />
                            <Slider label="RATIO" value={ratio} max={20} onChange={setRatio} unit=":1" />
                            <Slider label="MAKEUP" value={makeup} onChange={setMakeup} unit="dB" />
                        </Stack>
                    </Panel>
                </Stack>

                {/* Column 3 */}
                <Stack gap="lg" style={columnStyle}>
                    <Panel header="MAIN MIX">
                        <div style={{
                            height: '200px',
                            border: '1px solid var(--border-subtle)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            background: 'var(--bg-surface)'
                        }}>
                            <Stack gap="md" align="center" direction="column">
                                <Text variant="muted">WAVEFORM DISPLAY</Text>
                            </Stack>
                        </div>
                    </Panel>

                    <Panel header="SENDS">
                        <Stack gap="sm">
                            <Slider label="REVERB" value={reverbSend} onChange={setReverbSend} unit="dB" />
                            <Slider label="DELAY" value={delaySend} onChange={setDelaySend} unit="dB" />
                        </Stack>
                    </Panel>
                    <Panel header="GROUPS">
                        <Stack gap="sm">
                            <Toggle label="DRUMS" checked={drums} onChange={setDrums} />
                            <Toggle label="VOCALS" checked={vocals} onChange={setVocals} />
                        </Stack>
                    </Panel>
                </Stack>
            </div>
        </Stack>
    );
};
