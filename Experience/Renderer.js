import * as THREE from "three";
import { PerspectiveCamera } from "three";
import Experience from "./Experience.js";

export default class Renderer{
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;


        this.setRenderer();
    }

    setRenderer() {
        this.renderer = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true
        });
        this.renderer.useLegacyLights = true;
        // this is the regular setting
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        // this can be changed
        this.renderer.toneMapping = THREE.LinearToneMapping;
        // mess with brightness
        this.renderer.toneMappingExposure = 0.95;
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
    }

    resize() {
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        this.renderer.setSize(this.sizes.width, this.sizes.height);
    }

    update() {
        this.renderer.setViewport(0, 0, this.sizes.width, this.sizes.height);
        this.renderer.render(this.scene, this.camera.perspectiveCam);
       
        // second screen 
        this.renderer.setScissorTest(true);
        this.renderer.setViewport(
            this.sizes.width - this.sizes.width / 3,
            this.sizes.height - this.sizes.height / 3,
            this.sizes.width / 3,
            this.sizes.height / 3 
        );

        this.renderer.setScissor(
            this.sizes.width - this.sizes.width / 3,
            this.sizes.height - this.sizes.height / 3,
            this.sizes.width / 3,
            this.sizes.height / 3 
        );

        this.renderer.render(this.scene, this.camera.orthoCam);

        this.renderer.setScissorTest(false);
    }
}