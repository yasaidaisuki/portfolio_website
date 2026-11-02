import * as THREE from "three";

import Sizes from "./Utils/Sizes";
import Time from "./Utils/Time";
import Resources from "./Utils/Resources";
import assets from "./Utils/assets";

import Camera from "./Camera";
import Theme from "./Theme";
import Renderer from "./Renderer";
import Preloader from "./Preloader";

import World from "./World/World";
// loaded on demand: scrolling only starts after the intro
import type Controls from "./World/Controls";

// Composition root: builds every part of the experience once and hands each one exactly what it needs
export default class Experience {
    readonly scene = new THREE.Scene();
    readonly time = new Time();
    readonly sizes = new Sizes();
    readonly camera: Camera;
    readonly renderer: Renderer;
    readonly resources: Resources;
    readonly theme: Theme;
    readonly world: World;
    readonly preloader: Preloader;
    controls?: Controls;

    constructor(canvas: HTMLCanvasElement) {
        this.camera = new Camera(this.sizes, this.scene);
        this.renderer = new Renderer(canvas, this.sizes, this.scene, this.camera);
        this.resources = new Resources(assets);
        this.theme = new Theme();
        this.world = new World(this.scene, this.resources, this.theme, this.time);
        this.preloader = new Preloader(this.world, this.sizes, this.camera);

        this.world.on("worldready", async () => {
            await this.renderer.compile();
            this.preloader.start();

            // fetched while the intro plays, so scrolling isn't held up when it ends
            const controlsModule = import("./World/Controls");
            this.preloader.on("enablecontrols", async () => {
                const { default: Controls } = await controlsModule;
                this.controls = new Controls(this.world, this.sizes, this.camera);
            });
        });

        this.time.on("update", () => {
            // updates all components
            this.update();
        });
        this.sizes.on("resize", () => {
            // resizes all components
            this.resize();
        });
    }

    private update() {
        this.world.update();
        this.renderer.update();
    }

    private resize() {
        this.camera.resize();
        this.renderer.resize();
    }
}
