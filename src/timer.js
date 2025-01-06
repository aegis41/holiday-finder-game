import { gameState } from './gameState.js';

/**
 * Starts the stopwatch timer for the game.
 *
 * @function
 * @param {Phaser.Scene} scene - The Phaser scene where the timer is displayed.
 * @returns {void}
 */
export function startStopwatch(scene) {
    // Create a timed event to update the timer every second
    gameState.timerEvent = scene.time.addEvent({
        delay: 1000, // 1 second
        callback: () => {
            gameState.timer += 1; // Increment elapsed time
            gameState.timerText.setText(`Time: ${gameState.timer}s`); // Update the timer display
        },
        loop: true // Keep running every second
    });
}

/**
 * Stops the stopwatch timer and clears the timer event.
 *
 * @function
 * @returns {void}
 */
export function stopStopwatch() {
    if (gameState.timerEvent) {
        gameState.timerEvent.destroy(); // Destroy the timer event
        gameState.timerEvent = null; // Clear the reference
    }
}
