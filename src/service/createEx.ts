const getRandomNumber = (min: number, max: number): number => {
    return ~~(Math.random() * (max - min + 1)) + min;
};

interface Exercise {
    num1: number;
    num2: number;
    result: number;
}


export interface QuizData {
    operator: string;
    num1: number;
    num2: number;
    result: number;
    answers: number[];
}

export const createNewQuizQuestion = (operator: string): QuizData => {
    const newExercise = generateExercise(operator);
    const newAnswers = generateAnswers(newExercise.result);
    const shuffledAnswers = shuffleArray(newAnswers);

    return {
        operator: operator,
        num1: newExercise.num1,
        num2: newExercise.num2,
        result: newExercise.result,
        answers: shuffledAnswers,
    };
};

const generateExercise = (operator: string): Exercise => {
    switch (operator) {
        case '+': {
            const num1 = getRandomNumber(1, 100);
            const num2 = getRandomNumber(1, 100);
            return { num1, num2, result: num1 + num2 };
        }

        case '-': {
            let num1 = getRandomNumber(1, 100);
            let num2 = getRandomNumber(1, 100);

            if (num1 < num2) {
                [num1, num2] = [num2, num1];
            }
            return { num1, num2, result: num1 - num2 };
        }

        case 'x': {
            const num1 = getRandomNumber(2, 12); 
            const num2 = getRandomNumber(1, 12);
            return { num1, num2, result: num1 * num2 };
        }

        case '÷': {
            const num2 = getRandomNumber(2, 12); 
            const result = getRandomNumber(2, 12);
            const num1 = num2 * result; 

            return { num1, num2, result };
        }

        default:
            { console.warn(`Unknown operator: ${operator}. Defaulting to '+'.`);
            const num1 = getRandomNumber(1, 12);
            const num2 = getRandomNumber(1, 12);
            return { num1, num2, result: num1 + num2 }; }
    }
};




const generateAnswers = (correctResult: number): number[] => {
    const answers = new Set<number>();
    answers.add(correctResult);

    while (answers.size < 3) {
        let offset = getRandomNumber(-10, 15);
        while (offset === 0) {
            offset = getRandomNumber(-15, 10);
        }

        let newAnswer = correctResult + offset;

        if (newAnswer < 0) {
            newAnswer = correctResult + Math.abs(offset);
        }

        answers.add(newAnswer);
    }

    return Array.from(answers);
};



const shuffleArray = <T>(array: T[]): T[] => {
    const newArray = [...array];

    for (let i = newArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
    }

    return newArray;
};