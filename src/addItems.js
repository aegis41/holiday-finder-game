import { gameState } from './gameState.js';
import { isPositionValid, getSeasonalAsset } from './utils.js';
import { handleClick } from './handleClick.js';

/**
 * Adds interactive items to the game scene based on the provided options.
 *
 * @function
 * @param {object} options - Configuration options for item creation.
 * @param {number} options.count - Number of items to generate. Use -1 for a random count.
 * @param {boolean} options.random - Whether to randomize item placement.
 * @param {string} options.season - Determines asset themes (e.g., 'valentine').
 * @param {number} options.minCount - Minimum number of items to generate if count is -1.
 * @param {number} options.maxCount - Maximum number of items to generate if count is -1.
 * @param {number} options.minDistance - Minimum distance between items to avoid overlap.
 * @param {Phaser.Scene} scene - The Phaser scene where items will be added.
 * @returns {void}
 */
export function addItems(options, scene) {
    const { count, random, season, minCount, maxCount, minDistance } = options;
    const itemCount = count === -1 ? Phaser.Math.Between(minCount, maxCount) : count;

    gameState.remainingItems = itemCount; // Set remaining items count
    gameState.items = []; // Reset gameState.items

    const assetKey = getSeasonalAsset(season);

    for (let i = 0; i < itemCount; i++) {
        let x, y;
        do {
            x = Phaser.Math.Between(50, scene.scale.width - 50);
            y = Phaser.Math.Between(50, scene.scale.height - 50);
        } while (!isPositionValid(x, y, gameState.items, minDistance));

        // Add the item to the scene
        const item = scene.add.image(x, y, assetKey).setInteractive();
        item.setDisplaySize(100, 100);
        item.setOrigin(0.5, 0.5);

        // Attach interaction logic
        handleClick(item, i + 1);

        // Store the item in the game state
        gameState.items.push({ gameObject: item, found: false, clickOrder: null });
    }

    // Define the correct order for interaction
    gameState.expectedOrder = [...Array(itemCount).keys()].map((i) => i + 1); // 1-based order
}
