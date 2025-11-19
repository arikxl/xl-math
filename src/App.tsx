import { useState } from 'react'

import './App.css'
import Quiz from './pages/Quiz';
import Intro from './pages/Intro';
import ThemeLoader from './components/ThemeLoader';
import { Analytics } from "@vercel/analytics/next"


function App() {
  const [childName, setChildName] = useState(localStorage.getItem('XLmath-child') || '');



  return (
    <div>
      {/* <Analytics /> */}
      <ThemeLoader />
      {
        childName
          ? (<Quiz childName={childName} setChildName={setChildName} />)
          : (<Intro setChildName={setChildName}  />)
      }


    </div>
  )
}

export default App
