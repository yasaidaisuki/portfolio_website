import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap"

export default class Controls {
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.scene = this.experience.scene; 
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        this.position = new THREE.Vector3(1,0.5,0);

    }



    resize() {
        
    }

    update() {
        this.camera.orthoCam.position.copy(this.position);
        this.camera.orthoCam.lookAt(0, 0, 0);
    }
}