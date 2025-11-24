// src/hooks/useTheme.ts
import { useState, useEffect } from 'react';
import { themes, type ColorTheme } from '../themes';
import { STORAGE_KEYS } from './constants';

export const useTheme = () => {
    const [currentThemeKey, setCurrentThemeKey] = useState<string | null>(() => {
        return localStorage.getItem(STORAGE_KEYS.THEME);
    });

    useEffect(() => {
        if (currentThemeKey && themes[currentThemeKey]) {
            const theme: ColorTheme = themes[currentThemeKey];
            const root = document.documentElement;

            root.style.setProperty('--color-primary', theme.primary);
            root.style.setProperty('--color-secondary', theme.secondary);
            root.style.setProperty('--color-accent', theme.accent);
            root.style.setProperty('--color-text-bg', theme.textBg);

            localStorage.setItem(STORAGE_KEYS.THEME, currentThemeKey);
        }
    }, [currentThemeKey]);

    return { currentThemeKey, setCurrentThemeKey };
};