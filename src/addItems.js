import { gameState } from './gameState.js';
import { isPositionValid, getSeasonalAsset } from './utils.js';
import { handleClick } from './handleClick.js';
import { gameConfig } from './gameConfig.js';

/**
 * Adds interactive items to the game scene based on the provided options.
 *
 * @function
 * @param {object} [options] - Configuration options for item creation. Overrides defaults in gameConfig.
 * @param {Phaser.Scene} scene - The Phaser scene where items will be added.
 * @returns {void}
 */
export function addItems(options = {}, scene) {
    // Merge provided options with defaults from gameConfig
    const config = { ...gameConfig.items, ...options };

    const itemCount = config.defaultCount === -1 
        ? Phaser.Math.Between(config.minCount, config.maxCount)
        : config.defaultCount;

    gameState.remainingItems = itemCount; // Set remaining items count
    gameState.items = []; // Reset gameState.items

    const assetKey = getSeasonalAsset(config.season || 'default');

    for (let i = 0; i < itemCount; i++) {
        let x, y;
        do {
            x = Phaser.Math.Between(50, scene.scale.width - 50);
            y = Phaser.Math.Between(50, scene.scale.height - 50);
        } while (!isPositionValid(x, y, gameState.items, config.minDistance));

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
