import React, { useEffect, useState } from 'react'
import { createNewQuizQuestion, type QuizData } from '../service/createEx';

interface QuizProps {
  childName: string;
}


const operators = ['+', '-', 'x', '÷'];

const CORRECT_ANSWER_POINTS: { [key: string]: number } = {
  '+': 1,
  '-': 2,
  'x': 3,
  '÷': 4,
};

const WRONG_ANSWER_PENALTY = 1;

const prizeXP = [100, 250, 555, 999, 1250, 1515, 1890, 2222, 2555, 2999, 3333, 3693, 4000, 4444, 4864, 5000, 5252, 5555, 5789, 6000, 6322, 6666, 6800, 7117, 7500, 7755, 8000];

// const prizeXP=[1,5]

const Quiz: React.FC<QuizProps> = ({ childName }) => {

  const [isAnswering, setIsAnswering] = useState(false);
  const [clickedWrongAnswer, setClickedWrongAnswer] = useState<number | null>(null);

  const [xp, setXp] = useState(() => {
    const savedXp = localStorage.getItem('XLmath-xp');
    return savedXp ? +savedXp : 0;
  });

  const [quiz, setQuiz] = useState<QuizData>(() => {
    return createNewQuizQuestion('+');
  });


  useEffect(() => {
    localStorage.setItem('XLmath-xp', xp.toString());
  }, [xp]);



  const handleOperatorChange = (newOperator: string) => {
    setQuiz(createNewQuizQuestion(newOperator));
  };


  const handleAnswerClick = (selectedAnswer: number) => {
    if (isAnswering) return;
    setIsAnswering(true);
    if (selectedAnswer === quiz.result) {
      // console.log('Correct!');
      const pointsToAdd = CORRECT_ANSWER_POINTS[quiz.operator] || 1;
      setXp(prevXp => prevXp + pointsToAdd);
    } else {
      // console.log('Wrong!');
      setXp(prevXp => Math.max(0, prevXp - WRONG_ANSWER_PENALTY));
      setClickedWrongAnswer(selectedAnswer);
    }
    setTimeout(() => {
      setQuiz(createNewQuizQuestion(quiz.operator)); 

      setIsAnswering(false);
      setClickedWrongAnswer(null);
    }, 1500); 
  };

  const nextCheckpoint = prizeXP.find(checkpoint => checkpoint > xp);

  let prizeMessage: React.ReactNode;

  if (nextCheckpoint) {
    const pointsRemaining = nextCheckpoint - xp;
    prizeMessage = (
      <>
        <h2 className='big'><span>{pointsRemaining}</span>xp</h2>
        &nbsp;עד הפרס הבא
      </>
    );
  } else {
    prizeMessage = <h2>כל הכבוד! השגת את כל הפרסים 🏆</h2>;
  }

  const getAnswerClassName = (answer: number): string => {
    // אם אנחנו לא במצב משוב, החזר קלאס רגיל
    if (!isAnswering) {
      return 'answer';
    }

    // אם אנחנו כן במצב משוב:
    // 1. האם זו התשובה הנכונה?
    if (answer === quiz.result) {
      return 'answer correct'; // צבע בירוק
    }

    // 2. האם זו התשובה השגויה שנלחצה?
    if (answer === clickedWrongAnswer) {
      return 'answer wrong'; // צבע באדום
    }

    // 3. זו תשובה שגויה אחרת (שלא נלחצה)
    return 'answer faded'; // נטרל / העלם
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
            <h3 >{quiz.num1}</h3>
            &nbsp;
            <h3 >{quiz.operator}</h3>
            &nbsp;
            <h3>{quiz.num2}</h3>
            &nbsp;
            <h3 >=</h3>
            &nbsp;
            <h3>?</h3>
          </div>

          <div className='answers'>

            {quiz.answers.map((answer, index) => (
              <div
                className={getAnswerClassName(answer)}
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
        {prizeMessage}
      </footer>
    </main>
  )
}

export default Quiz