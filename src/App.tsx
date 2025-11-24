import { useEffect, useState } from 'react'

import "./styles/global.css";
import Quiz from './pages/Quiz';
import Intro from './pages/Intro';
import { themes, type ColorTheme } from './themes';
// import ThemeLoader from './components/ThemeLoader';
// import { Analytics } from "@vercel/analytics/next"

const STORAGE_KEY_THEME = 'color-theme';

function App() {
  const [childName, setChildName] = useState<string>(() => {
    return localStorage.getItem('XLmath-child') || '';
  });

  useEffect(() => {
    // 1. קריאה מהזיכרון
    const savedThemeKey = localStorage.getItem(STORAGE_KEY_THEME);

    // 2. אם יש מפתח שמור והוא קיים ברשימת הערכות שלנו
    if (savedThemeKey && themes[savedThemeKey]) {
      const theme: ColorTheme = themes[savedThemeKey];
      const root = document.documentElement;

      // 3. החלת הצבעים
      root.style.setProperty('--color-primary', theme.primary);
      root.style.setProperty('--color-secondary', theme.secondary);
      root.style.setProperty('--color-accent', theme.accent);
      root.style.setProperty('--color-text-bg', theme.textBg);
    }
  }, []);


  return (
    <div>
      {/* <Analytics /> */}
      {/* <ThemeLoader /> */}
      {childName ? (
        <Quiz childName={childName} setChildName={setChildName} />
      ) : (
        <Intro setChildName={setChildName} />
      )}


    </div>
  )
}

export default App
