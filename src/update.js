import { gameState } from './gameState.js';
import { handleGameOver } from './gameOverScreen.js';

/**
 * Updates the game state on each frame.
 *
 * @function
 * @returns {void}
 */
export function update() {
    // Highlight the selected item
    if (gameState.selectedItemIdx !== null && gameState.items.length > 0) {
        const selectedItem = gameState.items[gameState.selectedItemIdx].gameObject;

        if (selectedItem && !selectedItem.isHighlighted) {
            // Clear highlight from previously highlighted item
            gameState.items.forEach((item, index) => {
                if (index !== gameState.selectedItemIdx && item.gameObject.isHighlighted) {
                    item.gameObject.clearTint();
                    item.gameObject.isHighlighted = false;
                }
            });

            // Apply highlight effect to the selected item
            selectedItem.setTint(0x00ff00); // Yellow tint
            selectedItem.isHighlighted = true;
        }
    }

    // Check if the game is in the 'play' state and all items have been found
    if (gameState.currentState === 'play' && gameState.remainingItems === 0) {
        // Trigger the game over logic
        handleGameOver(this);
    }
}
