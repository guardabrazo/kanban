import React from 'react';
import styles from './Slider.module.scss';

export interface SliderProps extends Omit<React.InputHTMLAttributes<HTMLInputElement>, 'onChange'> {
    label?: string;
    value: number;
    min?: number;
    max?: number;
    step?: number;
    unit?: string;
    variant?: 'continuous' | 'discrete';
    onChange: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
    label,
    value,
    min = 0,
    max = 100,
    step = 1,
    unit = '',
    variant = 'continuous',
    onChange,
    className,
    ...props
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (props.disabled) return;
        onChange(Number(e.target.value));
    };

    // Calculate ticks for discrete variant
    const ticks = [];
    if (variant === 'discrete') {
        const range = max - min;
        const count = Math.floor(range / step);
        for (let i = 0; i <= count; i++) {
            const tickValue = min + (i * step);
            const percentage = ((tickValue - min) / range) * 100;
            ticks.push(percentage);
        }
    }

    return (
        <div className={`${styles.container} ${props.disabled ? styles.disabled : ''} ${className || ''}`}>
            {label && <label className={styles.label}>{label}</label>}
            <div className={styles.trackContainer}>
                <div className={styles.track} />
                {variant === 'discrete' && (
                    <div className={styles.ticks}>
                        {ticks.map((tick, i) => (
                            <div
                                key={i}
                                className={styles.tick}
                                style={{ left: `${tick}%` }}
                            />
                        ))}
                    </div>
                )}
                <input
                    type="range"
                    className={styles.slider}
                    value={value}
                    min={min}
                    max={max}
                    step={step}
                    onChange={handleChange}
                    {...props}
                />
            </div>
            <span className={styles.value}>{value}{unit}</span>
        </div>
    );
};
