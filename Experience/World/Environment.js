import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.scene = this.experience.scene; 
        this.resources = this.experience.resources;
        
        this.setSunlight();
    }

    setSunlight() {

        this.sunLight = new THREE.DirectionalLight("#ffffff", 2);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        this.sunLight.shadow.mapSize.set(1024,1024);
        this.sunLight.shadow.normalBias = 0.05;
        this.sunLight.position.set(-3.5,7,3);
        this.scene.add(this.sunLight);

        // light helper
        this.lightHelper = new THREE.DirectionalLightHelper(this.sunLight, 3);
        this.scene.add(this.lightHelper);
    }

    resize() {
        
    }

    update() {
       
    }
}