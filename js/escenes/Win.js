export class Win extends Phaser.Scene {

    constructor() {
        super({key: 'Win'});
    }

    init(data){
        this.score=data.score;
        this.soundSetting = data.soundSetting
    }

    preload(){
        this.load.audio('win', 'assets/sounds/win.ogg');
        this.load.image('replay','assets/images/replay.png');
        this.load.image('background', 'assets/images/bg_start.png');
        this.load.image('youWin', 'assets/images/congratulations.png');
        this.load.image('home', 'assets/images/home.png' );
        this.load.bitmapFont('desyrel', 'assets/bitmapFonts/desyrel.png', 'assets/bitmapFonts/desyrel.xml');
    }

    create(){

        this.win = this.sound.add('win')
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 1,
            seek: 0,
            loop: false,
            delay: 0
        }
        if(this.soundSetting) this.win.play(musicConfig);


        let record = localStorage.getItem('Points');
        if(this.score>record) localStorage.setItem('Points', this.score);



        let x=25;
        const backgroundImage = this.add.image(-100, -100,'background').setOrigin(0, 0);
        const youWin = this.add.image(150,0,'youWin').setOrigin(0,0).setScale(0.5,0.5);
        let recordtext = this.add.bitmapText(230+x, 350, 'desyrel', 'Record Points: '+record, 35);
        let points = this.add.bitmapText(230+x, 450, 'desyrel', 'Total Points: '+this.score, 35);

        const replay = this.add.image(230+x,550,'replay').setOrigin(0,0);
        const home = this.add.image(450+x,550,'home').setOrigin(0,0);
        home.setScale(0.10,0.1)
        replay.setScale(0.1,0.1)
        this.tweens.add({
            targets: youWin,
            y: 150,
        })

        replay.setInteractive();
        replay.on('pointerdown', () => {  this.win.destroy();this.scene.start('Game'); });
        home.setInteractive();
        home.on('pointerdown', () => {  this.win.destroy();this.scene.start('Start'); })
    }

    update(){

    }


}
