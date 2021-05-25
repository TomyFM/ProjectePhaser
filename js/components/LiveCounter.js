export class  LiveCounter{
    constructor(scene, initialLives) {
        this.relatedScene = scene;
        this.initialLives = initialLives;
        this.videsDisponibles =  initialLives-1;
    }



    create() {
        //const test = this.relatedScene.add.image(20, 20,'cor').setOrigin(0, 0);
        let displacement = 60;
        let firstPosition = 700;

        //this.vides = this.relatedScene.add.group();
         // this.vidatest = this.relatedScene.add.sprite(400, 40,'cor').setScrollFactor(0,0)
        console.log(this.initialLives)

        this.vida = {}
        for ( var i=0;i< this.initialLives-1; i++){
            console.log('creant vides');
            this.vida[i] = this.relatedScene.add.sprite(firstPosition-(displacement*i), 40,'cor').setScrollFactor(0,0)
        }

    }

    liveLost() {
        if(this.videsDisponibles===0) {
            this.relatedScene.music.destroy();
            this.relatedScene.scene.start('GameOver');
        }
        else{
            console.log(this.videsDisponibles);
            this.vida[this.videsDisponibles-1].setVisible(false);
            this.videsDisponibles=this.videsDisponibles-1;
        }

        return true;
    }

    getLives() {
        return this.videsDisponibles+1;
    }


}