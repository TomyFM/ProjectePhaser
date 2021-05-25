export class GameOver extends Phaser.Scene {

    constructor() {
        super({key: 'GameOver'});
    }

    init(data){
        this.score=data.score;
    }

    preload(){
        this.load.audio('gameOver', 'assets/sounds/gameOver.mp3');
        this.load.image('replay','assets/images/replay.png');
        this.load.image('background', 'assets/images/bg_start.png');
        this.load.image('gameOver', 'assets/images/game_over.png');
        this.load.image('home', 'assets/images/home.png' );
    }

    create(){

        this.gameOver = this.sound.add('gameOver')
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 1,
            seek: 0,
            loop: true,
            delay: 1
        }
        this.gameOver.play(musicConfig);

        const backgroundImage = this.add.image(-100, -100,'background').setOrigin(0, 0);
        const gameOver = this.add.image(150,0,'gameOver').setOrigin(0,0);
        const replay = this.add.image(230,550,'replay').setOrigin(0,0);
        const home = this.add.image(450,550,'home').setOrigin(0,0);
        home.setScale(0.10,0.1)
        replay.setScale(0.1,0.1)
        this.tweens.add({
            targets: gameOver,
            y: 260,
        })

        replay.setInteractive();
        replay.on('pointerdown', () => {  this.gameOver.destroy();this.scene.start('Game'); });
        home.setInteractive();
        home.on('pointerdown', () => {  this.gameOver.destroy();this.scene.start('Start'); })
    }

    update(){

    }


}
