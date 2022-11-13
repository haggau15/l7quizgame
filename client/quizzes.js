const QUIZZES = [
    {
        question: "What is the density of gold?",
        answer1: "15",
        answer2: "16",
        answer3: "21.2",
        answer4: "19.3",
        correctAnswer: 4
    },
    {
        question: "What is the biggest country?",
        answer1: "Montenegro",
        answer2: "Monaco",
        answer3:  "Russia",
        answer4: "Vatican",
        correctAnswer: 3
    },
    {
        question: "Which of these is a prime number?",
        answer1: "5521",
        answer2: "5529",
        answer3: "5533",
        answer4: "5537",
        correctAnswer: 1
    },
    {
        question: "What is the scientific name of a butterfly?",
        answer1: "Apis",
        answer2:  "Coleoptera",
        answer3:  "Formicidae",
        answer4:  "Rhopalocera",
        correctAnswer: 3
    }
];


export function getRandomQuiz() {
    let rndIndex = Math.floor(Math.random() * QUIZZES.length);
    return QUIZZES[rndIndex];
}
export function getAll() {
    return QUIZZES;
}
