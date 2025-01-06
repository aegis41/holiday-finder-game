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
 * @property {string} currentState - 
 * @property {number} score - The current score of the player.
 * @property {number} remainingItems - The number of items left to find.
 * @property {Array<Phaser.GameObjects.Image>} items - Array of tappable items in the scene.
 * @property {boolean} isGameOver - Flag indicating whether the game is over.
 */
const gameState = {
    currentState: 'play',   // can be 'start', 'play', or 'gameover'
    score: 0,
    remainingItems: 0,
    items: [],
    highScores: []
};

/**
 * Preloads game assets before the scene starts.
 *
 * @returns {void}
 */
function preload() {
    this.load.image('background', 'assets/images/background.png');
    this.load.image('xray', 'assets/images/xray.png');
    this.load.image('item', 'assets/images/item.png');
}

/**
 * Creates the game scene, adding background and interactive objects.
 *
 * @returns {void}
 */
function create() {
    // Add background
    const bg = this.add.image(0, 0, 'background');
    bg.setDisplaySize(this.scale.width, this.scale.height);
    bg.setOrigin(0, 0);

    // Add items
    addItems(
        {
            count: -1,
            random: true,
            season: 'valentine',
            minCount: 3,
            maxCount: 10,
            minDistance: 100
        },
        this
    );
}

/**
 * Updates the game state on each frame.
 *
 * @returns {void}
 */
function update() {
    
    // check for play state first
    if (gameState.currentState === 'play' && gameState.remainingItems === 0) handleGameOver();
}

function handleGameOver() {
    console.log(`Game Over! Final Score ${gameState.score}`);
    console.log('Click Order:', gameState.items.map((i) => i.clickOrder).filter(Boolean));
    console.log(`Game State`, gameState);
    // TODO: transition to the game over screen 

    // update high scores
    saveHighScore(gameState.score);

    gameState.currentState = 'gameover';
    showGameOverScreen();
}

function saveHighScore(score) {
    // Retrieve high scores from localStorage
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    
    // Add the new score and sort in descending order
    highScores.push(score);
    highScores.sort((a, b) => b - a);
    
    // Keep only the top 5 scores
    localStorage.setItem('highScores', JSON.stringify(highScores.slice(0, 5)));
}

function getHighScores() {
    return JSON.parse(localStorage.getItem('highScores')) || [];
}

function showGameOverScreen() {
    console.log("Show Game Over Screen");
};

/**
 * Adds interactive items to the game scene based on the provided options.
 *
 * @param {object} options - Configuration options for item creation.
 * @param {number} options.count - Number of items to generate. Use -1 for a random count.
 * @param {Array} [options.fixed] - Optional array of fixed [x, y] coordinates.
 * @param {boolean} [options.random=false] - Whether to place items randomly (overrides fixed positions).
 * @param {string} [options.season='default'] - Enum for seasonal assets (e.g., 'valentine', 'halloween').
 * @param {number} [options.minCount=3] - Minimum number of items to generate if count is -1.
 * @param {number} [options.maxCount=10] - Maximum number of items to generate if count is -1.
 * @param {number} [options.minDistance=50] - Minimum distance between items to avoid overlap
 * @param {number} [options.maxIterations=10] -  Maximum number of tries to place cleanly before allowing overlapped placement
 * @param {Phaser.Scene} scene - The Phaser scene where items will be added.
 * @returns {Array<Phaser.GameObjects.Image>} - An array of the created interactive items.
 */
function addItems(options, scene) {
    const {
        count,
        fixed = [],
        random = false,
        season = 'default',
        minCount = 3,
        maxCount = 10,
        minDistance = 50,
        maxIterations = 10
    } = options;

    // Determine the number of items to generate
    const itemCount = count === -1 ? Phaser.Math.Between(minCount, maxCount) : count;
    gameState.remainingItems = itemCount; // Update remaining items count

    const assetKey = getSeasonalAsset(season); // Determine the asset based on the season
    const items = [];

    for (let i = 0; i < itemCount; i++) {
        let x, y;
        let retries = maxIterations; // Limit retries for random placement

        if (!random && fixed[i]) {
            [x, y] = fixed[i];
        } else {
            do {
                x = Phaser.Math.Between(50, scene.scale.width - 50);
                y = Phaser.Math.Between(50, scene.scale.height - 50);
                retries--;
            } while (!isPositionValid(x, y, items, minDistance) && retries > 0);
        }

        const item = scene.add.image(x, y, assetKey).setInteractive();
        item.setDisplaySize(100, 100);
        item.setOrigin(0.5, 0.5);
        handleClick(item);

        // Add the item to the state with additional properties
        items.push({ GameObjects: item, found: false, clickOrder: null });
    }

    gameState.items = items; // store the items in the state
    return items;
}

/**
 * Determines the asset key to use based on the given season.
 *
 * @param {string} season - The current season (e.g., 'valentine').
 * @returns {string} - The asset key for the season.
 */
function getSeasonalAsset(season) {
    const seasonalAssets = {
        valentine: 'item',
        halloween: 'pumpkin',
        default: 'item'
    };

    return seasonalAssets[season] || seasonalAssets.default;
}

/**
 * Checks if the position is valid (not overlapping other items and within bounds).
 *
 * @param {number} x - The x-coordinate of the position.
 * @param {number} y - The y-coordinate of the position.
 * @param {Array<Phaser.GameObjects.Image>} items - Existing items to check against.
 * @param {number} minDistance - Minimum distance allowed between items.
 * @returns {boolean} - Whether the position is valid.
 */
function isPositionValid(x, y, items, minDistance) {
    for (const item of items) {
        const dx = item.x - x;
        const dy = item.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
            return false;
        }
    }
    return true;
}

function getRemainingItems() {
    return gameState.items.filter((item) => !item.found);
}

/**
 * Sets up interaction logic for a given item.
 *
 * @param {Phaser.GameObjects.Image} item - The interactive item to set up.
 * @returns {void}
 */
function handleClick(item) {
    item.on('pointerdown', () => {
        console.log('Item found!');

        // Find the item in gameState.items
        const gameItem = gameState.items.find((i) => i.GameObjects === item);
        if (gameItem && !gameItem.found) {
            // update game state
            gameItem.found = true;
            gameItem.clickOrder = gameState.score / 10 + 1; //order of interaction -- may change later

            gameState.score += 10;
            gameState.remainingItems -= 1;
        }

        item.destroy(); // Remove the item from the scene
    });
}