import React, { useState } from 'react';
import { themes, type ColorTheme } from '../themes';

interface IntroProps {
    setChildName: React.Dispatch<React.SetStateAction<string>>;
}

export const STORAGE_KEY = 'color-theme';

const Intro: React.FC<IntroProps> = ({ setChildName }) => {

    const [localName, setLocalName] = useState('');
    const [isAgreed, setIsAgreed] = useState(false);

    const [currentThemeKey, setCurrentThemeKey] = useState<string | null>(() => {
        return localStorage.getItem(STORAGE_KEY);


    });

    const handleStart = () => {
        const trimmedName = localName.trim();
        if (trimmedName) {
            localStorage.setItem('XLmath-child', trimmedName);
            setChildName(trimmedName);
        }
    };


    const selectTheme = (themeKey: string) => {
        if (themes[themeKey]) {
            setCurrentThemeKey(themeKey);
        }

        const theme: ColorTheme = themes[themeKey];
        const root = document.documentElement;

        root.style.setProperty('--color-primary', theme.primary);
        root.style.setProperty('--color-secondary', theme.secondary);
        root.style.setProperty('--color-accent', theme.accent);
        root.style.setProperty('--color-text-bg', theme.textBg);

        localStorage.setItem(STORAGE_KEY, themeKey);
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


                {/* <div className=""> */}
                    <label className="checkbox-wrapper">
                    <input type="checkbox" checked={isAgreed}
                        onChange={(e) => setIsAgreed(e.target.checked)} />
                        <span className="checkbox-text">
                            מובן לי שהאתר משמש ללמידה ולמשחק בלבד, וכל פרס הוא בונוס שניתן על ידי ההורים.

                        </span>
                    </label>
                {/* </div> */}


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

export default Intro