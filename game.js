// Import Phaser scenes and modules
import { preload } from './src/preload.js';
import { create } from './src/create.js';
import { update } from './src/update.js';

// Phaser game configuration
const config = {
    type: Phaser.AUTO,
    width: 600,
    height: 800,
    scene: {
        preload: preload,
        create: create,
        update: update
    }
};

// Create the Phaser game instance
const game = new Phaser.Game(config);
