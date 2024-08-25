const quizContainer = document.querySelector(".quiz-container");
const questionEl = document.querySelector(".quiz-container .question");
const optionsEl = document.querySelector(".quiz-container .options");
const nextBtn = document.querySelector(".quiz-container .next-btn");
const quizResult = document.querySelector(".quiz-result");
const resultHeading = document.getElementById("result-heading");
const questionsSummary = document.getElementById("questions-summary");
const timerEl = document.querySelector(".timer");

let questionNumber = 0;
let score = 0;
const Max_questions = 5;
let userAnswers = [];
let timer;
let timeLeft = 10;


const shuffleArray = array => array.slice().sort(() => Math.random() - 0.5);


let quizData = shuffleArray([
    {
        question: "What does HTML stand for?",
        a: "Hypertext Markup Language",
        b: "Hypertext Management Language",
        c: "Hypertext Multilayer Language",
        d: "Hyperlink and Text Markup Language",
        correct: "a",
    },
    {
        question: "What does CSS stand for?",
        a: "Cascading Style Sheets",
        b: "Creative Style Sheets",
        c: "Colorful Style Sheets",
        d: "Computer Style Sheets",
        correct: "a",
    },
    {
        question: "Which property is used to change text color in CSS?",
        a: "color",
        b: "text-color",
        c: "font-color",
        d: "background-color",
        correct: "a",
    },
    {
        question: "Which CSS property is used to set the font size?",
        a: "font-size",
        b: "text-size",
        c: "font-style",
        d: "text-style",
        correct: "a",
    },
    {
        question: "Which property is used to set the margin in CSS?",
        a: "margin",
        b: "spacing",
        c: "padding",
        d: "border",
        correct: "a",
    },
    {
        question: "Which language is used for web development?",
        a: "JavaScript",
        b: "Python",
        c: "C++",
        d: "Java",
        correct: "a",
    },
    {
        question: "Which tag is used for the largest heading in HTML?",
        a: "h1",
        b: "h2",
        c: "h3",
        d: "h4",
        correct: "a",
    },
    {
        question: "What does JS stand for?",
        a: "JavaScript",
        b: "JavaServer",
        c: "JustScript",
        d: "JScript",
        correct: "a",
    },
    {
        question: "What does HTML stand for?",
        a: "Markup",
        b: "Language",
        c: "Script",
        d: "Style",
        correct: "b",
    },
    {
        question: "Which tag is used for a paragraph in HTML?",
        a: "div",
        b: "p",
        c: "span",
        d: "head",
        correct: "b",
    },
    {
        question: "Which property is used to change the background color in CSS?",
        a: "color",
        b: "background",
        c: "border",
        d: "padding",
        correct: "b",
    },
    {
        question: "Which method is used to add an element in JavaScript?",
        a: "append",
        b: "push",
        c: "add",
        d: "concat",
        correct: "b",
    },
    {
        question: "Which tag is used to include a JavaScript file?",
        a: "link",
        b: "style",
        c: "script",
        d: "meta",
        correct: "c",
    },
    {
        question: "Which attribute is used to provide a unique identifier in HTML?",
        a: "class",
        b: "id",
        c: "name",
        d: "title",
        correct: "b",
    },

    {
        question: "Which keyword is used to declare a variable in JavaScript?",
        a: "var",
        b: "let",
        c: "const",
        d: "all",
        correct: "d",
    },
    {
        question: "Which HTML tag is used for a hyperlink?",
        a: "a",
        b: "link",
        c: "href",
        d: "ul",
        correct: "a",
    },
    {
        question: "Which CSS property is used to make text bold?",
        a: "font-weight",
        b: "bold",
        c: "font-style",
        d: "text-style",
        correct: "a",
    },
    {
        question: "Which HTML tag is used to define an unordered list?",
        a: "ul",
        b: "ol",
        c: "li",
        d: "list",
        correct: "a",
    }
]).slice(0, Max_questions);

const startTimer = () => {
    timeLeft = 10;
    timerEl.textContent = `Time left: ${timeLeft} seconds`;
    clearInterval(timer);
    timer = setInterval(() => {
        timeLeft--;
        timerEl.textContent = `Time left: ${timeLeft} seconds`;
        if (timeLeft <= 0) {
            clearInterval(timer);
            handleNextQuestion();
        }
    }, 1000);
};

const handleNextQuestion = () => {
    if (questionNumber >= Max_questions - 1) {
        displayQuizResult();
        return;
    }
    questionNumber++;
    createQuestion();
};

const displayQuizResult = () => {
    quizResult.style.display = "flex";
    quizContainer.style.display = "none";
    resultHeading.innerHTML = `You have scored ${score} out of ${Max_questions}.`;
    questionsSummary.innerHTML = "";
    quizData.slice(0, Max_questions).forEach((data, index) => {
        const questionContainer = document.createElement("div");
        questionContainer.classList.add("question-container");
        const questionText = document.createElement("div");
        questionText.classList.add("question");
        questionText.innerHTML = `${index + 1}. ${data.question}`;
        questionContainer.appendChild(questionText);
        const userAnswer = userAnswers[index] || "Not Answered";
        const userAnswerText = document.createElement("div");
        userAnswerText.classList.add("user-answer");
        userAnswerText.innerHTML = `Your answer: ${userAnswer}`;
        questionContainer.appendChild(userAnswerText);
        const correctAnswerText = document.createElement("div");
        correctAnswerText.classList.add("correct-answer");
        correctAnswerText.innerHTML = `Correct Answer: ${data[data.correct]}`;
        questionContainer.appendChild(correctAnswerText);
        if (userAnswers[index] === data[data.correct]) {
            questionContainer.classList.add("correct");
        } else if (userAnswers[index] !== "Not Answered") {
            questionContainer.classList.add("incorrect");
        }
        questionsSummary.appendChild(questionContainer);
    });
};

const checkAnswer = (e) => {
    let userAnswer = e.target.textContent;
    userAnswers[questionNumber] = userAnswer;
    if (userAnswer === quizData[questionNumber][quizData[questionNumber].correct]) {
        score++;
        e.target.classList.add("correct");
    } else {
        e.target.classList.add("incorrect");
    }
    let allOptions = document.querySelectorAll(".quiz-container .option");
    allOptions.forEach((o) => {
        o.classList.add("disabled");
    });
    clearInterval(timer);
};

const createQuestion = () => {
    optionsEl.innerHTML = "";
    questionEl.innerHTML = `<span class='question-number'>${questionNumber + 1}/${Max_questions}</span> ${quizData[questionNumber].question}`;
    const shuffledOptions = shuffleArray([
        quizData[questionNumber].a,
        quizData[questionNumber].b,
        quizData[questionNumber].c,
        quizData[questionNumber].d
    ]);
    shuffledOptions.forEach((o) => {
        const option = document.createElement("button");
        option.classList.add("option");
        option.innerHTML = o;
        optionsEl.appendChild(option);
        option.addEventListener("click", (e) => {
            checkAnswer(e);
        });
    });
    startTimer();
};

nextBtn.addEventListener("click", handleNextQuestion);

// Start the quiz by creating the first question
createQuestion();
