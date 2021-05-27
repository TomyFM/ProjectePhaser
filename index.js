import { Scene1} from '/js/escenes/scene1.js';
import { Start} from '/js/escenes/start.js';
import { Scene2} from '/js/escenes/scene2.js';
import { GameOver} from '/js/escenes/GameOver.js';
import { Win} from '/js/escenes/Win.js';

console.log('test');

const config = {
    type: Phaser.AUTO,
    parent: 'game',
    width: 800,
    heigth: 600,
    scene: [Start,Scene1,Scene2,GameOver,Win],

    physics: {
        default: 'arcade',
        arcade: {
            gravity: { y: 500 },
            debug: false,
        },
    },
    // scale: {
    //     mode: Game.Scale.RESIZE,
    //     autoCenter: Game.Scale.CENTER_BOTH
    // }
}

var game = new Phaser.Game(config);






