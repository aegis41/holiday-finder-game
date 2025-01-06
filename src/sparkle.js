/**
 * Displays a sparkle effect on the specified item.
 *
 * @function
 * @param {Phaser.Scene} scene - The Phaser scene where the sparkle effect is displayed.
 * @param {object} correctItem - The item to highlight with the sparkle effect.
 * @param {Phaser.GameObjects.Image} correctItem.gameObject - The Phaser game object of the item.
 * @returns {void}
 */
export function showSparkle(scene, correctItem) {
    if (!correctItem || !correctItem.gameObject) {
        console.log('No correct item to highlight.');
        return;
    }

    const { gameObject } = correctItem;

    // Add a sparkle effect at the item's position
    const sparkle = scene.add.image(gameObject.x, gameObject.y, 'sparkle');
    sparkle.setScale(1.5); // Scale the sparkle effect

    // Create a fade-out animation for the sparkle
    scene.tweens.add({
        targets: sparkle,
        alpha: 0,
        duration: 1000, // Fade out over 1 second
        onComplete: () => sparkle.destroy() // Destroy the sparkle after the animation
    });

    console.log('Sparkle effect added to correct item!');
}
