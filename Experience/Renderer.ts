import * as THREE from "three";
import type Camera from "./Camera";
import type Sizes from "./Utils/Sizes";

export default class Renderer {
    readonly renderer: THREE.WebGLRenderer;
    // rendering mid-compile would make the browser wait on the unfinished shaders
    private compiling = false;

    constructor(
        canvas: HTMLCanvasElement,
        private readonly sizes: Sizes,
        private readonly scene: THREE.Scene,
        private readonly camera: Camera
    ) {
        this.renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
        });
        this.renderer.outputColorSpace = THREE.SRGBColorSpace;
        this.renderer.toneMapping = THREE.LinearToneMapping;
        // mess with brightness
        this.renderer.toneMappingExposure = 0.95;
        this.renderer.shadowMap.enabled = true;
        this.renderer.setSize(this.sizes.width, this.sizes.height);
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        // reading back shader logs makes every first draw wait for its shader to finish compiling
        this.renderer.debug.checkShaderErrors = import.meta.env.DEV;
    }

    // compiles every material's shader up front, in parallel where the browser supports it,
    // instead of one by one on the first frame
    async compile() {
        this.compiling = true;
        await this.renderer.compileAsync(this.scene, this.camera.orthoCam);
        this.compiling = false;
    }

    resize() {
        this.renderer.setPixelRatio(this.sizes.pixelRatio);
        this.renderer.setSize(this.sizes.width, this.sizes.height);
    }

    update() {
        if (this.compiling) return;
        this.renderer.render(this.scene, this.camera.orthoCam);
    }
}
