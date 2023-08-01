import * as THREE from "three";
import { PerspectiveCamera } from "three";
import Experience from "./Experience.js";
import {OrbitControls} from "three/examples/jsm/controls/OrbitControls.js"

export default class Camera{
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        
        // calling create function for perspective camera and orthographic camera
        this.createPerspectiveCam();
        this.createOrthoCam();
        this.setOrbitControls();
    }

    // createPerspectiveCam() : creates new perspective camera
    createPerspectiveCam() {
        this.perspectiveCam = new THREE.PerspectiveCamera(35, this.sizes.aspect,0.1,1000);
        this.scene.add(this.perspectiveCam)
    }

    // createPerspectiveCam() : creates new ortho camera
    createOrthoCam() {
        this.frustrum = 5;
        this.orthoCam = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum)/2,
            (this.sizes.aspect * this.sizes.frustrum)/2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -100,
            100
        );
        this.scene.add(this.perspectiveCam);
        this.perspectiveCam.position.z = 5;
    }

    setOrbitControls() {
        this.controls = new OrbitControls(this.perspectiveCam, this.canvas);
        this.controls.enableDamping = true;
        this.controls.enableZoom = true;
    }

    // resize() : resizes camera
    resize(){
        // Updating perspective camera
        this.perspectiveCam.aspect = this.sizes.aspect;
        this.perspectiveCam.updateProjectionMatrix();
        // updating ortho camera 
        this.orthoCam.left = (-this.sizes.aspect * this.sizes.frustrum)/2 ;
        this.orthoCam.right = (this.sizes.aspect * this.sizes.frustrum)/2 ;
        this.orthoCam.top = this.sizes.frustrum / 2 ;
        this.orthoCam.bottom = -this.sizes.frustrum / 2 ;
        this.orthoCam.updateProjectionMatrix();
    }

    update() {
        this.controls.update();
    }
}