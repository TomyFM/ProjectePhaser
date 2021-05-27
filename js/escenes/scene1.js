import {animacio,loadCamara,playerHit} from '../funcions.js'
import {Player} from '../components/Player.js'
import {LiveCounter} from '../components/LiveCounter.js'
import {Score} from "../components/Score.js";
import {Object} from "../components/Object.js";
import {Enemy} from "../components/Enemy.js";


export class Scene1 extends Phaser.Scene {

    constructor()
    {
        super({key: 'Game'});
    }

    init(data)
    {
        this.liveCounter=new LiveCounter(this, 4);
        this.score = new Score(this,0);
        this.soundSetting = data.soundSetting
        this.dificil = data.dificil

    }

    preload()
    {
        this.load.audio('collect', 'assets/sounds/collect.mp3');
        this.load.audio('mort','assets/sounds/mort.ogg');
        this.load.audio('level1','assets/sounds/level1.mp3');
        this.load.audio('golemDeath','assets/images/golemDeath.mp3');

        this.load.image('cor','assets/images/cor.png');
        this.load.image('porta', 'assets/images/porta.png');
        this.load.image('spike', 'assets/images/spike.png');
        this.load.image('diamant', 'assets/images/diamant.png');
        this.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/mapa_level1.json');
        this.load.image('background', 'assets/images/background.png');
        this.load.atlas('player', 'assets/images/kenney_player.png','assets/images/kenney_player_atlas.json')
        this.load.atlas('enemy', 'assets/images/golem.png','assets/images/golem.json')

        this.load.spritesheet('explosion', 'assets/images/explosion.png',{ frameWidth: 256, frameHeight: 256 })
        this.load.bitmapFont('desyrel', 'assets/bitmapFonts/desyrel.png', 'assets/bitmapFonts/desyrel.xml');

    }

    create()
    {
        //Add Sounds
        this.golemDeath =this.sound.add('golemDeath');
        this.mort = this.sound.add('mort');
        this.collect = this.sound.add('collect')
        this.music = this.sound.add('level1')
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
        const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
        backgroundImage.setScale(3.5, 1);
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('platform', 'tiles');
        const terra =  map.createStaticLayer('terra', tileset,0, 0);
        const aigua =  map.createStaticLayer('aigua', tileset,0, 0);

        //Add Objects
        this.porta = new Object(this, map,'porta','porta').getObjects();
        if(this.dificil) this.spikes = new Object(this, map,'spikes','spike').getObjects();

        this.diamants = new Object(this, map,'diamants','diamant').getObjects();


        this.player = new Player(this,100,100);
        this.enemy = new Enemy(this, 600, 700);

        this.physics.world.bounds.x = 0;
        this.physics.world.bounds.y = 0;
        this.physics.world.bounds.width = 3584;
        this.physics.world.bounds.height = 1200;

        //Animation
        animacio(this);
        //Camera
        loadCamara(this);
        this.cursors = this.input.keyboard.createCursorKeys();

        //Colisions
        terra.setCollisionByProperty({collision: true});
        this.physics.add.collider(this.player, terra);
        this.physics.add.collider(this.enemy, terra);
        if(this.dificil) this.physics.add.collider(this.player, this.spikes, playerHit, null, this);
        this.physics.add.overlap(this.player, this.diamants, collectDiamants, null, this).name='collider';
        this.physics.add.collider(this.player, this.porta, porta, null, this);
        this.physics.add.collider(this.player, this.enemy, kill, null, this);


        //Score and Counter
        this.score.create();
        this.liveCounter.create();

    }

    update()
    {





        this.enemy.update(0,10);
        this.player.update(this.pad1);
        if(this.player.y>900) this.player.playerDrop(this);

    }
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

function collectDiamants (player, diamant)
{
    this.collect.play();
    this.physics.world.colliders.getActive().find(function(i){
        return i.name == 'collider'
    }).destroy();

    this.tweens.add({
        targets: diamant,
        y: diamant.y - 100,
        alpha: 0,
        duration: 800,
        ease: "Cubic.easeOut",
        callbackScope: this,
        onComplete: function() {
            this.score.incrementScore();
            diamant.destroy();
            this.physics.add.overlap(this.player, this.diamants, collectDiamants, null, this).name='collider';
        }
    })


}

function porta ()
{
    this.music.destroy();
    this.scene.start('Scene2',{
        vides: this.liveCounter.getLives(),
        score: this.score.getScore(),
        soundSetting: this.soundSetting,
        dificil: this.dificil
    })
}