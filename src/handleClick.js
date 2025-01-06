import { gameState } from './gameState.js';
import { showSparkle } from './sparkle.js';

/**
 * Handles the interaction logic for a given game item.
 *
 * @function
 * @param {Phaser.GameObjects.Image} item - The interactive item to set up.
 * @param {number} order - The expected order of interaction for this item.
 * @returns {void}
 */
export function handleClick(item, order) {
    item.on('pointerdown', () => {
        const gameItem = gameState.items.find((i) => i.gameObject === item);
        if (gameItem && !gameItem.found) {
            gameItem.found = true; // Mark the item as found
            gameItem.clickOrder = order; // Set the order in which it was clicked
            gameState.remainingItems -= 1;

            // Check if clicked in the correct order
            if (gameState.expectedOrder[gameState.timer - 1] === order) {
                console.log('Correct Order!');
                gameState.score += 20; // Double points for correct order
            } else {
                gameState.score += 10; // Standard points
            }

            // Check for a perfect game at the end
            if (gameState.remainingItems === 0) {
                const isPerfectGame = gameState.items.every(
                    (item, idx) => item.clickOrder === gameState.expectedOrder[idx]
                );
                if (isPerfectGame) {
                    console.log('Perfect Game!');
                    gameState.score *= 3; // Triple the score
                }
            }

            item.destroy(); // Remove the item visually
            gameState.timerText.setText(`Score: ${gameState.score}`);

            // Highlight the next correct item
            if (gameState.remainingItems > 0) {
                const nextIndex = gameState.expectedOrder[gameState.timer];
                const nextCorrectItem = gameState.items.find((item, idx) => idx === nextIndex - 1 && !item.found);
                showSparkle(this, nextCorrectItem);
            }
        }
    });
}
