import React from 'react';
import { ButtonGroup, Button, useTheme, type ThemeName } from 'grdbrz-ui';
import { useKanbanStore, type Theme } from './store';

export const ThemeSwitcher: React.FC = () => {
    const { theme, setTheme } = useTheme();
    const setStoreTheme = useKanbanStore(state => state.setTheme);

    const handleThemeChange = (newTheme: ThemeName) => {
        setTheme(newTheme);
        setStoreTheme(newTheme as Theme);
    };

    return (
        <ButtonGroup>
            <Button
                variant="subtle"
                active={theme === ('light' as ThemeName)}
                onClick={() => handleThemeChange('light' as ThemeName)}
            >
                Light
            </Button>
            <Button
                variant="subtle"
                active={theme === 'darkMuted'}
                onClick={() => handleThemeChange('darkMuted')}
            >
                Dark
            </Button>
        </ButtonGroup>
    );
};
