import React, { useEffect, useState } from 'react';

import Settings from '../components/Settings';
import QuizFooter from '../components/QuizFooter';
import { prizeXP } from '../service/data';
import { STORAGE_KEYS } from '../service/constants';
import { createNewQuizQuestion, type QuizData } from '../service/createEx';

import "../styles/quiz.css";

interface QuizProps {
  childName: string;
  setChildName: React.Dispatch<React.SetStateAction<string>>;
}

const operators = ['+', '-', 'x', '÷'];

const CORRECT_ANSWER_POINTS: { [key: string]: number } = {
  '+': 1,
  '-': 2,
  'x': 3,
  '÷': 4,
};

const WRONG_ANSWER_PENALTY = 1;

const Quiz: React.FC<QuizProps> = ({ childName, setChildName }) => {

  const [isAnswering, setIsAnswering] = useState(false);
  const [clickedWrongAnswer, setClickedWrongAnswer] = useState<number | null>(null);

  const [showPrizeModal, setShowPrizeModal] = useState(false);
  const [showSettingsModal, setShowSettingsModal] = useState(false);

  const [xp, setXp] = useState(() => {
    const savedXp = localStorage.getItem(STORAGE_KEYS.XP);
    return savedXp ? +savedXp : 0;
  });

  const [maxXp, setMaxXp] = useState(() => {
    const savedMax = localStorage.getItem(STORAGE_KEYS.MAX_XP);
    const currentXp = localStorage.getItem(STORAGE_KEYS.XP);
    return savedMax ? +savedMax : (currentXp ? +currentXp : 0);
  });

  const [quiz, setQuiz] = useState<QuizData>(() => {
    return createNewQuizQuestion('+');
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.XP, xp.toString());
  }, [xp]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.MAX_XP, maxXp.toString());
  }, [maxXp]);

  const handleOperatorChange = (newOperator: string) => {
    setQuiz(createNewQuizQuestion(newOperator));
  };

  const handleAnswerClick = (selectedAnswer: number) => {
    if (isAnswering) return;
    setIsAnswering(true);

    if (selectedAnswer === quiz.result) {
      const pointsToAdd = CORRECT_ANSWER_POINTS[quiz.operator] || 1;
      const newXp = xp + pointsToAdd;

      const reachedNewPrize = prizeXP.some(prize =>
        xp < prize &&
        newXp >= prize &&
        prize > maxXp
      );

      if (reachedNewPrize) {
        setShowPrizeModal(true);
      }

      setXp(newXp);

      if (newXp > maxXp) {
        setMaxXp(newXp);
      }

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
            <p className="prize-instruction">גשו לאמא או לאבא לקבל את הפרס</p>
            <button
              aria-label="אישור"
              onClick={() => setShowPrizeModal(false)}>לא לשכוח להגיד תודה</button>
          </div>
        </div>
      )}

      {showSettingsModal && (
        <Settings setChildName={setChildName} setShowSettingsModal={setShowSettingsModal} />
      )}

      <header>
        <nav>
          <button
            aria-label="הגדרות Settings"
            onClick={() => setShowSettingsModal(true)}>⚙️</button>
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

      <QuizFooter xp={xp} maxXp={maxXp} />

    </main>
  );
}

export default Quiz;