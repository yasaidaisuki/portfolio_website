import type * as THREE from "three";
import EventEmitter from "../Utils/EventEmitter";
import type Resources from "../Utils/Resources";
import type Time from "../Utils/Time";
import type Theme from "../Theme";

import Room from "./Room";
import Environment from "./Environment";
import Floor from "./Floor";

export default class World extends EventEmitter<{ worldready: [] }> {
    // created once the model and video have loaded, before "worldready" fires
    environment!: Environment;
    room!: Room;
    floor!: Floor;

    private ready = false;
    // the lamps stay off until the intro has finished
    private lightsEnabled = false;

    constructor(scene: THREE.Scene, resources: Resources, private readonly theme: Theme, time: Time) {
        super();

        resources.on("ready", () => {
            this.environment = new Environment(scene);
            this.room = new Room(scene, resources.items, time);
            this.floor = new Floor(scene);
            this.ready = true;
            // in case the theme was switched while loading
            if (this.theme.theme === "dark") {
                this.switchTheme();
            }
            this.emit("worldready");
        });

        this.theme.on("switch", () => {
            this.switchTheme();
        });
    }

    enableLights() {
        this.lightsEnabled = true;
        this.setLamps();
    }

    private switchTheme() {
        if (!this.ready) return;
        this.environment.switchTheme(this.theme.theme);
        this.setLamps();
    }

    private setLamps() {
        this.room.setLamps(this.theme.theme === "dark" && this.lightsEnabled);
    }

    update() {
        if (this.ready) {
            this.room.update();
        }
    }
}
