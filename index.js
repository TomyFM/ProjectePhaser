import { Game} from '/js/game.js';

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    heigth: 240,
    scene: [Game],
    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: true,
        },
    },
    // scale: {
    //     mode: Game.Scale.RESIZE,
    //     autoCenter: Game.Scale.CENTER_BOTH
    // }
}

var game = new Phaser.Game(config);
