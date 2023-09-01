import * as THREE from "three";
import Experience from "../Experience.js";

import Room from "./Room.js"
import Controls from "./Controls.js"
import Environment from "./Environment.js"
import Floor from "./Floor.js";

import GSAP from "gsap";


export default class World {
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.sizes = this.experience.sizes;
        this.scene = this.experience.scene;
        this.canvas = this.experience.canvas;
        this.camera = this.experience.camera;
        this.resources = this.experience.resources;
        this.theme = this.experience.theme;

        this.resources.on("ready", ()=> {
            this.environment = new Environment();
            this.room = new Room();
            this.floor = new Floor();
            this.controls = new Controls();

            // setting current position
            this.currentPosX = this.room.actualRoom.position.x;
            this.currentPosY = this.room.actualRoom.position.y;
            this.currentPosZ = this.room.actualRoom.position.z;
        });

        this.theme.on("switch", (theme) => {
            this.switchTheme(theme);
        });
    }

    switchTheme(theme) {
        if (this.environment) { 
            this.environment.switchTheme(theme);
        }
        if (this.theme.theme === "light") {
            GSAP.to(this.room.lampLight1, {
                intensity: 0,
            })
            GSAP.to(this.room.lampLight2, {
                intensity: 0,
            })
            // setting emission
            this.room.actualRoom.children.forEach((child) => {
                if (child.name === "lamp1") {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xdce4e1,
                        emissive: 0x000000,
                        emissiveIntensity: 0.5,
                    });    
                }
                if (child.name === "lamp2_3") {
                    child.material = new THREE.MeshStandardMaterial({
                        color: 0xdce4e1,
                        emissive: 0x000000,
                        emissiveIntensity: 0.5,
                    });   
                      
                }
            });
        }
        else {
            GSAP.to(this.room.lampLight1, {
                intensity: 0.5,
            })
            GSAP.to(this.room.lampLight2, {
                intensity: 0.4,
            })
            // setting emission
            this.room.actualRoom.children.forEach((child) => {
                if (child.name === "lamp1") {
                    child.material = new THREE.MeshStandardMaterial({
                        emissive: 0xffffff,
                        emissiveIntensity: 1,
                    });    
                }
                if (child.name === "lamp2_3") {
                    child.material = new THREE.MeshStandardMaterial({
                        emissive: 0xffffff,
                        emissiveIntensity: 1,
                    });    
                }
            });
        }
    }
    
    resize() {}

    update() {
       if (this.room) {
        this.room.update();
       }
       if (this.controls) {
        this.controls.update();
       }
    }
}