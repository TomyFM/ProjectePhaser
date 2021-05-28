export class Start extends Phaser.Scene {


    constructor() {
        super({key: 'Start'});
    }

    preload(){
        this.load.image('background', 'assets/images/bg_start.png');
        this.load.image('start', 'assets/images/start2.png');
        this.load.audio('soundMenu','assets/sounds/menu.ogg');
        this.load.image('settings','assets/images/settings.png');
        this.load.image('musicOn','assets/images/musicOn.png');
        this.load.image('musicOff','assets/images/musicOFF.png');
        this.load.bitmapFont('desyrel', 'assets/bitmapFonts/desyrel.png', 'assets/bitmapFonts/desyrel.xml');
    }

    create(){
        let panel = true;
        let soundSetting = true;
        let dificil = true;

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
        const startImage = this.add.image(300,250,'start').setOrigin(0,0);
        const settings = this.add.image(100,500,'settings').setOrigin(0,0).setScale(0.10,0.10);
        const musicOn = this.add.image(400,600,'musicOn').setOrigin(0,0).setScale(0.07,0.07).setVisible(false);
        const musicOff = this.add.image(400,600,'musicOff').setOrigin(0,0).setScale(0.07,0.07).setVisible(false);
        let bmpText = this.add.bitmapText(150, 600, 'desyrel', 'Sound: ', 45).setVisible(false);
        let settingsText = this.add.bitmapText(180, 500, 'desyrel', 'Settings', 50);
        let aboutMe = this.add.bitmapText(500, 500, 'desyrel', 'About Me', 50);
        let difficult = this.add.bitmapText(150, 650, 'desyrel', 'Difficult: ', 45).setVisible(false);;
        let easy = this.add.bitmapText(400, 650, 'desyrel', 'Easy ', 45).setVisible(false);
        let hard = this.add.bitmapText(400, 650, 'desyrel', 'Hard ', 45).setVisible(false);

        hard.setInteractive();
        easy.setInteractive();
        musicOn.setInteractive();
        musicOff.setInteractive();
        settings.setInteractive();
        startImage.setInteractive();
        aboutMe.setInteractive();

        aboutMe.on('pointerdown', () => {
            window.location.href = 'https://github.com/TomyFM/tomyfm.github.io','_blank';
        });


        settings.on('pointerdown', () => {
            if(panel){
                if(soundSetting) musicOn.setVisible(soundSetting);
                else musicOff.setVisible(!soundSetting);
                bmpText.setVisible(panel);
                hard.setVisible(panel);
                difficult.setVisible(panel);
            }else{
                musicOn.setVisible(false);
                musicOff.setVisible(false);
                bmpText.setVisible(false)
                hard.setVisible(false)
                easy.setVisible(false)
                difficult.setVisible(false);
            }
            panel=!panel;
        });

        hard.on('pointerdown', () => {
           hard.setVisible(false);
           easy.setVisible(true);
           dificil=false;
        });

        easy.on('pointerdown', () => {
            hard.setVisible(true);
            easy.setVisible(false);
            dificil=true;
        });

        musicOn.on('pointerdown', () => {
            soundSetting=!soundSetting;
            if(soundSetting) musicOn.setVisible(soundSetting);
            else musicOff.setVisible(!soundSetting);
            this.music.stop();
        });

        musicOff.on('pointerdown', () => {
            soundSetting=!soundSetting;
            if(soundSetting) {
                musicOn.setVisible(soundSetting);
                musicOff.setVisible(!soundSetting);
            }
            else musicOff.setVisible(!soundSetting);
            this.music.play();
        });

        startImage.on('pointerdown', () => {  this.music.destroy(); this.scene.start('Game',{
            soundSetting: soundSetting,
            dificil: dificil
        }); });




    }

    update(){

    }


}
