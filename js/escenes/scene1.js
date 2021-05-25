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

    init()
    {
        this.liveCounter=new LiveCounter(this, 4);
        this.score = new Score(this,0);

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
        this.music.play(musicConfig);

        //Add Images
        const backgroundImage = this.add.image(0, 0,'background').setOrigin(0, 0);
        backgroundImage.setScale(3.5, 1);
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('platform', 'tiles');
        const terra =  map.createStaticLayer('terra', tileset,0, 0);
        const aigua =  map.createStaticLayer('aigua', tileset,0, 0);

        //Add Objects
        this.porta = new Object(this, map,'porta','porta').getObjects();
        this.spikes = new Object(this, map,'spikes','spike').getObjects();
        this.diamants = new Object(this, map,'diamants','diamant').getObjects();
        this.player = new Player(this,100,100);
        this.enemy = new Enemy(this, 600, 700);

        //Animation
        animacio(this);
        //Camera
        loadCamara(this);
        this.cursors = this.input.keyboard.createCursorKeys();

        //Colisions
        terra.setCollisionByProperty({collision: true});
        this.physics.add.collider(this.player, terra);
        this.physics.add.collider(this.enemy, terra);
        this.physics.add.collider(this.player, this.spikes, playerHit, null, this);
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
        this.player.update();
        if(this.player.y>900) this.player.playerDrop(this);

    }
}
function kill(player, enemy){
    if(player.body.touching.down) {
        enemy.destroy();
        this.golemDeath.play();
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
        score: this.score.getScore()
    })
}