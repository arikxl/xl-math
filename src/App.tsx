import { useState } from 'react'

import './App.css'
import Quiz from './pages/quiz';
import Intro from './pages/Intro';

function App() {
  const [childName, setChildName] = useState(localStorage.getItem('mathXL-child') || '');



  return (
    <>

      {
        childName
          ? (<Quiz />)
          : (<Intro setChildName={setChildName } />)
      }


    </>
  )
}

export default App
