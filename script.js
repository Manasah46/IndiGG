const questions = [
    {
        question: "What is 2 + 2?",
        options: ["3", "4", "5", "6"],
        correctAnswer: "4"
    },
    {
        question: "Which planet is known as the Red Planet?",
        options: ["Earth", "Mars", "Venus", "Jupiter"],
        correctAnswer: "Mars"
    },
    // Add more questions here
];

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.getElementById("question-text");
const optionsList = document.getElementById("options-list");
const submitButton = document.getElementById("submit-button");
const resultText = document.getElementById("result");
const scoreText = document.getElementById("score");
const nextButton = document.getElementById("next-button");

function loadQuestion() {
    const currentQuestion = questions[currentQuestionIndex];
    questionText.textContent = currentQuestion.question;
    optionsList.innerHTML = "";

    currentQuestion.options.forEach((option) => {
        const li = document.createElement("li");
        const radio = document.createElement("input");
        radio.type = "radio";
        radio.name = "answer";
        radio.value = option;
        li.appendChild(radio);
        li.appendChild(document.createTextNode(option));
        optionsList.appendChild(li);
    });
}

function checkAnswer() {
    const selectedOption = document.querySelector("input[name='answer']:checked");
    if (!selectedOption) {
        resultText.textContent = "Please select an answer.";
        return;
    }

    const userAnswer = selectedOption.value;
    const currentQuestion = questions[currentQuestionIndex];

    if (userAnswer === currentQuestion.correctAnswer) {
        score++;
        resultText.textContent = "Correct!";
    } else {
        resultText.textContent = `Incorrect. The correct answer is ${currentQuestion.correctAnswer}.`;
    }

    submitButton.disabled = true;
    nextButton.style.display = "block";
    scoreText.textContent = `Score: ${score}`;
}

submitButton.addEventListener("click", checkAnswer);

nextButton.addEventListener("click", () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion();
        resultText.textContent = "";
        submitButton.disabled = false;
        nextButton.style.display = "none";
    } else {
        // Quiz completed
        questionText.textContent = "Quiz Completed!";
        optionsList.innerHTML = "";
        submitButton.style.display = "none";
        nextButton.style.display = "none";
    }
});

// Load the first question when the page loads
loadQuestion();
