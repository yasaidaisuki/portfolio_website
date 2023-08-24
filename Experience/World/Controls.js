import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap"

export default class Controls {
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.scene = this.experience.scene; 
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

    }

    resize() {
    }

    update() {
    }
}