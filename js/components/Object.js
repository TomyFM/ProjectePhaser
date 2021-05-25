export class  Object{
    constructor(Scene, map, nameLayer, nameImage) {
        this.objects =  Scene.physics.add.group({
            allowGravity: false,
            immovable: true
        })

        const objectsObjects = map.getObjectLayer(nameLayer)['objects'];
        objectsObjects.forEach(objectObjects => {
            const object = this.objects.create(objectObjects.x, objectObjects.y  - objectObjects.height, nameImage).setOrigin(0, 0);
            object.body.setSize(object.width, object.height - 20).setOffset(0, 20);
        });
    }

    getObjects(){
        return this.objects;
    }
}

//
// this.spikes = this.physics.add.group({
//     allowGravity: false,
//     immovable: true
// })
// const spikeObjects = map.getObjectLayer('spikes')['objects'];
// spikeObjects.forEach(spikeObject => {
//     const spike = this.spikes.create(spikeObject.x, spikeObject.y  - spikeObject.height, 'spike').setOrigin(0, 0);
//     spike.body.setSize(spike.width, spike.height - 20).setOffset(0, 20);
// });