export class  Score{
    constructor(scene, initialScore) {
        this.relatedScene = scene;
        this.score = initialScore;
    }

    create() {
        this.scoreText = this.relatedScene.add.text(16, 16,  'Score: '+this.score, { fontSize: '32px', fill: '#000' }).setScrollFactor(0,0);
    }

    incrementScore() {
        this.score+=10;
        this.scoreText.setText('Score: '+this.score);
        return true;
    }

    getScore(){
        return this.score;
    }


}