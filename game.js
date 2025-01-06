const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

const game = new Phaser.Game(config);

/**
 * Represents the current state of the game.
 *
 * @constant
 * @type {object}
 * @property {string} currentState - The current state of the game ('start', 'play', or 'gameover').
 * @property {number} score - The current score of the player.
 * @property {number} remainingItems - The number of items left to find.
 * @property {number} timer - The number of milliseconds passed.
 * @property {Array<object>} items - Array of tappable items in the scene.
 * @property {Array<number>} highScores - Array of saved high scores.
 */
const gameState = {
    currentState: 'start',
    score: 0,
    remainingItems: 0,
    timer: 0,
    items: [],
    highScores: []
};

/**
 * Preloads game assets before the scene starts.
 */
function preload() {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('startscreen', 'assets/images/startscreen.png');
    this.load.image('xray', 'assets/images/xray.png');
    this.load.image('item', 'assets/images/item.png');
}

/**
 * Creates the game scene, adding background and interactive objects.
 */
function create() {
    if (gameState.currentState === 'start') {
        showStartScreen(this);
    } else if (gameState.currentState === 'play') {
        const bg = this.add.image(0, 0, 'background');
        bg.setDisplaySize(this.scale.width, this.scale.height);
        bg.setOrigin(0, 0);

        addItems(
            {
                count: -1,
                random: true,
                season: 'default',
                minCount: 3,
                maxCount: 10,
                minDistance: 100
            },
            this
        );

        // display the stopwatch timer
        gameState.timerText = this.add.text(10, 10, `Time ${gameState.timer}s`,{
            fontSize: '24px',
            fill: '#fff'
        });

        startStopwatch(this);
    } else if (gameState.currentState === 'gameover') {
        showGameOverScreen(this);
    }
}

/**
 * Updates the game state on each frame.
 */
function update() {
    if (gameState.currentState === 'play' && gameState.remainingItems === 0) {
        handleGameOver(this);
    }
}

/**
 * Handles the Game Over state.
 */
function handleGameOver(scene) {
    console.log(`Game Over! Final Score: ${gameState.score}`);
    saveHighScore(gameState.score);
    gameState.currentState = 'gameover';
    showGameOverScreen(scene);
}

/**
 * Saves the current score to localStorage.
 */
function saveHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    localStorage.setItem('highScores', JSON.stringify(highScores.slice(0, 5)));
}

function startStopwatch(scene) {
    scene.time.addEvent({
        delay: 1000, // 1000ms = 1 second
        callback: () => {
            gameState.timer += 1; // Increment elapsed time
            gameState.timerText.setText(`Time: ${gameState.timer}s`); // Update timer display
        },
        loop: true // Keep running every second
    });
}


/**
 * Retrieves the high scores from localStorage.
 */
function getHighScores() {
    return JSON.parse(localStorage.getItem('highScores')) || [];
}

/**
 * Displays the Start Screen with a title and Play button.
 */
