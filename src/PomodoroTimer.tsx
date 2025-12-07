import React, { useState, useEffect } from 'react';
import { Panel, Stack, Heading, Button, ButtonGroup } from 'grdbrz-ui';

export const PomodoroTimer: React.FC = () => {
    const [timeLeft, setTimeLeft] = useState(25 * 60);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState<'work' | 'break'>('work');

    useEffect(() => {
        let interval: any = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft(timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            // Play beep
            const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);

            oscillator.type = 'sine';
            oscillator.frequency.value = 880; // A5
            gainNode.gain.value = 0.1;

            oscillator.start();
            setTimeout(() => {
                oscillator.stop();
                audioContext.close();
            }, 500);
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const toggleTimer = () => setIsActive(!isActive);

    const resetTimer = () => {
        setIsActive(false);
        setTimeLeft(mode === 'work' ? 25 * 60 : 5 * 60);
    };

    const switchMode = (newMode: 'work' | 'break') => {
        setMode(newMode);
        setIsActive(false);
        setTimeLeft(newMode === 'work' ? 25 * 60 : 5 * 60);
    };

    const formatTime = (seconds: number) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const headerContent = (
        <Stack direction="row" justify="between" align="center" style={{ width: '100%' }}>
            <Heading size="md">Timer</Heading>
            <Heading size="md" style={{ fontWeight: 400, fontFamily: 'var(--font-family)' }}>{formatTime(timeLeft)}</Heading>
        </Stack>
    );

    return (
        <Panel header={headerContent}>
            <Stack gap="sm">
                <ButtonGroup style={{ display: 'flex', width: '100%' }}>
                    <Button
                        variant="subtle"
                        onClick={toggleTimer}
                        style={{ flex: 1 }}
                    >
                        {isActive ? 'PAUSE' : 'START'}
                    </Button>
                    <Button
                        variant="subtle"
                        onClick={resetTimer}
                        style={{ flex: 1 }}
                    >
                        RESET
                    </Button>
                </ButtonGroup>
                <Button
                    variant={mode === 'work' ? 'primary' : 'subtle'}
                    onClick={() => switchMode(mode === 'work' ? 'break' : 'work')}
                    style={{ width: '100%' }}
                >
                    {mode === 'work' ? 'SWITCH TO BREAK' : 'SWITCH TO WORK'}
                </Button>
            </Stack>
        </Panel>
    );
};

