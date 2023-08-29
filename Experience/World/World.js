import * as THREE from "three";
import Experience from "../Experience.js";

import Room from "./Room.js"
import Controls from "./Controls.js"
import Environment from "./Environment.js"
import Floor from "./Floor.js";


export default class World {
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;

        this.resources.on("ready", ()=> {
            this.environment = new Environment();
            this.room = new Room();
            
            // setting current position
            this.currentPosX = this.room.actualRoom.position.x;

            this.floor = new Floor();
            this.controls = new Controls();
        });
    }


    resize() {
        
    }

    update() {
       if (this.room) {
        this.room.update();

        // updating spotlight
        this.targetPosX = this.room.actualRoom.position.x;
        this.deltaX = this.targetPosX - this.currentPosX;
        this.currentPosX = this.targetPosX;

        // window light
        this.environment.windowLight.position.x = this.environment.windowLight.position.x + this.deltaX;
        // target 
        this.environment.target.position.x = this.environment.target.position.x + this.deltaX;

       }
       if (this.controls) {
        this.controls.update();
       }
    }
}