function showStartScreen(scene) {
    // add a background for the start screen
    const bg = scene.add.image(0, 0, 'startscreen');
    bg.setDisplaySize(scene.scale.width, scene.scale.height);
    bg.setOrigin(0, 0); // align the background image to the top-left corner

    const centerX = scene.scale.width / 2;
    const centerY = scene.scale.height * 0.75;

    // Add title text
    scene.add.text(centerX, centerY - 100, 'Holiday Finder Game', {
        fontSize: '48px',
        fill: '#fff',
        align: 'center'
    }).setOrigin(0.5);

    // Add Play button
    const playButton = scene.add.text(centerX, centerY, 'Play', {
        fontSize: '32px',
        fill: '#0f0',
        backgroundColor: '#333',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setOrigin(0.5).setInteractive();

    // Handle button click
    playButton.on('pointerdown', () => {
        console.log('Play button clicked!');
        gameState.currentState = 'play';
        scene.scene.restart(); // Restart the scene to enter the play state
    });
}

/**
 * Handles the Game Over state.
 */
function handleGameOver(scene) {
    console.log(`Game Over! Final Score: ${gameState.score}`);
    saveHighScore(gameState.score);
    gameState.currentState = 'gameover';
    showGameOverScreen(scene);
}

/**
 * Displays the Game Over screen and High Scores.
 */
function showGameOverScreen(scene) {
    scene.cameras.main.setBackgroundColor('#000');
    const centerX = scene.scale.width / 2;
    let currentY = 200;

    if (gameState.currentState === 'gameover') {
        scene.add.text(centerX, currentY, 'Game Over!', {
            fontSize: '48px',
            color: '#fff',
            align: 'center'
        }).setOrigin(0.5);
        currentY += 100;

        scene.add.text(centerX, currentY, `Your Score: ${gameState.score}`, {
            fontSize: '32px',
            color: '#fff',
            align: 'center'
        }).setOrigin(0.5);
        currentY += 100;

        // Show elapsed time
        scene.add.text(centerX, currentY, `Elapsed Time: ${gameState.timer}s`, {
            fontSize: '32px',
            fill: '#fff',
            align: 'center'
        }).setOrigin(0.5);
        currentY += 100;        
    }
    
    const highScores = getHighScores();
    scene.add.text(centerX, currentY, 'High Scores:', {
        fontSize: '36px',
        color: '#fff',
        align: 'center'
    }).setOrigin(0.5);
    currentY += 50;

    highScores.forEach((score, index) => {
        scene.add.text(centerX, currentY, `${index + 1}. ${score}`, {
            fontSize: '24px',
            color: '#fff',
            align: 'center'
        }).setOrigin(0.5);
        currentY += 30;
    });

    const restartButton = scene.add.text(centerX, currentY + 50, 'Play Again', {
        fontSize: '32px',
        color: '#0f0',
        backgroundColor: '#333',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setOrigin(0.5).setInteractive();

    restartButton.on('pointerdown', () => {
        gameState.currentState = 'play';
        gameState.score = 0;
        gameState.timer = 0;
        gameState.remainingItems = 0;
        gameState.items = [];
        scene.scene.restart();
    });
}

/**
 * Adds interactive items to the game scene based on the provided options.
 */
function addItems(options, scene) {
    const { count, random, season, minCount, maxCount, minDistance, maxIterations } = options;
    const itemCount = count === -1 ? Phaser.Math.Between(minCount, maxCount) : count;
    gameState.remainingItems = itemCount;

    const assetKey = getSeasonalAsset(season);
    const items = [];

    for (let i = 0; i < itemCount; i++) {
        let x, y;
        let retries = maxIterations;

        do {
            x = Phaser.Math.Between(50, scene.scale.width - 50);
            y = Phaser.Math.Between(50, scene.scale.height - 50);
            retries--;
        } while (!isPositionValid(x, y, items, minDistance) && retries > 0);

        const item = scene.add.image(x, y, assetKey).setInteractive();
        item.setDisplaySize(100, 100);
        item.setOrigin(0.5, 0.5);
        handleClick(item);

        items.push({ gameObject: item, found: false, clickOrder: null });
    }

    gameState.items = items;
    return items;
}

/**
 * Determines the appropriate asset for the season.
 */
function getSeasonalAsset(season) {
    const assets = { valentine: 'item', halloween: 'pumpkin', default: 'item' };
    return assets[season] || assets.default;
}

/**
 * Checks if a position is valid.
 */
function isPositionValid(x, y, items, minDistance) {
    for (const item of items) {
        const dx = item.gameObject.x - x;
        const dy = item.gameObject.y - y;
        if (Math.sqrt(dx * dx + dy * dy) < minDistance) {
            return false;
        }
    }
    return true;
}

/**
 * Sets up interaction logic for an item.
 */
function handleClick(item) {
    item.on('pointerdown', () => {
        const gameItem = gameState.items.find((i) => i.gameObject === item);
        if (gameItem && !gameItem.found) {
            gameItem.found = true;
            gameState.score += 10;
            gameState.remainingItems -= 1;
        }
        item.destroy();
    });
}
