import React, { useEffect, useState } from 'react'
import { createNewQuizQuestion, type QuizData } from '../service/createEx';
import QuizFooter from '../components/QuizFooter';
import { prizeXP } from '../service/data';

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

const Quiz: React.FC<QuizProps> = ({ childName }) => {

  const [isAnswering, setIsAnswering] = useState(false);
  const [clickedWrongAnswer, setClickedWrongAnswer] = useState<number | null>(null);

  const [showPrizeModal, setShowPrizeModal] = useState(false);

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
      const pointsToAdd = CORRECT_ANSWER_POINTS[quiz.operator] || 1;

      setXp(prevXp => {
        const newXp = prevXp + pointsToAdd;

        const reachedPrize = prizeXP.some(prize => prevXp < prize && newXp >= prize);
        if (reachedPrize) {
          setShowPrizeModal(true); 
        }

        return newXp;
      });

    } else {
      setXp(prevXp => Math.max(0, prevXp - WRONG_ANSWER_PENALTY));
      setClickedWrongAnswer(selectedAnswer);
    }

    setTimeout(() => {
      setQuiz(createNewQuizQuestion(quiz.operator));
      setIsAnswering(false);
      setClickedWrongAnswer(null);
    }, 1500);
  };

  const getAnswerClassName = (answer: number): string => {
    if (!isAnswering) return 'answer';
    if (answer === quiz.result) return 'answer correct';
    if (answer === clickedWrongAnswer) return 'answer wrong';
    return 'answer faded';
  };

  return (
    <main>

      {showPrizeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-icon">🎁</div>
            <h2>כל הכבוד {childName}!</h2>
            <p>הגעת ליעד חדש! 🎉</p>
            <p className="prize-instruction">גשו לאמא או אבא לקבלת הפרס</p>
            <button onClick={() => setShowPrizeModal(false)}>לא לשכוח להגיד תודה</button>
          </div>
        </div>
      )}


      <header>
        <nav>
          <button>⚙️</button>
          <h1>{childName}</h1>
          <h2>{xp}<span>XP</span></h2>
        </nav>
      </header>

      <section className='quiz'>
        <ul className="operators">
          {operators.map((op) => (
            <li key={op} onClick={() => handleOperatorChange(op)}
              className={quiz.operator === op ? 'active' : ''}
            >{op}</li>
          ))}
        </ul>

        <div className='q-and-a'>
          <div className='question'>
            <h3>{quiz.num1}</h3>&nbsp;
            <h3>{quiz.operator}</h3>&nbsp;
            <h3>{quiz.num2}</h3>&nbsp;
            <h3>=</h3>&nbsp;
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

      <QuizFooter xp={xp} />

    </main>
  )
}

export default Quiz;