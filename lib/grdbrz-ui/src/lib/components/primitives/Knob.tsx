import React, { useRef, useState, useEffect } from 'react';
import styles from './Knob.module.scss';
import { Text } from './Typography';

export interface KnobProps {
    value: number;
    min?: number;
    max?: number;
    onChange: (value: number) => void;
    label?: string;
    size?: 'sm' | 'md' | 'lg';
    className?: string;
    disabled?: boolean;
}

export const Knob: React.FC<KnobProps> = ({
    value,
    min = 0,
    max = 100,
    onChange,
    label,
    size = 'md',
    className,
    disabled = false
}) => {
    const knobRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const startYRef = useRef<number>(0);
    const startValueRef = useRef<number>(0);

    const handleMouseDown = (e: React.MouseEvent) => {
        if (disabled) return;
        setIsDragging(true);
        startYRef.current = e.clientY;
        startValueRef.current = value;
    };

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || disabled) return;
            const deltaY = startYRef.current - e.clientY;
            const range = max - min;
            const sensitivity = 200; // Pixels to traverse full range
            const deltaValue = (deltaY / sensitivity) * range;
            const newValue = Math.min(max, Math.max(min, startValueRef.current + deltaValue));
            onChange(newValue);
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            window.addEventListener('mousemove', handleMouseMove);
            window.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, min, max, onChange, disabled]);

    // Calculate rotation
    // Map value to -135deg to +135deg (270deg range)
    const percentage = (value - min) / (max - min);
    const rotation = -135 + (percentage * 270);

    return (
        <div className={`${styles.container} ${styles[size]} ${disabled ? styles.disabled : ''} ${className || ''}`}>
            <div
                className={styles.knob}
                ref={knobRef}
                onMouseDown={handleMouseDown}
                style={{ transform: `rotate(${rotation}deg)` }}
            >
                <div className={styles.marker} />
            </div>
            {label && <Text size="xs" variant="secondary" className={styles.label}>{label}</Text>}
        </div>
    );
};
