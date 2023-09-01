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
        this.environment = this.experience.world.environment;

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
                }, "same");

                // window light
                this.firstMoveTimeline.to(this.environment.windowLight.position, {
                    x: () => {
                        return (this.environment.windowLight.position.x + (this.sizes.width * 0.0012));
                    }
                }, "same");

                // target
                this.firstMoveTimeline.to(this.environment.target.position, {
                    x: () => {
                        return (this.environment.target.position.x + (this.sizes.width * 0.0012));
                    }
                }, "same");


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
                this.secondMoveTimeline.to(this.environment.windowLight.position, {
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
                this.secondMoveTimeline.to(this.experience.world.room.lampLight1, {
                    distance: 4,
                }, "same");

                // Third section
                this.thirdMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".third-move",
                        start: "top top",
                        end: "bottom bottom",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
                
                // move room
                this.thirdMoveTimeline.to(this.room.position, {
                    x: () => {
                        return 1.2;
                    },
                    z: () => {
                        return this.sizes.height * 0.004;
                    },
                    duration: 0.8,
                    delay: 0.2,
                }, "same");
                this.thirdMoveTimeline.to(this.room.scale, {
                    x: 0.27,
                    y: 0.27,
                    z: 0.27,
                }, "same");

                // changing light
                this.thirdMoveTimeline.to(this.environment.windowLight.position, {
                    x: () => {
                        return 5.562926;
                    },
                    y: () => {
                        return 3.759329;
                    },
                    z: () => {
                        return 0.333356;
                    },
                    duration: 0.9,
                }, "same");

                this.thirdMoveTimeline.to(this.environment.windowLight, {
                    distance: 9,
                    decay: 1.2,
                    duration: 0.9,
                }, "same");

                this.thirdMoveTimeline.to(this.environment.windowLight.shadow, {
                    normalBias: 0.1,
                }, "same");

                // target
                this.thirdMoveTimeline.to(this.environment.target.position, {
                    x: () => {
                        return 4.7;
                    },
                    y: () => {
                        return 3.5;
                    },
                    z: () => {
                        return 1;
                    },
                    duration: 0.9,
                }, "same");

                // Fourth Movement
                this.fourthMoveTimeline = new GSAP.timeline({
                    scrollTrigger: {
                        trigger: ".fourth-move",
                        start: "top top",
                        end: "bottom bottom",
                        ease: "power1",
                        scrub: 1,
                        invalidateOnRefresh: true,
                    }
                });
                this.fourthMoveTimeline.to(this.room.position, {
                    x: () => {
                        return this.sizes.width * -0.0015;
                    },
                    y: () => {
                        return 0;
                    },
                    z: () => {
                        return 0;
                    },
                    duration: 1,
                    delay: 0.2,
                }, "same");
                this.fourthMoveTimeline.to(this.room.scale, {
                    x: 0.1,
                    y: 0.1,
                    z: 0.1,
                }, "same");

                // lamp light
                this.fourthMoveTimeline.to(this.experience.world.room.lampLight2, {
                    distance: 1,
                }, "same");
                this.fourthMoveTimeline.to(this.experience.world.room.lampLight1, {
                    distance: 1,
                }, "same");

                // window light
                this.fourthMoveTimeline.to(this.environment.windowLight.position, {
                    x: () => {
                        return ( 1.3 + (this.sizes.width * -0.0015));
                    },
                    y: () => {
                        return 1;
                    },
                    z: () => {
                        return -0.7;
                    },
                }, "same");

                // target
                this.fourthMoveTimeline.to(this.environment.target.position, {
                    x: () => {
                        return ( 0.5 + (this.sizes.width * -0.0015));
                    },
                    y: () => {
                        return 0;
                    },
                    z: () => {
                        return 0;
                    },
                    duration: 0.9,
                    delay: 0.2,
                }, "same");
                this.fourthMoveTimeline.to(this.environment.windowLight, {
                    distance: 2.7,
                    decay: 2,
                    duration: 0.9,
                    delay: 0.2,
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