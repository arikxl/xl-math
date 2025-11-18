import React from 'react';

interface QuizFooterProps {
    xp: number;
}

const prizeXP = [
    100, 250, 555, 999, 1250, 1515, 1890, 2222, 2555, 2999, 3333,
    3693, 4000, 4444, 4864, 5000, 5252, 5555, 5789, 6000, 6322,
    6666, 6800, 7117, 7500, 7755, 8000
];

const QuizFooter: React.FC<QuizFooterProps> = ({ xp }) => {

    const nextCheckpointIndex = prizeXP.findIndex(checkpoint => checkpoint > xp);
    const nextCheckpoint = prizeXP[nextCheckpointIndex];

    const prevCheckpoint = nextCheckpointIndex > 0 ? prizeXP[nextCheckpointIndex - 1] : 0;

    let message: React.ReactNode;
    let progressPercent = 100; 

    if (nextCheckpoint) {
        const pointsRemaining = nextCheckpoint - xp;

        message = (
            <>
                <h2 className='big'><span>{pointsRemaining}</span>xp</h2>
                &nbsp;עד הפרס הבא
            </>
        );

        const totalLevelRange = nextCheckpoint - prevCheckpoint;
        const currentProgress = xp - prevCheckpoint;
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