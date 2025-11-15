import { useState } from 'react'

import './App.css'
import Quiz from './pages/Quiz';
import Intro from './pages/Intro';
import ThemeLoader from './components/ThemeLoader';

function App() {
  const [childName, setChildName] = useState(localStorage.getItem('XLmath-child') || '');



  return (
    <div>
      <ThemeLoader />
      {
        childName
          ? (<Quiz childName={childName } />)
          : (<Intro setChildName={setChildName}  />)
      }


    </div>
  )
}

export default App
