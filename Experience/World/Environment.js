import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";

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
        this.sunLight = new THREE.DirectionalLight("#ffffff", 0.7);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        // resolution
        this.sunLight.shadow.mapSize.set(2048,2048);
        this.sunLight.shadow.normalBias = 0.01;
        // x y z 
        this.sunLight.position.set(2,6,4);
        this.scene.add(this.sunLight);

        // light helper
        // this.lightHelper = new THREE.DirectionalLightHelper(this.sunLight, 3);
        // this.scene.add(this.lightHelper);

        // ambient light
        this.ambientLight = new THREE.AmbientLight("#ffffff", 0.9);
        this.scene.add(this.ambientLight);

        // window light

        this.intensity = 7;
        this.distance = 2.7;
        this.angle = Math.PI / 5;
        this.penumbra = 0.9;
        this.decay = 1.8;
        
        this.windowLight = new THREE.SpotLight( 0xf5d3ad, this.intensity, this.distance, this.angle, this.penumbra, this.decay );
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

    switchTheme(theme) { 
        if(theme === "dark") {
            // sunlight
            GSAP.to(this.sunLight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            // ambient light
            GSAP.to(this.ambientLight.color, {
                r: 0.17254901960784313,
                g: 0.23137254901960785,
                b: 0.6862745098039216,
            });
            // window light
            GSAP.to(this.windowLight.color, {
                r: 193 / 255,
                g: 186 / 255,
                b: 232 / 255,
            });
            GSAP.to(this.sunLight, {
                intensity: 0.78,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.78,
            });
            GSAP.to(this.windowLight, {
                intensity: 3,
            });
        } else {
            // sunlight
            GSAP.to(this.sunLight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            // ambient light
            GSAP.to(this.ambientLight.color, {
                r: 1,
                g: 1,
                b: 1,
            });
            // window light
            GSAP.to(this.windowLight.color, {
                r: 245 / 255,
                g: 211 / 255,
                b: 173 / 255,
            });
            GSAP.to(this.sunLight, {
                intensity: 0.7,
            });
            GSAP.to(this.ambientLight, {
                intensity: 0.9,
            });
            GSAP.to(this.windowLight, {
                intensity: 7,
            });
        }
    }

    resize() {
        
    }

    update() {
       
    }
}