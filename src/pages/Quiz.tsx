import React, { useEffect, useState } from 'react'
import { createNewQuizQuestion, type QuizData } from '../service/createEx';

interface QuizProps {
  childName: string;
}



const operators = ['+', '-', 'x', '÷']

const Quiz: React.FC<QuizProps> = ({ childName }) => {


  const [xp, setXp] = useState(() => {
    const savedXp = localStorage.getItem('XLmath-xp');
    return savedXp ? +savedXp : 0;
  });

  const [quiz, setQuiz] = useState<QuizData>(() => {
    return createNewQuizQuestion('+');
  });


  useEffect(() => {
    localStorage.setItem('Math-xp', xp.toString());
  }, [xp]);



  const handleOperatorChange = (newOperator: string) => {
    setQuiz(createNewQuizQuestion(newOperator));
  };


  const handleAnswerClick = (selectedAnswer: number) => {
    if (selectedAnswer === quiz.result) { // השתמש ב-quiz.result
      console.log('Correct!');
      setXp(prevXp => prevXp + 10);
    } else {
      console.log('Wrong!');
      setXp(prevXp => Math.max(0, prevXp - 2));
    }

    setQuiz(createNewQuizQuestion(quiz.operator)); 
  };


  return (
    <main>
      <header>
        <nav>
          <h1>
            {childName}
          </h1>
          <h2>{xp}<span>XP</span></h2>
        </nav>
      </header>

      <section className='quiz'>
        <ul className="operators">
          {
            operators.map((op) => (
              <li key={op} onClick={() => handleOperatorChange(op)}
                className={quiz.operator === op ? 'active' : ''}
              >{op}</li>
            ))
          }
        </ul>

        <div className='q-and-a'>

          <div className='question'>
            <h3 id="num1H3">{quiz.num1}</h3>
            &nbsp;
            <h3 >{quiz.operator}</h3>
            &nbsp;
            <h3 id="num2H3">{quiz.num2}</h3>
            &nbsp;
            <h3 >=</h3>
            &nbsp;
            <h3>?</h3>
          </div>

          <div className='answers'>

            {quiz.answers.map((answer, index) => (
              <div
                className="answer"
                key={index}
                onClick={() => handleAnswerClick(answer)}
              >
                {answer}
              </div>
            ))}
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