/**
 * Game configuration settings.
 *
 * @constant
 * @type {object}
 * @property {object} items - Configuration for item generation.
 * @property {number} items.defaultCount - Default number of items to generate.
 * @property {boolean} items.randomize - Whether to randomize item placement.
 * @property {number} items.minCount - Minimum number of items for random count generation.
 * @property {number} items.maxCount - Maximum number of items for random count generation.
 * @property {number} items.minDistance - Minimum distance between items to avoid overlap.
 */
export const gameConfig = {
    items: {
        defaultCount: -1,    // Use -1 for random count
        randomize: false,     // Randomize item placement
        minCount: 3,         // Minimum items for random count
        maxCount: 10,        // Maximum items for random count
        minDistance: 100    // Minimum distance between items
    },
    pointsPer: 10,
    highScoreCount: 3
};


// fixed: [
//     [125, 475],
//     [475, 475],
//     [125, 675],
//     [475, 675]
// ]