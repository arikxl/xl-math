import React, { useState } from 'react'
import { themes, type ColorTheme } from '../themes';
import { STORAGE_KEY } from '../pages/Intro';

import "../styles/global.css";
import "../styles/quiz.css";
import "../styles/intro.css";


interface SettingsProps {
    setChildName: React.Dispatch<React.SetStateAction<string>>;

    setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const Settings = ({ setShowSettingsModal, setChildName }: SettingsProps) => {
    const [localName, setLocalName] = useState(localStorage.getItem('XLmath-child'));

    const [currentThemeKey, setCurrentThemeKey] = useState<string | null>(() => {
        return localStorage.getItem(STORAGE_KEY);


    });

    const handleStart = () => {
        const trimmedName = localName?.trim();
        if (trimmedName) {
            setChildName(trimmedName)
            localStorage.setItem('XLmath-child', trimmedName);
        }

        setShowSettingsModal(false)
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


    const resetAll = () => {
        if (window.confirm('האם אתם בטוחים שאתם רוצים למחוק את כל ההתקדמות?')) {

            localStorage.removeItem('XLmath-child');
            localStorage.removeItem('XLmath-xp');
            localStorage.removeItem('color-theme');
            localStorage.removeItem('XLmath-maxXp');
            setShowSettingsModal(false);
            window.location.reload();
        }
    }

    return (
        <div className="modal-overlay ">
            <div className="modal-content no-pad">
                <input placeholder='שינוי שם הילד/ה'
                    value={localName ? localName : ''}
                    onChange={(e) => setLocalName(e.target.value)}
                />

                <div>
                    <h3>שינוי עיצוב</h3>
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

                {/* 
                <h2>כל הכבוד { }!</h2>
                <p className="prize-instruction">גשו לאמא/אבא לקבלת הפרס</p> */}
                <button className='settings-btn' onClick={handleStart}>אישור וחזרה למשחק</button>


                <hr />
                <p>תרגיל חיבור: נקודה אחת</p>
                <p>תרגיל חיסור: 2 נקודות</p>
                <p>תרגיל כפל: 3 נקודות</p>
                <p>תרגיל חילוק: 4 נקודות</p>
                <p style={{color:'red'}}>כל טעות מורידה נקודה אחת בלבד</p>

                <hr />
       
                <p>אם אתם רוצים להתחיל את הכל מההתחלה ושכל המידע ימחק, תלחצו כאן:</p>
                <button className='settings-btn' onClick={resetAll}>איפוס מוחלט</button>
            </div>
        </div>
    )
}

export default Settings