import React, { useState, useEffect } from 'react'; // 1. לא לשכוח להוסיף useEffect

import "../styles/intro.css";
import { useTheme } from '../service/useTheme';
import { themes, type ColorTheme } from '../themes';
import { STORAGE_KEYS } from '../service/constants';



interface IntroProps {
    setChildName: React.Dispatch<React.SetStateAction<string>>;
}


const Intro: React.FC<IntroProps> = ({ setChildName }) => {

    const [localName, setLocalName] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);
    const { currentThemeKey, setCurrentThemeKey } = useTheme();

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


    const handleStart = () => {
        const trimmedName = localName.trim();
        if (trimmedName) {
            localStorage.setItem(STORAGE_KEYS.CHILD_NAME, trimmedName);
            setChildName(trimmedName);
        }
    };

    const selectTheme = (themeKey: string) => {
        setCurrentThemeKey(themeKey);
    };

    return (
        <main>
            <section className='intro'>
                <div>
                    <h1>
                        <span>XL<span>Math</span></span>
                    </h1>
                    by&nbsp;
                    <a target='blank' href='https://github.com/arikxl'>
                        arikxl
                    </a>
                </div>

                <input placeholder='שם הילד/ה'
                    value={localName}
                    onChange={(e) => setLocalName(e.target.value)}
                />

                <div>
                    <h3>בחרו עיצוב</h3>
                    {Object.keys(themes).map((themeKey) => {
                        const theme = themes[themeKey];
                        return (
                            <button
                                className={`color-set-btn ${theme.gradientType}`}
                                key={themeKey}
                                onClick={() => selectTheme(themeKey)}
                                style={{
                                    '--btn-primary': theme.primary,
                                    '--btn-secondary': theme.secondary,
                                    '--btn-accent': theme.accent,
                                    border: currentThemeKey === themeKey ? '3px solid white' : 'none',
                                    outline: currentThemeKey === themeKey ? `3px solid ${theme.primary}` : 'none'
                                } as React.CSSProperties}
                            >
                            </button>
                        );
                    })}
                </div>

                <label className="checkbox-wrapper">
                    <input type="checkbox" checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)} />
                    <span className="checkbox-text">
                        מובן לי שהאתר משמש ללמידה ולמשחק בלבד, וכל פרס הוא בונוס שניתן על ידי ההורים.
                    </span>
                </label>

                <button className='intro-btn'
                    onClick={handleStart}
                    disabled={!currentThemeKey || localName.trim() === '' || !isAgreed}>
                    בואו נתחיל
                </button>

            </section>

            <footer >
                Created by&nbsp;
                <a target='_blank' href='https://www.linkedin.com/in/arik-alexandrov/'>
                    Arik Alexandrov
                </a>
                &nbsp;- ISRAEL 2025
            </footer>
        </main>
    )
}

export default Intro;