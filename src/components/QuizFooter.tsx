import React from 'react';
import { prizeXP } from '../service/data';

interface QuizFooterProps {
    xp: number;
    maxXp: number; // הוספנו את הפרופ החדש
}

const QuizFooter: React.FC<QuizFooterProps> = ({ xp, maxXp }) => {

    // השינוי החשוב: אנחנו מחפשים את הפרס הבא ביחס לשיא שהושג, לא ביחס לניקוד הנוכחי
    // ככה אם ירדתי בנקודות, המטרה לא "חוזרת אחורה"
    const nextCheckpointIndex = prizeXP.findIndex(checkpoint => checkpoint > maxXp);

    const nextCheckpoint = nextCheckpointIndex !== -1 ? prizeXP[nextCheckpointIndex] : null;
    const prevCheckpoint = nextCheckpointIndex > 0 ? prizeXP[nextCheckpointIndex - 1] : 0;

    let message: React.ReactNode;
    let progressPercent = 100;

    if (nextCheckpoint) {
        // חישוב המרחק נשאר מול ה-xp הנוכחי
        // (כי אם ירדתי בנקודות, אני באמת רחוק יותר מהפרס הבא)
        const pointsRemaining = nextCheckpoint - xp;

        message = (
            <>
                <h2 className='big'><span>{pointsRemaining}</span>xp</h2>
                &nbsp;עד הפרס הבא
            </>
        );

        const totalLevelRange = nextCheckpoint - prevCheckpoint;
        // כאן אנחנו מחשבים את ההתקדמות בתוך הטווח הנוכחי
        const currentProgress = xp - prevCheckpoint;

        // השימוש ב-Max וב-Min חשוב כאן מאוד כי אם ירדנו מתחת לפרס הקודם
        // אנחנו נקבל מספר שלילי, ואנחנו רוצים להציג 0% במקרה כזה
        progressPercent = Math.min(100, Math.max(0, (currentProgress / totalLevelRange) * 100));

    } else {
        message = <h2>כל הכבוד! השגת את כל הפרסים 🏆</h2>;
    }

    return (
        <footer className='quiz-footer'>
            <div className="footer-text">
                {message}
            </div>
            <div className="progress-container">
                <div className="progress-bar" style={{ width: `${progressPercent}%` }}></div>
            </div>
        </footer>
    );
};

export default QuizFooter;