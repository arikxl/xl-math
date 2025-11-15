import { useEffect } from 'react';
import { themes,type ColorTheme } from '../themes';

const STORAGE_KEY = 'color-theme';

const ThemeLoader: React.FC = () => {

    useEffect(() => {
        const savedThemeKey = localStorage.getItem(STORAGE_KEY);

        if (savedThemeKey) {
            const theme: ColorTheme = themes[savedThemeKey];
            const root = document.documentElement;

            if (theme) {
                root.style.setProperty('--color-primary', theme.primary);
                root.style.setProperty('--color-secondary', theme.secondary);
                root.style.setProperty('--color-accent', theme.accent);
                root.style.setProperty('--color-text-bg', theme.textBg);
            }
        }
    }, []); 
    return null;
};

export default ThemeLoader;