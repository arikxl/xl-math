import React from 'react'
// import ThemeSwitcher from './ThemeSwitcher';

interface QuizProps {
  childName: string;
}

const Quiz: React.FC<QuizProps> = ({ childName }) => {
  return (
    <main>
      {/* <ThemeSwitcher /> */}
      <header>
        <nav>
          <h1>
            {childName}
          </h1>
          <h2>0<span>XP</span></h2>
        </nav>
      </header>

      <section className='quiz'>
        <ul className="operators">
          <li >+</li>
          <li >-</li>
          <li >x</li>
          <li >÷</li>
        </ul>

        <div className='q-and-a'>

        <div className='question'>
          <h3 id="num1H3">22</h3>
          <h3 id="operatorH3">+</h3>
          <h3 id="num2H3">44</h3>
          <h3 >=</h3>
          <h3>?</h3>
        </div>

        <div className='answers'>
            <div className="answer" id="option1" >22</div>
            <div className="answer" id="option2" >33</div>
            <div className="answer" id="option3" >44</div>
        </div>

        </div>


      </section>

      <footer className='quiz-footer'>
        <h2><span>0</span>xp</h2>
        &nbsp;עד הפרס הבא
      </footer>
    </main>
  )
}

export default Quiz