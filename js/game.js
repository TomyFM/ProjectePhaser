export class Game extends Phaser.Scene {

    constructor() {
        super({key: 'game'});
    }

    preload() {
        this.load.atlas('player', 'assets/images/kenney_player.png','assets/images/kenney_player_atlas.json');
        this.load.image('tiles', 'assets/tilesets/MarioLevel1.png');
        this.load.tilemapTiledJSON('map', 'assets/tilemaps/mario_level_1.json');
    }

    create() {
        const map = this.make.tilemap({ key: 'map' });
        const tileset = map.addTilesetImage('mario_level_1', 'tiles');

        const background = map.createStaticLayer('background', tileset,0,0);
        const terra = map.createStaticLayer('terra', tileset,0,0);
        terra.setCollisionByExclusion(-1, true);

        //Afegim el jugador

        this.player = this.physics.add.sprite(0, 0, 'player');
        this.player.setBounce(0.1);
        this.player.setCollideWorldBounds(true);
        this.physics.add.collider(this.player, terra);


        const camera = this.cameras.main;

        // Set up the arrows to control the camera

        camera.setBounds(0, 0, 2624, 240);
        this.add.image(0, 0, 'map').setOrigin(0).setScrollFactor(1);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.ship = this.physics.add.image(400.5, 301.3, 'ship');
        // ship = this.add.image(400.5, 301.3, 'ship');

        this.cameras.main.startFollow(this.player, true, 0.09, 0.09);
        // this.cameras.main.roundPixels = true;

        this.cameras.main.setZoom(3);

        this.cursors = this.input.keyboard.createCursorKeys();

        this.anims.create({
            key: 'walk',
            frames: this.anims.generateFrameNames('player', {
                prefix: 'robo_player_',
                start: 2,
                end: 3,
            }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'idle',
            frames: [{ key: 'player', frame: 'robo_player_0' }],
            frameRate: 10,
        });
        this.anims.create({
            key: 'jump',
            frames: [{ key: 'player', frame: 'robo_player_1' }],
            frameRate: 10,
        });





    }
    update(){
        if (this.cursors.left.isDown) {
            this.player.setVelocityX(-200);
            if (this.player.body.onFloor()) {
                this.player.play('walk', true);
            }
        } else if (this.cursors.right.isDown) {
            this.player.setVelocityX(200);
            if (this.player.body.onFloor()) {
                this.player.play('walk', true);
            }
        } else {
            // If no keys are pressed, the player keeps still
            this.player.setVelocityX(0);
            // Only show the idle animation if the player is footed
            // If this is not included, the player would look idle while jumping
            if (this.player.body.onFloor()) {
                this.player.play('idle', true);
            }
        }

// Player can jump while walking any direction by pressing the space bar
// or the 'UP' arrow
        if ((this.cursors.space.isDown || this.cursors.up.isDown) && this.player.body.onFloor()) {
            this.player.setVelocityY(-350);
            this.player.play('jump', true);
        }
    }

}