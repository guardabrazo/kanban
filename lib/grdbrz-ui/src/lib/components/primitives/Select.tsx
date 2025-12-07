import React from 'react';
import styles from './Select.module.scss';

export interface SelectOption {
    value: string;
    label: string;
}

export interface SelectProps extends Omit<React.SelectHTMLAttributes<HTMLSelectElement>, 'onChange'> {
    label?: string;
    options: SelectOption[];
    value: string;
    onChange: (value: string) => void;
}

export const Select: React.FC<SelectProps> = ({
    label,
    options,
    value,
    onChange,
    className,
    ...props
}) => {
    return (
        <div className={`${styles.container} ${className || ''}`}>
            {label && <label className={styles.label}>{label}</label>}
            <select
                className={styles.select}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                {...props}
            >
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
};
