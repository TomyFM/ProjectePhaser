export class Start extends Phaser.Scene {

    constructor() {
        super({key: 'Start'});
    }

    preload(){
        this.load.image('background', 'assets/images/bg_start.png');
        this.load.image('start', 'assets/images/start2.png');
        this.load.audio('soundMenu','assets/sounds/menu.ogg');
    }

    create(){
        this.music = this.sound.add('soundMenu');
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 0,
            seek: 0,
            loop: true,
            delay: 0
        }
        this.music.play(musicConfig);
        const backgroundImage = this.add.image(-100, -100,'background').setOrigin(0, 0);
        const startImage = this.add.image(300,300,'start').setOrigin(0,0);
        startImage.setInteractive();
        startImage.on('pointerdown', () => {  this.music.destroy(); this.scene.start('Game'); });


    }

    update(){

    }


}
