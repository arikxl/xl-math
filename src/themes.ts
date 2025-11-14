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
    sunset: { 
        primary: '#3EB489',
        secondary: '#98FF98',
        accent: '#20B2AA',
        textBg: '#2d5858ff',
        gradientType: 'angled',
    },
    normal: {
        primary: '#2ab7ca',
        secondary: '#fe4a49',
        accent: '#fed766',
        textBg: '#9c0d0dff',
        gradientType: 'linear-right',
    },
    cyberNight: {
        primary: '#0D0221',
        secondary: '#00F0FF',
        accent: '#FF00F5',
        textBg: '#4B0082',
        gradientType: 'radial',
    },
};

export const DEFAULT_THEME = 'sunset';