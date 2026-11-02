import * as THREE from "three";
import { GLTFLoader, type GLTF } from "three/addons/loaders/GLTFLoader.js";
import { DRACOLoader } from "three/addons/loaders/DRACOLoader.js";
import EventEmitter from "./EventEmitter";
import type { Asset } from "./assets";

export type Items = {
    room: GLTF;
    screen: THREE.VideoTexture;
};

export default class Resources extends EventEmitter<{ ready: [] }> {
    // filled in as assets load; complete once "ready" fires
    readonly items = {} as Items;
    private readonly queue: number;
    private loaded = 0;
    private readonly gltfLoader = new GLTFLoader();

    constructor(assets: Asset[]) {
        super();
        this.queue = assets.length;

        // DRACOLoader finds its decoder files itself (bundled from three/examples/jsm/libs/draco);
        // preloading fetches them alongside the model instead of after it
        this.gltfLoader.setDRACOLoader(new DRACOLoader().preload());

        this.startLoading(assets);
    }

    private startLoading(assets: Asset[]) {
        for (const asset of assets) {
            if (asset.type === "glbModel") {
                this.gltfLoader.load(asset.path, (file) => {
                    this.items[asset.name] = file;
                    this.singleAssetLoaded();
                });
            } else if (asset.type === "videoTexture") {
                const video = document.createElement("video");
                video.muted = true;
                video.playsInline = true;
                video.loop = true;
                // the screen can stay blank while the intro plays, so the video waits for the model
                // instead of competing with it for bandwidth
                this.on("ready", () => {
                    video.src = asset.path;
                    // autoplay can be blocked (e.g. low-power mode); the screen then just shows the first frame
                    video.play().catch(() => {});
                });

                const texture = new THREE.VideoTexture(video);
                // default is set to true
                texture.flipY = false;
                texture.minFilter = THREE.NearestFilter;
                texture.magFilter = THREE.NearestFilter;
                texture.generateMipmaps = false;
                texture.colorSpace = THREE.SRGBColorSpace;

                this.items[asset.name] = texture;
                this.singleAssetLoaded();
            }
        }
    }

    private singleAssetLoaded() {
        this.loaded++;
        if (this.loaded === this.queue) {
            this.emit("ready");
        }
    }
}
