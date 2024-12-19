const questions = [
    {
        question: "Who is the founder of python?",
        answers: [
            { text: "Netwon", correct: false},
            { text: "Guido Van Rossum", correct: true},
            { text: "Sundar pichai", correct: false},
            { text: "Gallelio", correct: false},
            
        ]
    },
    {
        question: "What is the year when touch screen mobile invented?",
        answers: [
            { text: "1980", correct: false},
            { text: "1999", correct: false},
            { text: "1992", correct: true},
            { text: "1995", correct: false},
        ] 
    },
    {
        question: "What is tuple?",
        answers: [
            { text: "Mutable", correct: false},
            { text: "Immutable", correct: true},
            { text: "Mutable&Immutable", correct: false},
            { text: "None of these", correct: false},
        ]
    },
    {
        question: "What does PoP stand for?",
        answers: [
            { text: "Pre Office Protocol", correct: false},
            { text: "Protocol of post", correct: false},
            { text: "Post Office Protocol", correct: true},
            { text: "None of these", correct: false},
        ]  
    }
];
const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");

let currentQuestionIndex = 0;
let score = 0;

function startQuiz(){
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Next";
    showQuestion();
}

function showQuestion(){
    resetState();
    let currentQuestion = questions[currentQuestionIndex];
    let questionNo = currentQuestionIndex + 1;
    questionElement.innerHTML = questionNo + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);
        if(answer.correct){
            button.dataset.correct = answer.correct;
        }
        button.addEventListener("click", selectAnswer);
    });
}


function resetState(){
    nextButton.style.display = "none";
    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function selectAnswer(e){
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";
    if(isCorrect){
        selectedBtn.classList.add("correct");
        score++;
    }else{
        selectedBtn.classList.add("incorrect");
    }
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true"){
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
}

function showScore(){
    resetState();
    questionElement.innerHTML = `you scored ${score} out of ${questions.length}!`;
    nextButton.innerHTML = "play Again";
    nextButton.style.display = "block";
}

function handleNextButton(){
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length){
        showQuestion();
    }else{
        showScore();
    }
}

nextButton.addEventListener("click", () =>{
    if(currentQuestionIndex < questions.length){
        handleNextButton();
    }else{
        startQuiz();
    }
});
startQuiz();