document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const startScreen = document.getElementById('start-screen');
    const quizScreen = document.getElementById('quiz-screen');
    const resultScreen = document.getElementById('result-screen');
    const startBtn = document.getElementById('start-btn');
    const nextBtn = document.getElementById('next-btn');
    const restartBtn = document.getElementById('restart-btn');
    const questionElement = document.getElementById('question');
    const optionsContainer = document.getElementById('options');
    const questionCounter = document.getElementById('question-counter');
    const scoreElement = document.getElementById('score');
    const progressBar = document.getElementById('progress');
    const finalScoreElement = document.getElementById('final-score').querySelector('span');
    const resultMessageElement = document.getElementById('result-message');

    // Quiz Variables
    let currentQuestionIndex = 0;
    let score = 0;
    let questions = [];
    let selectedOption = null;

    // Quiz Questions
    questions = [
        {
            question: "What is the capital of France?",
            options: ["Berlin", "Madrid", "Paris", "Rome"],
            correctAnswer: 2
        },
        {
            question: "Which planet is known as the Red Planet?",
            options: ["Venus", "Mars", "Jupiter", "Saturn"],
            correctAnswer: 1
        },
        {
            question: "What is the largest ocean on Earth?",
            options: ["Atlantic Ocean", "Indian Ocean", "Arctic Ocean", "Pacific Ocean"],
            correctAnswer: 3
        },
        {
            question: "Who painted the Mona Lisa?",
            options: ["Vincent van Gogh", "Pablo Picasso", "Leonardo da Vinci", "Michelangelo"],
            correctAnswer: 2
        },
        {
            question: "What is the chemical symbol for gold?",
            options: ["Go", "Gd", "Au", "Ag"],
            correctAnswer: 2
        }
    ];

    // Event Listeners
    startBtn.addEventListener('click', startQuiz);
    nextBtn.addEventListener('click', nextQuestion);
    restartBtn.addEventListener('click', restartQuiz);

    // Functions
    function startQuiz() {
        startScreen.classList.add('hidden');
        quizScreen.classList.remove('hidden');
        showQuestion();
    }

    function showQuestion() {
        resetState();
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        
        // Update question counter
        questionCounter.textContent = `Question ${currentQuestionIndex + 1} of ${questions.length}`;
        
        // Update progress bar
        progressBar.style.width = `${((currentQuestionIndex + 1) / questions.length) * 100}%`;
        
        // Create options
        currentQuestion.options.forEach((option, index) => {
            const optionElement = document.createElement('button');
            optionElement.classList.add('option');
            optionElement.textContent = option;
            optionElement.addEventListener('click', () => selectOption(optionElement, index));
            optionsContainer.appendChild(optionElement);
        });
    }

    function resetState() {
        nextBtn.classList.add('hidden');
        while (optionsContainer.firstChild) {
            optionsContainer.removeChild(optionsContainer.firstChild);
        }
        selectedOption = null;
    }

    function selectOption(optionElement, optionIndex) {
        // If an option is already selected, do nothing
        if (selectedOption !== null) return;
        
        selectedOption = optionIndex;
        optionElement.classList.add('selected');
        
        const currentQuestion = questions[currentQuestionIndex];
        const correctIndex = currentQuestion.correctAnswer;
        
        // Disable all options
        const options = document.querySelectorAll('.option');
        options.forEach(option => {
            option.disabled = true;
        });
        
        // Mark correct and incorrect answers
        if (optionIndex === correctIndex) {
            optionElement.classList.add('correct');
            score++;
            scoreElement.textContent = `Score: ${score}`;
        } else {
            optionElement.classList.add('incorrect');
            options[correctIndex].classList.add('correct');
        }
        
        nextBtn.classList.remove('hidden');
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            showQuestion();
        } else {
            showResult();
        }
    }

    function showResult() {
        quizScreen.classList.add('hidden');
        resultScreen.classList.remove('hidden');
        
        finalScoreElement.textContent = `${score}/${questions.length}`;
        
        // Set result message based on score
        const percentage = (score / questions.length) * 100;
        let message;
        if (percentage >= 80) {
            message = "Excellent! You're a quiz master!";
        } else if (percentage >= 60) {
            message = "Good job! You know your stuff!";
        } else if (percentage >= 40) {
            message = "Not bad! Keep learning!";
        } else {
            message = "Keep practicing! You'll get better!";
        }
        
        resultMessageElement.textContent = message;
    }

    function restartQuiz() {
        currentQuestionIndex = 0;
        score = 0;
        scoreElement.textContent = `Score: ${score}`;
        resultScreen.classList.add('hidden');
        startScreen.classList.remove('hidden');
    }
});