/**
 * Preloads game assets before the scene starts.
 *
 * @function
 * @returns {void}
 */
export function preload() {
    this.load.image('background', 'assets/images/background.png'); // Game background image
    this.load.image('startscreen', 'assets/images/startscreen.png'); // Start screen background
    this.load.image('xray', 'assets/images/xray.png'); // X-ray effect image
    this.load.image('item', 'assets/images/item.png'); // Interactive game items
    this.load.image('sparkle', 'assets/images/sparkle.png'); // Sparkle effect for correct item
}
