const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const blockSize = 20;
const rows = canvas.height / blockSize;
const cols = canvas.width / blockSize;

let snake = [
    { x: 5 * blockSize, y: 5 * blockSize },
    { x: 4 * blockSize, y: 5 * blockSize },
    { x: 3 * blockSize, y: 5 * blockSize }
];

let direction = 'right';
let food = generateFood();

function drawBlock(x, y, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, blockSize, blockSize);
}

function drawSnake() {
    snake.forEach(segment => drawBlock(segment.x, segment.y, 'lime'));
}

function drawFood() {
    drawBlock(food.x, food.y, 'red');
}

function generateFood() {
    let foodX, foodY;
    do {
        foodX = Math.floor(Math.random() * cols) * blockSize;
        foodY = Math.floor(Math.random() * rows) * blockSize;
    } while (snake.some(segment => segment.x === foodX && segment.y === foodY));
    return { x: foodX, y: foodY };
}

function moveSnake() {
    const head = { ...snake[0] };

    switch (direction) {
        case 'up':
            head.y -= blockSize;
            break;
        case 'down':
            head.y += blockSize;
            break;
        case 'left':
            head.x -= blockSize;
            break;
        case 'right':
            head.x += blockSize;
            break;
    }

    if (head.x === food.x && head.y === food.y) {
        food = generateFood();
    } else {
        snake.pop();
    }

    snake.unshift(head);

    if (head.x < 0 || head.x >= canvas.width || head.y < 0 || head.y >= canvas.height || snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        alert('游戏结束');
        snake = [
            { x: 5 * blockSize, y: 5 * blockSize },
            { x: 4 * blockSize, y: 5 * blockSize },
            { x: 3 * blockSize, y: 5 * blockSize }
        ];
        direction = 'right';
        food = generateFood();
    }
}

function changeDirection(event) {
    switch (event.key) {
        case 'ArrowUp':
            if (direction !== 'down') direction = 'up';
            break;
        case 'ArrowDown':
            if (direction !== 'up') direction = 'down';
            break;
        case 'ArrowLeft':
            if (direction !== 'right') direction = 'left';
            break;
        case 'ArrowRight':
            if (direction !== 'left') direction = 'right';
            break;
    }
}

function gameLoop() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawSnake();
    drawFood();
    moveSnake();
    setTimeout(gameLoop, 100);
}

document.addEventListener('keydown', changeDirection);
gameLoop();