function animacio(Game){
    Game.anims.create({
        key: 'walk',
        frames: Game.anims.generateFrameNames('player', {
            prefix: 'robo_player_',
            start: 2,
            end: 3,
        }),
        frameRate: 10,
        repeat: -1
    });

    Game.anims.create({
        key: 'idle',
        frames: [{ key: 'player', frame: 'robo_player_0' }],
        frameRate: 10,
    });

    Game.anims.create({
        key: 'jump',
        frames: [{ key: 'player', frame: 'robo_player_1' }],
        frameRate: 10,
    });

    Game.anims.create({
        key: 'walkGolem',
        frames: Game.anims.generateFrameNames('enemy', {
            prefix: 'golem_01_walking_',
            start: 1,
            end: 17,
        }),
        frameRate: 20,
        repeat: -1
    });
}

function loadCamara(Game){
    const camera = Game.cameras.main;
    camera.setBounds(0, 0, 3584, 896);
    Game.cameras.main.startFollow(Game.player, true, 0.09, 0.09);
}

function preloadGeneric(Game)
{
    Game.load.audio('mort','assets/sounds/mort.ogg');
    Game.load.image('cor','assets/images/cor.png');
    Game.load.image('porta', 'assets/images/porta.png');
    Game.load.image('spike', 'assets/images/spike.png');
    Game.load.image('diamant', 'assets/images/diamant.png');
    Game.load.image('tiles', 'assets/tilesets/platformPack_tilesheet.png');
    Game.load.tilemapTiledJSON('map', 'assets/tilemaps/mapa_level1.json');
    Game.load.image('background', 'assets/images/background.png');
    Game.load.atlas('player', 'assets/images/kenney_player.png','assets/images/kenney_player_atlas.json')
    Game.load.atlas('enemy', 'assets/images/golem.png','assets/images/golem.json')
}

function createGeneric(Game)
{

}

function playerHit(player, spike) {
    player.setVelocity(0, 0);
    player.setX(50);
    player.setY(300);
    player.play('idle', true);
    player.setAlpha(0);
    let tw = this.tweens.add({
        targets: player,
        alpha: 1,
        duration: 100,
        ease: 'Linear',
        repeat: 5,
    });
    this.liveCounter.liveLost();
    this.mort.play();
}



export  {animacio,loadCamara,playerHit}
