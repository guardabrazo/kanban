import React, { useRef, useState, useEffect } from 'react';
import styles from './XYPad.module.scss';
import { Text } from './Typography';

export interface XYPadProps {
    x: number;
    y: number;
    onChange: (x: number, y: number) => void;
    label?: string;
    className?: string;
}

export const XYPad: React.FC<XYPadProps> = ({
    x,
    y,
    onChange,
    label,
    className
}) => {
    const padRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);

    const handleInteraction = (clientX: number, clientY: number) => {
        if (!padRef.current) return;
        const rect = padRef.current.getBoundingClientRect();
        const newX = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
        const newY = Math.max(0, Math.min(1, 1 - (clientY - rect.top) / rect.height)); // Invert Y so 1 is top
        onChange(newX, newY);
    };

    const onMouseDown = (e: React.MouseEvent) => {
        setIsDragging(true);
        handleInteraction(e.clientX, e.clientY);
    };

    const onTouchStart = (e: React.TouchEvent) => {
        setIsDragging(true);
        handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
    };

    useEffect(() => {
        const onMouseMove = (e: MouseEvent) => {
            if (isDragging) handleInteraction(e.clientX, e.clientY);
        };
        const onMouseUp = () => setIsDragging(false);
        const onTouchMove = (e: TouchEvent) => {
            if (isDragging) handleInteraction(e.touches[0].clientX, e.touches[0].clientY);
        };
        const onTouchEnd = () => setIsDragging(false);

        if (isDragging) {
            window.addEventListener('mousemove', onMouseMove);
            window.addEventListener('mouseup', onMouseUp);
            window.addEventListener('touchmove', onTouchMove);
            window.addEventListener('touchend', onTouchEnd);
        }
        return () => {
            window.removeEventListener('mousemove', onMouseMove);
            window.removeEventListener('mouseup', onMouseUp);
            window.removeEventListener('touchmove', onTouchMove);
            window.removeEventListener('touchend', onTouchEnd);
        };
    }, [isDragging, onChange]);

    return (
        <div className={`${styles.container} ${className || ''}`}>
            {label && <Text size="xs" variant="secondary" className={styles.label}>{label}</Text>}
            <div
                className={styles.pad}
                ref={padRef}
                onMouseDown={onMouseDown}
                onTouchStart={onTouchStart}
            >
                <div className={styles.grid} />

                {/* Crosshairs */}
                <div
                    className={styles.crosshairX}
                    style={{ left: `${x * 100}%` }}
                />
                <div
                    className={styles.crosshairY}
                    style={{ top: `${(1 - y) * 100}%` }} // Invert Y for display
                />

                <div
                    className={styles.handle}
                    style={{
                        left: `${x * 100}%`,
                        bottom: `${y * 100}%`
                    }}
                />
            </div>
            <div className={styles.values}>
                <Text variant="muted" size="xs">X: {x.toFixed(2)}</Text>
                <Text variant="muted" size="xs">Y: {y.toFixed(2)}</Text>
            </div>
        </div>
    );
};
