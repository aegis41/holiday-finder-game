import { gameState } from './gameState.js';
import { handleGameOver } from './gameOverScreen.js';

/**
 * Updates the game state on each frame.
 *
 * @function
 * @returns {void}
 */
export function update() {
    // Check if the game is in the 'play' state and all items have been found
    if (gameState.currentState === 'play' && gameState.remainingItems === 0) {
        // Trigger the game over logic
        handleGameOver(this);
    }
}
