/**
 * Logs or highlights the correct item without adding a sparkle image.
 *
 * @function
 * @param {Phaser.Scene} scene - The Phaser scene where the sparkle effect would be displayed.
 * @param {object} correctItem - The item to highlight (or log).
 * @param {Phaser.GameObjects.Image} correctItem.gameObject - The Phaser game object of the item.
 * @returns {void}
 */
export function showSparkle(scene, correctItem) {
    if (!correctItem || !correctItem.gameObject) {
        console.log('No correct item to highlight.');
        return;
    }

    // Log the correct item's position and ID for debugging
    const { gameObject } = correctItem;
    console.log(`Correct Item: (${gameObject.x}, ${gameObject.y})`);
}
