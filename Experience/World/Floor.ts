import * as THREE from "three";

export default class Floor {
    readonly plane: THREE.Mesh;
    // colored discs that grow under the room as each section scrolls in
    readonly circleFirst: THREE.Mesh;
    readonly circleSecond: THREE.Mesh;
    readonly circleThird: THREE.Mesh;
    readonly circleFourth: THREE.Mesh;

    constructor(scene: THREE.Scene) {
        this.plane = new THREE.Mesh(
            new THREE.PlaneGeometry(100, 100),
            new THREE.MeshStandardMaterial({ color: 0xf7f0e1 })
        );
        this.plane.rotation.x = -Math.PI / 2;
        this.plane.position.y = -0.31;
        this.plane.receiveShadow = true;
        scene.add(this.plane);

        const circleGeometry = new THREE.CircleGeometry(5, 64);
        const createCircle = (color: number, y: number) => {
            const circle = new THREE.Mesh(circleGeometry, new THREE.MeshStandardMaterial({ color }));
            circle.position.y = y;
            circle.scale.set(0, 0, 0);
            circle.rotation.x = -Math.PI / 2;
            circle.receiveShadow = true;
            scene.add(circle);
            return circle;
        };

        this.circleFirst = createCircle(0xe5a1aa, -0.3);
        this.circleSecond = createCircle(0x7ad0ac, -0.29);
        this.circleSecond.position.x = 2;
        this.circleThird = createCircle(0x8395cd, -0.28);
        this.circleFourth = createCircle(0xf7f0e1, -0.27);
    }
}
