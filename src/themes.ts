export type GradientType = 'linear-right' | 'angled' | 'radial';

export interface ColorTheme {
    primary: string;
    secondary: string;
    accent: string;
    textBg: string;
    gradientType: GradientType;
}


export interface Themes {
    [key: string]: ColorTheme;
}

export const themes: Themes = {
    forest: { 
        primary: '#3EB489',
        secondary: '#98FF98',
        accent: '#20B2AA',
        textBg: '#2d5858ff',
        gradientType: 'angled',
    },
    normal: {
        primary: '#2ab7ca',
        secondary: '#fed766',
        accent: '#fe4a49',
        textBg: '#630303ff',
        gradientType: 'linear-right',
    },
    cyberNight: {
        primary: '#4B0082',
        secondary: '#00F0FF',
        accent: '#FF00F5',
        textBg: '#0D0221',
        gradientType: 'radial',
    },
};

export const DEFAULT_THEME = 'sunset';