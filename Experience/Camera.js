import * as THREE from "three";
import { PerspectiveCamera } from "three";
import Experience from "./Experience.js";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js"

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
        this.perspectiveCam = new THREE.PerspectiveCamera(35,
             this.sizes.aspect,
             0.1,
             1000);
        this.scene.add(this.perspectiveCam);

        this.perspectiveCam.position.x = -3.5;
        this.perspectiveCam.position.y = 1.7;
        this.perspectiveCam.position.z = 3;
    }

    // createPerspectiveCam() : creates new ortho camera
    createOrthoCam() {

        this.orthoCam = new THREE.OrthographicCamera(
            (-this.sizes.aspect * this.sizes.frustrum) / 2,
            (this.sizes.aspect * this.sizes.frustrum) / 2,
            this.sizes.frustrum / 2,
            -this.sizes.frustrum / 2,
            -10,
            10
        );
        console.log(this.orthoCam);

        this.orthoCam.position.y = 4;
        this.orthoCam.position.z = 5;
        this.orthoCam.rotation.x = -Math.PI/6;

        this.scene.add(this.orthoCam);
        
        // ortho helper
        this.orthoHelper = new THREE.CameraHelper(this.orthoCam); 
        this.scene.add(this.orthoHelper);

        const size = 20;
        const divisions = 20;

        // grid & axes helpers 
        const gridHelper = new THREE.GridHelper(size, divisions);
        this.scene.add(gridHelper);

        const axesHelper = new THREE.AxesHelper(10);
        this.scene.add(axesHelper);
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
        
        this.orthoHelper.matrixWorldNeedsUpdate = true;
        this.orthoHelper.update();
        this.orthoHelper.position.copy(this.orthoCam.position);
        this.orthoHelper.rotation.copy(this.orthoCam.rotation);
    }
}