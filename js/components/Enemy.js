export class Enemy extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'enemy');

        scene.physics.add.collider(this, scene.collisionLayer);
        scene.add.existing(this);
        scene.physics.add.existing(this);
        this.setScale(0.2, 0.2);
        this.velocidad=100;
        this.direccion=-1;
       // this.setSize(,0,0,0);
        this.scene=scene;
        const a = x - 5;
        this.x = a;
    }

    update(inici, fi){

        if(this.active) {
            this.body.setVelocityX(this.direccion * this.velocidad);
            this.play('walkGolem', true);
            const nextX = Math.floor(this.x / 64) + this.direccion;
            if (nextX < inici) {
                this.direccion *= -1;

            }
            if (nextX > fi) {
                this.direccion *= -1;
            }
            if (this.direccion < 0) {
                this.flipX = true;
            } else {
                this.flipX = false;
            }
        }
    }
}

