import {animacio,loadCamara,playerHit} from '../funcions.js'
import {Player} from '../components/Player.js'
import {LiveCounter} from "../components/LiveCounter.js";
import {Score} from "../components/Score.js";
import {Enemy} from "../components/Enemy.js";
import {Object} from "../components/Object.js";




export class Scene2 extends Phaser.Scene {

    constructor() {
        super({key: 'Scene2'});
    }

    init(data){
        this.playerGetKey=false;
        this.liveCounter=new LiveCounter(this, data.vides);
        this.score = new Score(this,data.score);
        this.soundSetting = data.soundSetting;
        this.dificil = data.dificil
    }

    preload() {
        this.load.audio('collect', 'assets/sounds/collect.mp3');
        this.load.audio('music','assets/sounds/musiclevels.ogg');
        this.load.audio('mort','assets/sounds/mort.ogg');
        this.load.audio('golemDeath','assets/images/golemDeath.mp3');

        this.load.image('lava', 'assets/images/lava.png')
        this.load.image('clau','assets/images/clau.png');
        this.load.image('portaClau', 'assets/images/portaClau.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('diamant', 'assets/images/diamant.png');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.tilemapTiledJSON('map2', 'assets/tilemaps/mapa_level2.json');
        this.load.image('volca', 'assets/images/bg_volca.png');
        this.load.atlas('player', 'assets/images/kenney_player.png','assets/images/kenney_player_atlas.json');

    }

    create() {

        //Add Sounds
        this.golemDeath =this.sound.add('golemDeath');
        this.mort = this.sound.add('mort');
        this.music = this.sound.add('music');
        this.collect = this.sound.add('collect')
        var musicConfig = {
            mute: false,
            volume: 1,
            rate: 1,
            detune: 1,
            seek: 0,
            loop: true,
            delay: 1
        }
        if(this.soundSetting) this.music.play(musicConfig);

        //Add Images
        const backgroundImage = this.add.image(0, 0,'volca').setOrigin(0, 0);
        backgroundImage.setScale(2.3, 1);
        const map = this.make.tilemap({ key: 'map2' });
        const tileset = map.addTilesetImage('platform', 'tiles');
        const terra =  map.createStaticLayer('terra', tileset,0, 0);
        const lava =  map.createStaticLayer('lava', tileset,0, 0);


        //Add Objects
        this.porta2 = new Object(this, map,'portaclau','portaClau').getObjects();
        if(this.dificil) this.spikes = new Object(this, map,'spikes','spike').getObjects();
        this.diamants = new Object(this, map,'diamants','diamant').getObjects();
        this.clau = new Object(this, map,'clau','clau').getObjects();
        this.player = new Player(this,50,300);
        this.enemy = new Enemy(this, 500, 500);
        this.enemy2 = new Enemy(this, 3200, 256);


        //Animation
        animacio(this);
        //Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        //Camera
        loadCamara(this);

        //Colisions

        this.physics.add.collider(this.player, terra);
        terra.setCollisionByProperty({collision: true});
        if(this.dificil) this.physics.add.collider(this.player, this.spikes, playerHit, null, this);
        this.physics.add.overlap(this.player, this.diamants, collectDiamants, null, this);
        this.physics.add.overlap(this.player, this.porta2, final, null, this);
        this.physics.add.overlap(this.player, this.clau, takeclau, null, this);
        this.physics.add.collider(this.enemy2, terra);
        this.physics.add.collider(this.enemy, terra);
        this.physics.add.collider(this.player, this.enemy, kill, null, this);
        this.physics.add.collider(this.player, this.enemy2, kill, null, this);

        this.physics.world.bounds.x = 0;
        this.physics.world.bounds.y = 0;
        this.physics.world.bounds.width = 3584;
        this.physics.world.bounds.height = 1200;

        //Score and Counter
        this.score.create();
        this.liveCounter.create();


    }

    update(){

        if(this.player.y>900) this.player.playerDrop(this);

        this.player.update();
        this.enemy.update(0,8);
        this.enemy2.update(38,50);

    }


}

function collectDiamants (player, diamant)
{
    diamant.disableBody(true, true);
    this.score.incrementScore();
    this.collect.play();

}

function final ()
{
    if(this.playerGetKey){
        this.music.stop();
        this.scene.start('Win',{
            vides: this.liveCounter.getLives(),
            score: this.score.getScore(),
            soundSetting: this.soundSetting
        })
    }

}

function takeclau(player, clau) {
    clau.disableBody(true, true);
    this.add.image(450 ,10 ,'clau').setOrigin(0, 0).setScrollFactor(0,0);
    this.playerGetKey=true;
}

function kill(player, enemy){
    if(player.body.touching.down) {
        enemy.destroy();
        this.golemDeath.play();
        this.score.incrementScore(true);

        this.anims.create({
            key: 'explosionAnimated',
            frames: 'explosion',
            frameRate: 15,
            repeat: 0
        });

        let explosion = this.add.sprite(enemy.x,enemy.y,'explosion');
        explosion.setScale(0.7,0.7);
        explosion.play('explosionAnimated');
        explosion.once('animationcomplete', () => {
            explosion.destroy();
        })



    }else player.playerDrop(this);

}