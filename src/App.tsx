import { useEffect, useState } from 'react'
// import { Analytics } from "@vercel/analytics/next"

import "./styles/global.css";
import Quiz from './pages/Quiz';
import Intro from './pages/Intro';
import { themes, type ColorTheme } from './themes';
import { STORAGE_KEYS } from './service/constants';


function App() {
  const [childName, setChildName] = useState<string>(() => {
    return localStorage.getItem(STORAGE_KEYS.CHILD_NAME) || '';
  });

  useEffect(() => {
    const savedThemeKey = localStorage.getItem(STORAGE_KEYS.THEME);

    if (savedThemeKey && themes[savedThemeKey]) {
      const theme: ColorTheme = themes[savedThemeKey];
      const root = document.documentElement;

      root.style.setProperty('--color-primary', theme.primary);
      root.style.setProperty('--color-secondary', theme.secondary);
      root.style.setProperty('--color-accent', theme.accent);
      root.style.setProperty('--color-text-bg', theme.textBg);
    }
  }, []);


  return (
    <div>
      {/* <Analytics /> */}
      {childName ? (
        <Quiz childName={childName} setChildName={setChildName} />
      ) : (
        <Intro setChildName={setChildName} />
      )}


    </div>
  )
}

export default App
