import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap"

export default class Room {
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.scene = this.experience.scene; 
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;

        // smoothing the motion of the curve
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };
        
        this.setModel();
        this.onMouseMove();
    }

    setModel() {
        // giving object lighting
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true; 

            // setting light for grouped children
            if (child instanceof THREE.Group ) {
                child.children.forEach((groupchild)=> {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                }); 
            }

            if (child.name === "Screen") {
                child.material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }
        });
        
        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.09,0.09,0.09);
        //this.actualRoom.rotation.y = -Math.PI/2;
    }

    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            // calculating mouse location
            this.rotation = ((e.clientX - window.innerWidth/2) * 2) / window.innerWidth;
            this.lerp.target = this.rotation;
        });
    }

    resize() {
        
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current, 
            this.lerp.target,
            this.lerp.ease
        );

        //this.actualRoom.rotation.y = this.lerp.current;
    }
}