import { gameState } from './gameState.js';
import { saveHighScore, getHighScores } from './utils.js';

/**
 * Displays the game over screen with the final score and high scores.
 *
 * @function
 * @param {Phaser.Scene} scene - The Phaser scene to render the game over screen.
 * @returns {void}
 */
export function showGameOverScreen(scene) {
    // Set a black background for the game over screen
    scene.cameras.main.setBackgroundColor('#000');

    const centerX = scene.scale.width / 2;
    let currentY = 50;

    // Add the "Game Over" text
    scene.add.text(centerX, currentY, 'Game Over!', {
        fontSize: '48px',
        fill: '#fff',
        align: 'center'
    }).setOrigin(0.5);
    currentY += 100;

    // Display the player's final score
    scene.add.text(centerX, currentY, `Your Score: ${gameState.score}`, {
        fontSize: '32px',
        fill: '#fff',
        align: 'center'
    }).setOrigin(0.5);
    currentY += 50;

    // Check if it's a perfect game
    // TODO: Implement perfect game logic
    // const isPerfectGame = gameState.items.every(
    //     (item, idx) => item.clickOrder === gameState.expectedOrder[idx]
    // );
    // if (isPerfectGame) {
    //     scene.add.text(centerX, currentY, 'Perfect Game! 🎉', {
    //         fontSize: '32px',
    //         fill: '#ff0',
    //         align: 'center'
    //     }).setOrigin(0.5);
    //     currentY += 50;
    // }

    // Show the elapsed time
    scene.add.text(centerX, currentY, `Elapsed Time: ${gameState.timer}s`, {
        fontSize: '32px',
        fill: '#fff',
        align: 'center'
    }).setOrigin(0.5);
    currentY += 100;

    // Display the high scores
    const highScores = getHighScores();
    scene.add.text(centerX, currentY, 'High Scores:', {
        fontSize: '36px',
        fill: '#fff',
        align: 'center'
    }).setOrigin(0.5);
    currentY += 50;

    highScores.forEach((score, index) => {
        scene.add.text(centerX, currentY, `${index + 1}. ${score}`, {
            fontSize: '18px',
            fill: '#fff',
            align: 'center'
        }).setOrigin(0.5);
        currentY += 24;
    });

    // Add a "Play Again" button
    const restartButton = scene.add.text(centerX, currentY + 50, 'Play Again', {
        fontSize: '32px',
        fill: '#0f0',
        backgroundColor: '#333',
        padding: { left: 10, right: 10, top: 5, bottom: 5 }
    }).setOrigin(0.5).setInteractive();

    // Restart the game on button click
    restartButton.on('pointerdown', () => {
        gameState.currentState = 'play';
        gameState.score = 0;
        gameState.timer = 0; // Reset the timer
        gameState.remainingItems = 0;
        gameState.items = [];
        scene.scene.restart();
    });
}

/**
 * Handles game over logic and transitions to the game over screen.
 *
 * @function
 * @param {Phaser.Scene} scene - The Phaser scene to transition to the game over screen.
 * @returns {void}
 */
export function handleGameOver(scene) {
    console.log(`Game Over! Final Score: ${gameState.score}`);

    // Stop the timer
    if (gameState.timerEvent) {
        gameState.timerEvent.destroy();
        gameState.timerEvent = null;
    }

    // Save the current score to high scores
    saveHighScore(gameState.score);

    // Transition to the game over screen
    gameState.currentState = 'gameover';
    showGameOverScreen(scene);
}
