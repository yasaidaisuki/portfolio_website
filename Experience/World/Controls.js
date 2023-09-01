import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger.js";

export default class Controls {
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.scene = this.experience.scene; 
        this.sizes = this.experience.sizes; 
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        GSAP.registerPlugin(ScrollTrigger);

        this.setScrollTrigger();
    }

    setScrollTrigger(){
        ScrollTrigger.matchMedia({
	
            // Desktop
            "(min-width: 960px)": () => {

                // First section
                this.firstMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".first-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
                this.firstMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * 0.0012;
                    }
                });

                // Second section
                this.secondMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".second-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });

                // changing room
                this.secondMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 1;
                    },
                    z: () => {
                        return this.sizes.height * 0.001;
                    },
                    duration: 0.8,
                    delay: 0.2,
                }, "same");
            
                this.secondMoveTimeline.to(this.room.scale, {
                    x: 0.4,
                    y: 0.4,
                    z: 0.4,
                }, "same");
                
                // changing light
                this.secondMoveTimeline.to(this.experience.world.environment.windowLight.position, {
                    x: () => {
                        return (this.experience.world.environment.windowLight.position.x * 3);
                    },
                    y: () => {
                        return (this.experience.world.environment.windowLight.position.y * 3);
                    },
                    duration: 0.9,
                }, "same");
                
                // lamp light
                this.secondMoveTimeline.to(this.experience.world.room.lampLight2, {
                    distance: 4,
                }, "same");

            },
            

            // Mobile
            "(max-width: 968px)": function() {
            },
           
            "all": function() {
              
            },
              
          }); 
    }

    resize() {
    }

    update() {

    }
}