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

        // sun light aka. directional light
        this.sunLight = new THREE.DirectionalLight("#ffffff", 0.7);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        // resolution
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.05;
        // x y z 
        this.sunLight.position.set(-9,7,3);
        this.scene.add(this.sunLight);

        // light helper
        this.lightHelper = new THREE.DirectionalLightHelper(this.sunLight, 3);
        this.scene.add(this.lightHelper);

        // ambient light
        this.ambientLight = new THREE.AmbientLight("#ffffff", 0.7);
        this.scene.add(this.ambientLight);
    }

    resize() {
        
    }

    update() {
       
    }
}