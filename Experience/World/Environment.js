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
        this.sunLight = new THREE.DirectionalLight("#ffffff", 0.9);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        // resolution
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.01;
        // x y z 
        this.sunLight.position.set(1,6,4);
        this.scene.add(this.sunLight);

        // light helper
        // this.lightHelper = new THREE.DirectionalLightHelper(this.sunLight, 3);
        // this.scene.add(this.lightHelper);

        // ambient light
        this.ambientLight = new THREE.AmbientLight("#E9DBD5", 0.9);
        this.scene.add(this.ambientLight);

        // window light

        this.intensity = 10;
        this.distance = 2.7;
        this.angle = Math.PI / 7;
        this.penumbra = 0.9;
        this.decay = 1.5;
        
        this.windowLight = new THREE.SpotLight( 0xfacebe, this.intensity, this.distance, this.angle, this.penumbra, this.decay );
        this.windowLight.position.set( 1.3, 1.3, -0.7 );

        // window light target
        this.target = new THREE.Object3D();
        this.target.position.set(0.5,0,0);
        this.scene.add(this.target);


        this.windowLight.target = this.target;

        this.windowLight.target

        this.windowLight.castShadow = true;

        this.windowLight.shadow.mapSize.set(2048,2048);
        // shadow acne problem
        this.windowLight.shadow.normalBias = 0.001;

        this.scene.add( this.windowLight );
        this.scene.add( this.windowLight.target );



        //window light helper
        // this.windowLightHelper = new THREE.SpotLightHelper( this.windowLight );
        // this.scene.add(this.windowLightHelper);

    }

    resize() {
        
    }

    update() {
       
    }
}