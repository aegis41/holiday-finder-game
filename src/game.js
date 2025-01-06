import { preload } from './src/preload.js';
import { create } from './src/create.js';
import { update } from './src/update.js';

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

const game = new Phaser.Game(config);


/src
  ├── gameState.js         # Defines and initializes the gameState object.
  ├── preload.js           # Handles asset preloading.
  ├── create.js            # Handles scene creation logic.
  ├── update.js            # Manages per-frame updates.
  ├── startScreen.js       # Renders the start screen.
  ├── gameOverScreen.js    # Renders the game over screen.
  ├── addItems.js          # Logic for adding interactive items.
  ├── utils.js             # Utility functions (e.g., `isPositionValid`, `getSeasonalAsset`).
  ├── handleClick.js       # Handles item interactions.
  ├── timer.js             # Manages stopwatch functionality.
game.js                    # Main game configuration and scene setup.
