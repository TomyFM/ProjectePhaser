export class Player extends Phaser.Physics.Arcade.Sprite {

    constructor(scene, x, y) {
        super(scene, x, y, 'player');
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setBounce(0.1);
        this.setCollideWorldBounds(true);
        this.setSize(64,0,5,0);
        this.scene = scene;
    }

    update(){


        if ( this.scene.cursors.left.isDown) {
            this.setVelocityX(-200);
            if (this.body.onFloor()) {
                this.play('walk', true);
            }
        } else if ( this.scene.cursors.right.isDown) {
            this.setVelocityX(200);
            if (this.body.onFloor()) {
                this.play('walk', true);
            }
        } else {

            this.setVelocityX(0);
            if (this.body.onFloor()) {
                this.play('idle', true);
            }
        }

        if ((this.scene.cursors.space.isDown || this.scene.cursors.up.isDown) && this.body.onFloor()) {
            this.setVelocityY(-500);
            this.play('jump', true);
        }

        if (this.body.velocity.x > 0) {
            this.setFlipX(false);
        } else if (this.body.velocity.x < 0) {
            // otherwise, make them face the other side
            this.setFlipX(true);
        }
    }

    playerDrop(scene) {
        this.setVelocity(0, 0);
        this.setX(50);
        this.setY(300);
        this.play('idle', true);
        this.setAlpha(0);
        let tw = scene.tweens.add({
            targets: this,
            alpha: 1,
            duration: 100,
            ease: 'Linear',
            repeat: 5,
        });
        scene.liveCounter.liveLost();
        scene.mort.play();
    }


}