import React, { useState } from 'react'
import { themes } from '../themes';
import { useTheme } from '../service/useTheme';
import { STORAGE_KEYS } from '../service/constants';


interface SettingsProps {
    setChildName: React.Dispatch<React.SetStateAction<string>>;
    setShowSettingsModal: React.Dispatch<React.SetStateAction<boolean>>;
}


const Settings = ({ setShowSettingsModal, setChildName }: SettingsProps) => {
    const [localName, setLocalName] = useState(localStorage.getItem(STORAGE_KEYS.CHILD_NAME));

    const { currentThemeKey, setCurrentThemeKey } = useTheme();

    const handleStart = () => {
        const trimmedName = localName?.trim();
        if (trimmedName) {
            setChildName(trimmedName)
            localStorage.setItem(STORAGE_KEYS.CHILD_NAME, trimmedName);
        }

        setShowSettingsModal(false)
    };

    const selectTheme = (themeKey: string) => {
        setCurrentThemeKey(themeKey);
    };

    const resetAll = () => {
        if (window.confirm('האם אתם בטוחים שאתם רוצים למחוק את כל ההתקדמות?')) {
            localStorage.removeItem(STORAGE_KEYS.CHILD_NAME);
            localStorage.removeItem(STORAGE_KEYS.XP);
            localStorage.removeItem(STORAGE_KEYS.THEME);
            localStorage.removeItem(STORAGE_KEYS.MAX_XP);
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
                                aria-label="Change color theme"
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

                
                <button className='settings-btn'
                    aria-label="אישור"
                    onClick={handleStart}>אישור וחזרה למשחק</button>

                <hr />
                <p>תרגיל חיבור: נקודה אחת</p>
                <p>תרגיל חיסור: 2 נקודות</p>
                <p>תרגיל כפל: 3 נקודות</p>
                <p>תרגיל חילוק: 4 נקודות</p>
                <p style={{color:'red'}}>כל טעות מורידה נקודה אחת בלבד</p>

                <hr />
       
                <p>אם אתם רוצים להתחיל את הכל מההתחלה ושכל המידע ימחק, תלחצו כאן:</p>
                <button className='settings-btn'
                    aria-label="reset איפוס"
                    onClick={resetAll}>איפוס מוחלט</button>
            </div>
        </div>
    )
}

export default Settings