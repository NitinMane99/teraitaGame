// Number Guessing Game
const maxInput = document.getElementById('maxNumber');
const guessInput = document.getElementById('guessInput');
const guessButton = document.getElementById('guessButton');
const feedback = document.getElementById('feedback');
let myNumber;

guessButton.addEventListener('click', function () {
    if (!myNumber) {
        const max = parseInt(maxInput.value);
        myNumber = Math.floor(Math.random() * max) + 1;
    }
    const guess = parseInt(guessInput.value);

    if (guess === myNumber) {
        feedback.innerText = `Congrats! You guessed it right. The number was ${myNumber}.`;
        myNumber = null;
    } else if (guess > myNumber) {
        feedback.innerText = 'Your guess is too high! Try a smaller number.';
    } else {
        feedback.innerText = 'Your guess is too low! Try a larger number.';
    }
});

// Snake Game
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const gridSize = 20;
let canvasSize = 300;

if (window.innerWidth < 768) {
    canvasSize = window.innerWidth - 40;
}

canvas.width = canvasSize;
canvas.height = canvasSize;

let snake = [{x: canvasSize / 2, y: canvasSize / 2}];
let direction = {x: 0, y: 0};
let food = generateFoodPosition();
let score = 0;
let gameOver = false;

document.addEventListener('keydown', changeDirection);
document.getElementById('restartButton').addEventListener('click', resetGame);

function changeDirection(event) {
    const keyPressed = event.keyCode;

    if (keyPressed === 37 && direction.x === 0) {
        direction = {x: -gridSize, y: 0};
    } else if (keyPressed === 38 && direction.y === 0) {
        direction = {x: 0, y: -gridSize};
    } else if (keyPressed === 39 && direction.x === 0) {
        direction = {x: gridSize, y: 0};
    } else if (keyPressed === 40 && direction.y === 0) {
        direction = {x: 0, y: gridSize};
    }
}

function generateFoodPosition() {
    return {
        x: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize,
        y: Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize
    };
}

function updateGame() {
    if (gameOver) return;

    const head = {x: snake[0].x + direction.x, y: snake[0].y + direction.y};

    if (head.x === food.x && head.y === food.y) {
        snake.unshift(head);
        score++;
        document.getElementById('score').innerText = 'Score: ' + score;
        food = generateFoodPosition();
    } else {
        snake.pop();
        snake.unshift(head);
    }

    if (
        head.x < 0 || head.x >= canvasSize ||
        head.y < 0 || head.y >= canvasSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)
    ) {
        gameOver = true;
        document.getElementById('finalScore').innerText = 'Game Over! Final Score: ' + score;
        document.getElementById('finalScore').classList.remove('hidden');
        document.getElementById('restartButton').classList.remove('hidden');
    }
}

function resetGame() {
    snake = [{x: canvasSize / 2, y: canvasSize / 2}];
    direction = {x: 0, y: 0};
    food = generateFoodPosition();
    score = 0;
    gameOver = false;
    document.getElementById('score').innerText = 'Score: 0';
    document.getElementById('finalScore').classList.add('hidden');
    document.getElementById('restartButton').classList.add('hidden');
    gameLoop();
}

function drawGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'green';
    snake.forEach(segment => ctx.fillRect(segment.x, segment.y, gridSize, gridSize));

    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);
}

function gameLoop() {
    updateGame();
    drawGame();
    if (!gameOver) {
        setTimeout(gameLoop, 100);
    }
}

gameLoop();

// Rock-Paper-Scissors Game
const rpsChoices = document.querySelectorAll('.rpsChoice');
const rpsResult = document.getElementById('rpsResult');

rpsChoices.forEach(choice => {
    choice.addEventListener('click', function () {
        const userChoice = this.innerText;
        const computerChoice = ['Rock', 'Paper', 'Scissors'][Math.floor(Math.random() * 3)];
        let result;

        if (userChoice === computerChoice) {
            result = 'It\'s a tie!';
        } else if (
            (userChoice === 'Rock' && computerChoice === 'Scissors') ||
            (userChoice === 'Paper' && computerChoice === 'Rock') ||
            (userChoice === 'Scissors' && computerChoice === 'Paper')
        ) {
            result = `You win! ${userChoice} beats ${computerChoice}.`;
        } else {
            result = `You lose! ${computerChoice} beats ${userChoice}.`;
        }

        rpsResult.innerText = result;
    });
});
