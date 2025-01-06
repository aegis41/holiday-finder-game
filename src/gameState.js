/**
 * Represents the current state of the game.
 *
 * @constant
 * @type {object}
 * @property {string} currentState - The current state of the game ('start', 'play', or 'gameover').
 * @property {number} score - The player's current score.
 * @property {number} remainingItems - The number of items left to find.
 * @property {number} timer - The elapsed time in seconds.
 * @property {object|null} timerEvent - Reference to the Phaser timer event object, or null if not running.
 * @property {Array<object>} items - Array of tappable game items. Each item includes:
 *   @property {Phaser.GameObjects.Image} gameObject - The Phaser game object for the item.
 *   @property {boolean} found - Indicates whether the item has been found.
 *   @property {number|null} clickOrder - The order in which the item was clicked (or null if not clicked).
 * @property {Array<number>} highScores - Array of saved high scores.
 */
export const gameState = {
    currentState: 'start', // Initial state is the start screen
    score: 0,             // Player's current score
    remainingItems: 0,    // Number of items left to find
    timer: 0,             // Timer to track elapsed time
    timerEvent: null,     // Reference to the timer event
    items: [],            // Array of tappable game items
    highScores: []        // Array to store high scores
};
