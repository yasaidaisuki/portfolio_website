import * as THREE from "three";
import Experience from "../Experience.js";

export default class Environment {
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.scene = this.experience.scene; 
        this.resources = this.experience.resources;
        
        this.setLight();
    }

    setLight() {

        // sun light aka. directional light
        this.sunLight = new THREE.DirectionalLight("#ffffff", 0.45);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        // resolution
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.01;
        // x y z 
        this.sunLight.position.set(-9,7,3);
        this.scene.add(this.sunLight);

        // light helper
        this.lightHelper = new THREE.DirectionalLightHelper(this.sunLight, 3);
        this.scene.add(this.lightHelper);

        // ambient light
        this.ambientLight = new THREE.AmbientLight("#E9DBD5", 0.7);
        this.scene.add(this.ambientLight);

        // window light

        this.intensity = 5;
        this.distance = 3.0;
        this.angle = Math.PI / 7;
        this.penumbra = 0.9;
        this.decay = 1.0;
        
        this.windowLight = new THREE.SpotLight( 0xF6DAD0, this.intensity, this.distance, this.angle, this.penumbra, this.decay );
        this.windowLight.position.set( 1, 1.2, 0.9 );

        this.windowLight.castShadow = true;

        this.windowLight.shadow.mapSize.set(2048,2048);
        this.windowLight.shadow.bias = 0.00001;

        this.scene.add( this.windowLight );
  

        // window light helper
        this.windowLightHelper = new THREE.SpotLightHelper( this.windowLight );
        this.scene.add(this.windowLightHelper);

    }

    resize() {
        
    }

    update() {
       
    }
}