import * as THREE from "three";
import type Sizes from "./Utils/Sizes";

export default class Camera {
    readonly orthoCam: THREE.OrthographicCamera;

    constructor(private readonly sizes: Sizes, scene: THREE.Scene) {
        this.orthoCam = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustum) / 2,
            (this.sizes.aspect * this.sizes.frustum) / 2,
            this.sizes.frustum / 2,
            -this.sizes.frustum / 2,
            -50,
            50
        );

        this.orthoCam.position.y = 3.05;
        this.orthoCam.position.z = 5.5;
        this.orthoCam.rotation.x = -Math.PI / 6;

        scene.add(this.orthoCam);
    }

    resize() {
        this.orthoCam.left = (-this.sizes.aspect * this.sizes.frustum) / 2;
        this.orthoCam.right = (this.sizes.aspect * this.sizes.frustum) / 2;
        this.orthoCam.top = this.sizes.frustum / 2;
        this.orthoCam.bottom = -this.sizes.frustum / 2;
        this.orthoCam.updateProjectionMatrix();
    }
}
