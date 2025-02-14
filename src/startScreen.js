import { gameState } from './gameState.js';

/**
 * Displays the start screen with a title and play button.
 *
 * @function
 * @param {Phaser.Scene} scene - The Phaser scene to render the start screen.
 * @returns {void}
 */
export function showStartScreen(scene) {
    // Add a background image for the start screen
    const bg = scene.add.image(0, 0, 'startscreen')
        .setDisplaySize(scene.scale.width, scene.scale.height)
        .setOrigin(0, 0);

    const centerX = scene.scale.width / 2;
    const centerY = scene.scale.height * 0.75;

    // Add the game title
    scene.add.text(centerX, centerY - 100, 'Holiday Finder Game', {
        fontSize: '48px',
        fill: '#000',
        align: 'center',
        backgroundColor: '#fff'
    }).setOrigin(0.5);

    // Add the play button
    const playButton = scene.add.text(centerX, centerY, 'Play', {
        fontSize: '32px',
        fill: '#0f0',
        backgroundColor: '#333',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setOrigin(0.5).setInteractive();

    // Handle button click to start the game
    playButton.on('pointerdown', () => {
        console.log('Play button clicked!');
        gameState.currentState = 'play';
        scene.scene.restart(); // Restart the scene to transition to the play state
    });
}
