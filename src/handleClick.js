import { gameConfig } from './gameConfig.js';
import { gameState } from './gameState.js';

/**
 * Handles the interaction logic for a given game item.
 *
 * @function
 * @param {Phaser.GameObjects.Image} item - The interactive item to set up.
 * @param {number} index - The index of the item in the gameState.items array.
 * @returns {void}
 */
export function handleClick(item, index, wordText="") {
    item.on('pointerdown', () => {
        console.log(wordText);
        console.log(`Item clicked at index: ${index}`);

        // Check if this is the selected item
        if (index === gameState.selectedItemIdx) {
            console.log('Selected item clicked!');
            gameState.score += gameConfig.pointsPer * gameConfig.bonusPtsModifier; // Bonus points
            item.setTint(0x00ff00); // Green tint for feedback
        } else {
            gameState.score += gameConfig.pointsPer; // Standard points
        }

        // Mark the item as found
        const gameItem = gameState.items[index];
        if (gameItem && !gameItem.found) {
            gameItem.found = true;
            gameState.remainingItems -= 1;

            // Update the score display
            if (gameState.timerText) {
                gameState.timerText.setText(`Score: ${gameState.score}`);
            }
        }

        // Remove the item visually
        item.destroy();

        // Move selectedItemIdx to another unfound item
        const unfoundItems = gameState.items
            .map((item, idx) => ({ item, idx }))
            .filter(({ item, idx }) => !item.found && idx !== index);

        if (unfoundItems.length > 0) {
            if (index === gameState.selectedItemIdx) {
                const randomIndex = Phaser.Math.Between(0, unfoundItems.length - 1);
                gameState.selectedItemIdx = unfoundItems[randomIndex].idx;
                console.log(`New selected item index: ${gameState.selectedItemIdx}`);
            }
        } else {
            gameState.selectedItemIdx = null; // No more items to select
            console.log('No more items to select');
        }
    });
}
