import * as THREE from "three";
import { gsap } from "gsap";
import type { ThemeName } from "../Theme";

// resting positions; Controls' scroll timelines move the window light relative to these
export const WINDOW_LIGHT_POSITION = new THREE.Vector3(1.3, 1.3, -0.7);
export const WINDOW_TARGET_POSITION = new THREE.Vector3(0.5, 0, 0);

// physically based units (three r155+): the old legacy-light values times π for the sun and
// ambient light; the window light was re-tuned by eye since its falloff curve changed too
export const WINDOW_LIGHT_INTENSITY = 9;
export const WINDOW_LIGHT_ZOOMED_INTENSITY = 45;

const THEMES = {
    light: {
        color: new THREE.Color(1, 1, 1),
        windowColor: new THREE.Color(0xf5d3ad),
        intensity: 0.7 * Math.PI,
    },
    dark: {
        color: new THREE.Color(0.17254901960784313, 0.23137254901960785, 0.6862745098039216),
        windowColor: new THREE.Color(193 / 255, 186 / 255, 232 / 255),
        intensity: 0.78 * Math.PI,
    },
} satisfies Record<ThemeName, unknown>;

const tweenColor = (color: THREE.Color, to: THREE.Color) => gsap.to(color, { r: to.r, g: to.g, b: to.b });

export default class Environment {
    readonly sunLight: THREE.DirectionalLight;
    readonly ambientLight: THREE.AmbientLight;
    readonly windowLight: THREE.SpotLight;
    readonly target: THREE.Object3D;

    constructor(scene: THREE.Scene) {
        // sun light aka. directional light
        this.sunLight = new THREE.DirectionalLight(THEMES.light.color, THEMES.light.intensity);
        this.sunLight.castShadow = true;
        this.sunLight.shadow.camera.far = 20;
        // resolution
        this.sunLight.shadow.mapSize.set(2048, 2048);
        this.sunLight.shadow.normalBias = 0.01;
        this.sunLight.position.set(2, 6, 4);
        scene.add(this.sunLight);

        // ambient light
        this.ambientLight = new THREE.AmbientLight(THEMES.light.color, THEMES.light.intensity);
        scene.add(this.ambientLight);

        // window light, off until the intro fades it in
        this.windowLight = new THREE.SpotLight(THEMES.light.windowColor, 0, 2.7, Math.PI / 5, 0.9, 2);
        this.windowLight.position.copy(WINDOW_LIGHT_POSITION);

        this.target = new THREE.Object3D();
        this.target.position.copy(WINDOW_TARGET_POSITION);
        scene.add(this.target);
        this.windowLight.target = this.target;

        this.windowLight.castShadow = true;
        this.windowLight.shadow.mapSize.set(2048, 2048);
        // shadow acne problem
        this.windowLight.shadow.normalBias = 0.001;
        // no need to re-render its shadow map every frame while the light is off; the intro turns this back on.
        // it still has to render once, since shaders that sample a shadow map fail until it exists
        this.windowLight.shadow.autoUpdate = false;
        this.windowLight.shadow.needsUpdate = true;
        scene.add(this.windowLight);
    }

    switchTheme(theme: ThemeName) {
        const { color, windowColor, intensity } = THEMES[theme];
        tweenColor(this.sunLight.color, color);
        tweenColor(this.ambientLight.color, color);
        tweenColor(this.windowLight.color, windowColor);
        gsap.to(this.sunLight, { intensity });
        gsap.to(this.ambientLight, { intensity });
    }
}
