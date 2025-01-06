// Import Phaser scenes and modules
import { preload } from './src/preload.js';
import { create } from './src/create.js';
import { update } from './src/update.js';

// Phaser game configuration
const aspectRatio = 600 / 800; // Original aspect ratio (width / height)

const config = {
    type: Phaser.AUTO,
    width: Math.min(window.innerWidth, window.innerHeight * aspectRatio), // Adjust width dynamically
    height: Math.min(window.innerHeight, window.innerWidth / aspectRatio), // Adjust height dynamically
    scene: {
        preload: preload,
        create: create,
        update: update
    },
    scale: {
        mode: Phaser.Scale.FIT, // Automatically resize to fit the screen
        autoCenter: Phaser.Scale.CENTER_BOTH // Center the game canvas
    }
};

// Create the Phaser game instance
const game = new Phaser.Game(config);
