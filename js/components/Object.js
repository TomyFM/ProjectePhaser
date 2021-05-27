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

