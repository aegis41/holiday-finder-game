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
 * @property {number} pointsPer - Number of points awarded per click
 * @property {number} highScoreCount - Number of high scores to save and display
 * @property {number} bonusPtsModifier - Points multiplier for glowy clicks
 */
export const gameConfig = {
    items: {
        defaultCount: -1,                                   // Use -1 for random count
        minCount: 10,                                       // Minimum items for random count
        maxCount: 20,                                       // Maximum items for random count
        minDistance: 100,                                   // Minimum distance between items
        // tokenString: "I Love You!",                         // For string games
        // fixed: [                                            // Fixed coordinates
        //     [125, 475],
        //     [475, 475],
        //     [125, 675],
        //     [475, 675]
        // ]
    },
    pointsPer: 10,
    highScoreCount: 3,
    bonusPtsModifier: 5
};
