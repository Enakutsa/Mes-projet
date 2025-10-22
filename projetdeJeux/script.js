let score = 0;
let wood = 0;
let stone = 0;
let water = 0;
let food = 0;
let gameInterval;
let gameRunning = false;

// Élément du canevas et contexte
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// Chargement des éléments audio
const backgroundMusic = document.getElementById("backgroundMusic");
const collectSound = document.getElementById("collectSound");
const gameOverSound = document.getElementById("gameOverSound");

// Démarrer le jeu
document.getElementById("startButton").addEventListener("click", startGame);
document.getElementById("pauseButton").addEventListener("click", pauseGame);
document.getElementById("resetButton").addEventListener("click", resetGame);

function startGame() {
    if (!gameRunning) {
        gameRunning = true;
        backgroundMusic.play();
        gameInterval = setInterval(gameLoop, 1000 / 60);
    }
}

function pauseGame() {
    if (gameRunning) {
        gameRunning = false;
        backgroundMusic.pause();
        clearInterval(gameInterval);
    }
}

function resetGame() {
    gameRunning = false;
    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
    clearInterval(gameInterval);
    score = 0;
    wood = 0;
    stone = 0;
    water = 0;
    food = 0;
    updateUI();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function gameLoop() {
    updateGame();
    renderGame();
}

function updateGame() {
    // Logique de mise à jour du jeu
    score++;
    // Exemple de collecte de ressources
    if (score % 100 === 0) {
        wood++;
        collectSound.play();
    }
    if (score % 200 === 0) {
        stone++;
        collectSound.play();
    }
    if (score % 300 === 0) {
        water++;
        collectSound.play();
    }
    if (score % 400 === 0) {
        food++;
        collectSound.play();
    }
    updateUI();
}

function renderGame() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dessiner des éléments de jeu ici
    ctx.fillStyle = "green";
    ctx.fillRect(50, 50, 100, 100);
    ctx.fillStyle = "blue";
    ctx.fillRect(200, 50, 100, 100);
    ctx.fillStyle = "red";
    ctx.fillRect(350, 50, 100, 100);
}

function updateUI() {
    document.getElementById("score").textContent = score;
    document.getElementById("wood").textContent = wood;
    document.getElementById("stone").textContent = stone;
    document.getElementById("water").textContent = water;
    document.getElementById("food").textContent = food;
}

// Démarrer le jeu au chargement de la page pour les tests
// startGame();