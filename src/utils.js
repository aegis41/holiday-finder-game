import { gameConfig } from "./gameConfig.js";

/**
 * Checks if the given position is valid (not overlapping with existing items).
 *
 * @function
 * @param {number} x - The x-coordinate of the position.
 * @param {number} y - The y-coordinate of the position.
 * @param {Array<object>} items - Array of existing items to check against.
 * @param {number} minDistance - The minimum allowed distance between items.
 * @returns {boolean} - True if the position is valid, otherwise false.
 */
export function isPositionValid(x, y, items, minDistance) {
    for (const item of items) {
        const dx = item.gameObject.x - x;
        const dy = item.gameObject.y - y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        if (distance < minDistance) {
            return false;
        }
    }
    return true;
}

/**
 * Determines the asset key to use based on the current season.
 *
 * @function
 * @param {string} season - The current season (e.g., 'valentine', 'halloween').
 * @returns {string} - The asset key for the corresponding season.
 */
export function getSeasonalAsset(season) {
    const seasonalAssets = {
        valentine: 'item',   // Valentine-themed asset
        halloween: 'pumpkin', // Halloween-themed asset
        default: 'item'      // Default asset
    };

    return seasonalAssets[season] || seasonalAssets.default;
}

/**
 * Saves the given score to the high scores in localStorage.
 *
 * @function
 * @param {number} score - The score to save.
 * @returns {void}
 */
export function saveHighScore(score) {
    const highScores = JSON.parse(localStorage.getItem('highScores')) || [];
    highScores.push(score);
    highScores.sort((a, b) => b - a); // Sort in descending order
    localStorage.setItem('highScores', JSON.stringify(highScores.slice(0, gameConfig.highScoreCount))); // Keep top 5 scores
}

/**
 * Retrieves the high scores from localStorage.
 *
 * @function
 * @returns {Array<number>} - An array of the top 5 high scores.
 */
export function getHighScores() {
    return JSON.parse(localStorage.getItem('highScores')).slice(0, gameConfig.highScoreCount) || [];
}
