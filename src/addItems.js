import { gameState } from './gameState.js';
import { isPositionValid, getSeasonalAsset } from './utils.js';
import { handleClick } from './handleClick.js';
import { gameConfig } from './gameConfig.js';

/**
 * Adds interactive items to the game scene based on a priority hierarchy:
 * 1. Token string
 * 2. Fixed coordinates
 * 3. Default count
 * 4. Random count (if defaultCount is -1)
 *
 * @function
 * @param {object} [options={}] - Configuration options for item creation.
 * @param {Phaser.Scene} scene - The Phaser scene where items will be added.
 * @returns {void}
 */
export function addItems(options = {}, scene) {
    const config = { ...gameConfig.items, ...options };

    let itemsToGenerate = [];

    // Priority 1: Token String
    if (config.tokenString) {
        itemsToGenerate = config.tokenString.split(/\s+/).filter(Boolean).map((word) => ({ word }));
        console.log(`Generated items from tokenString:`, itemsToGenerate);

    // Priority 2: Fixed Coordinates
    } else if (config.fixed && config.fixed.length > 0) {
        itemsToGenerate = config.fixed.map(([x, y]) => ({ x, y }));
        console.log(`Generated items from fixed coordinates:`, itemsToGenerate);

    // Priority 3: Default Count
    } else if (config.defaultCount !== -1) {
        itemsToGenerate = new Array(config.defaultCount).fill({dummy:"text"});
        console.log(`Generated default count items:`, itemsToGenerate);

    // Priority 4: Random Count
    } else if (config.defaultCount === -1 && config.minCount && config.maxCount) {
        const randomCount = Phaser.Math.Between(config.minCount, config.maxCount);
        itemsToGenerate = new Array(randomCount).fill({dummy:"text"});
        console.log(`Generated random count items:`, itemsToGenerate);
    }

    gameState.remainingItems = itemsToGenerate.length;
    gameState.items = [];

    itemsToGenerate.forEach((data, i) => {
        let x, y;

        // For fixed coordinates, use provided x, y
        if (data.x !== undefined && data.y !== undefined) {
            ({ x, y } = data);

        // For random placement
        } else {
            do {
                x = Phaser.Math.Between(50, scene.scale.width - 50);
                y = Phaser.Math.Between(50, scene.scale.height - 50);
            } while (!isPositionValid(x, y, gameState.items, config.minDistance));
        }

        // Add the item to the scene
        const item = scene.add.image(x, y, getSeasonalAsset('default')).setInteractive();
        item.setDisplaySize(100, 100).setOrigin(0.5, 0.5);

        // For tokenized strings, associate the word with the item
        if (data.word) {
            const wordText = scene.add.text(x, y, data.word, {
                fontSize: '16px',
                fill: '#fff',
                align: 'center'
            }).setOrigin(0.5);
            wordText.setVisible(false); // Hide the word initially
            item.setData('wordText', wordText);
        }

        // Attach interaction logic
        handleClick(item, i);

        // Store the item in gameState
        gameState.items.push({ gameObject: item, wordText: data.word || null, found: false });
    });

    console.log(`Generated ${itemsToGenerate.length} items.`);
}
