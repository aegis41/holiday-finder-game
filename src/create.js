import { gameState } from './gameState.js';
import { showStartScreen } from './startScreen.js';
import { showGameOverScreen } from './gameOverScreen.js';
import { addItems } from './addItems.js';
import { startStopwatch } from './timer.js';

/**
 * Creates the game scene, handling different states ('start', 'play', 'gameover').
 *
 * @function
 * @returns {void}
 */
export function create() {
    if (gameState.currentState === 'start') {
        // Render the start screen
        showStartScreen(this);
    } else if (gameState.currentState === 'play') {
        // Add the background for the play screen
        const bg = this.add.image(0, 0, 'background')
            .setDisplaySize(this.scale.width, this.scale.height)
            .setOrigin(0, 0);

        // Add interactive items to the play screen
        addItems({}, this);

        // Add and initialize the timer display
        gameState.timerText = this.add.text(10, 10, `Time: ${gameState.timer}s`, {
            fontSize: '24px',
            fill: '#fff'
        });

        // Start the stopwatch timer
        startStopwatch(this);
    } else if (gameState.currentState === 'gameover') {
        // Render the game over screen
        showGameOverScreen(this);
    }
}
