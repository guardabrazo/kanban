import React from 'react';
import { Button, type ButtonProps } from './Button';

export interface ToggleButtonProps extends Omit<ButtonProps, 'active' | 'onToggle'> {
    toggled?: boolean;
    onToggle?: (toggled: boolean) => void;
}

export const ToggleButton: React.FC<ToggleButtonProps> = ({
    toggled = false,
    onToggle,
    onClick,
    ...props
}) => {
    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        if (onToggle) {
            onToggle(!toggled);
        }
        if (onClick) {
            onClick(e);
        }
    };

    return (
        <Button
            active={toggled}
            onClick={handleClick}
            aria-pressed={toggled}
            {...props}
        />
    );
};
