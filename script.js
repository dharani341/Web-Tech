// Enhanced Quiz Data
const quizData = [
    {
        question: "What does HTML stand for?",
        options: [
            "HyperText Markup Language",
            "Home Tool Markup Language",
            "Hyperlinks and Text Markup Language",
            "Hyper Transfer Markup Language"
        ],
        correct: 0,
        explanation: "HTML stands for HyperText Markup Language, the standard markup language for documents designed to be displayed in a web browser."
    },
    {
        question: "Which language is used for styling web pages?",
        options: ["HTML", "CSS", "JavaScript", "Python"],
        correct: 1,
        explanation: "CSS (Cascading Style Sheets) is used to style and layout web pages."
    },
    {
        question: "Which is not a programming language?",
        options: ["Python", "HTML", "Java", "C++"],
        correct: 1,
        explanation: "HTML is a markup language, not a programming language as it doesn't have logic or programming constructs."
    },
    {
        question: "What does CSS stand for?",
        options: [
            "Computer Style Sheets",
            "Creative Style Sheets",
            "Cascading Style Sheets",
            "Colorful Style Sheets"
        ],
        correct: 2,
        explanation: "CSS stands for Cascading Style Sheets, used to style HTML elements."
    },
    {
        question: "Which of these is a JavaScript framework?",
        options: ["Laravel", "Django", "React", "Flask"],
        correct: 2,
        explanation: "React is a JavaScript library for building user interfaces, while the others are backend frameworks for other languages."
    }
];

let currentQuestionIndex = 0;
let score = 0;
let selectedAnswers = Array(quizData.length).fill(null);

// DOM Elements
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");
const prevBtn = document.getElementById("prev-btn");
const resultEl = document.getElementById("result");
const scoreDisplay = document.getElementById("score-display");
const feedbackEl = document.getElementById("feedback");
const progressBar = document.getElementById("progress-bar");
const questionCounter = document.getElementById("question-counter");
const restartBtn = document.getElementById("restart-btn");

// Initialize Quiz
function initQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    selectedAnswers = Array(quizData.length).fill(null);
    document.getElementById("quiz-container").style.display = "block";
    resultEl.style.display = "none";
    updateProgress();
    displayQuestion();
}

// Display Question
function displayQuestion() {
    const currentQuestion = quizData[currentQuestionIndex];
    questionEl.textContent = currentQuestion.question;
    optionsEl.innerHTML = "";

    currentQuestion.options.forEach((option, index) => {
        const button = document.createElement("button");
        button.textContent = option;
        button.className = "btn btn-outline-dark";
        
        // Check if this option was previously selected
        if (selectedAnswers[currentQuestionIndex] === index) {
            button.classList.add("active");
        }
        
        button.onclick = () => selectAnswer(index);
        optionsEl.appendChild(button);
    });

    // Update navigation buttons
    prevBtn.disabled = currentQuestionIndex === 0;
    nextBtn.disabled = selectedAnswers[currentQuestionIndex] === null;
    nextBtn.textContent = currentQuestionIndex === quizData.length - 1 ? "Submit" : "Next";
    
    // Update progress
    updateProgress();
}

// Update Progress Bar and Counter
function updateProgress() {
    const progress = ((currentQuestionIndex + 1) / quizData.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute("aria-valuenow", progress);
    questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${quizData.length}`;
}

// Handle Answer Selection
function selectAnswer(selectedIndex) {
    selectedAnswers[currentQuestionIndex] = selectedIndex;
    const currentQuestion = quizData[currentQuestionIndex];
    
    Array.from(optionsEl.children).forEach((btn, index) => {
        btn.disabled = true;
        btn.classList.remove("btn-outline-dark", "active");
        
        if (index === currentQuestion.correct) {
            btn.classList.add("btn-success");
            if (index === selectedIndex) {
                btn.classList.add("correct-answer");
            }
        } else if (index === selectedIndex) {
            btn.classList.add("btn-danger", "wrong-answer");
        } else {
            btn.classList.add("btn-outline-secondary");
        }
    });
    
    nextBtn.disabled = false;
}

// Next Question
nextBtn.addEventListener("click", () => {
    // Calculate score if moving to next question or submitting
    const currentQuestion = quizData[currentQuestionIndex];
    if (selectedAnswers[currentQuestionIndex] === currentQuestion.correct) {
        score++;
    }
    
    if (currentQuestionIndex < quizData.length - 1) {
        currentQuestionIndex++;
        displayQuestion();
    } else {
        showResult();
    }
});

// Previous Question
prevBtn.addEventListener("click", () => {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        displayQuestion();
    }
});

// Show Result
function showResult() {
    document.getElementById("quiz-container").style.display = "none";
    resultEl.style.display = "block";
    
    // Calculate percentage
    const percentage = Math.round((score / quizData.length) * 100);
    
    // Display score
    scoreDisplay.textContent = `${score}/${quizData.length} (${percentage}%)`;
    
    // Provide feedback based on score
    if (percentage >= 80) {
        feedbackEl.textContent = "Excellent work! You really know your stuff!";
        feedbackEl.style.color = "var(--success-color)";
    } else if (percentage >= 60) {
        feedbackEl.textContent = "Good job! You have a solid understanding.";
        feedbackEl.style.color = "#ffc107";
    } else if (percentage >= 40) {
        feedbackEl.textContent = "Not bad! Keep learning and you'll improve.";
        feedbackEl.style.color = "#fd7e14";
    } else {
        feedbackEl.textContent = "Keep practicing! Review the material and try again.";
        feedbackEl.style.color = "var(--danger-color)";
    }
}

// Restart Quiz
restartBtn.addEventListener("click", initQuiz);

// Initialize the quiz when the page loads
document.addEventListener("DOMContentLoaded", initQuiz);