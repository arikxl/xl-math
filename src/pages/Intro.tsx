import React, { useState, useEffect } from 'react';
import { themes, type ColorTheme } from '../themes';


const STORAGE_KEY = 'color-theme';

const Intro = ({ setChildName }) => {


    const [currentThemeKey, setCurrentThemeKey] = useState<string | null>(() => {
        return localStorage.getItem(STORAGE_KEY);
    });


    const selectTheme = (themeKey: string) => {
        if (themes[themeKey]) {
            setCurrentThemeKey(themeKey);
        }
    };

    useEffect(() => {
        if (currentThemeKey) {
            const theme: ColorTheme = themes[currentThemeKey];
            const root = document.documentElement;

            if (theme) {
                root.style.setProperty('--color-primary', theme.primary);
                root.style.setProperty('--color-secondary', theme.secondary);
                root.style.setProperty('--color-accent', theme.accent);
                root.style.setProperty('--color-text-bg', theme.textBg);
                localStorage.setItem(STORAGE_KEY, currentThemeKey);
            }
        }
    }, [currentThemeKey]);

    return (
        <main>

            <section className='intro'>

                <div>
                    <h1 className='intro-h1'>
                        ברוכים הבאים
                    </h1>
                    <h2>
                        ל
                        <span>XL<span>Math</span></span>
                    </h2>
                    by&nbsp;
                    <a target='blank' href='https://github.com/arikxl'>
                        arikxl
                    </a>
                </div>




                <input placeholder='שם הילד/ה'

                />


                <div>
                    <h3>בחרו ערכת צבעים</h3>
                    {Object.keys(themes).map((themeKey) => {
                        const theme = themes[themeKey];

                        return (
                            <button
                                className={`color-set-btn ${theme.gradientType}`}
                                key={themeKey}
                                onClick={() => selectTheme(themeKey)}
                                disabled={currentThemeKey === themeKey}
                                style={{
                                    '--btn-primary': theme.primary,
                                    '--btn-secondary': theme.secondary,
                                    '--btn-accent': theme.accent
                                } as React.CSSProperties}
                            >

                            </button>
                        );
                    })}
                </div>


                <button className='intro-btn' disabled={!currentThemeKey && !setChildName}>
                    בואו נתחיל
                </button>


            </section>

            <footer>
                Created by&nbsp;
                <a target='_blank' href='https://www.linkedin.com/in/arik-alexandrov/'>
                    Arik Alexandrov
                </a>
                &nbsp;- ISRAEL 2025
            </footer>




        </main>
    )
}

export default Intro