import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";

export default class Preloader extends EventEmitter {
    constructor() {
        super();
        this.experience = new Experience();
        this.scene = this.experience.scene; 
        this.sizes = this.experience.sizes; 
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.world = this.experience.world;
        this.device = this.sizes.device;

        this.sizes.on("switchdevice", (device) => {
            this.device = device;
        });

        this.world.on("worldready", ()=> {
            this.setAssets();
            this.playIntro();
        });
    }

    setAssets() {
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
        console.log(this.roomChildren);
    }

    firstIntro() {
        return new Promise ((resolve)=> {
            this.timeline = new GSAP.timeline();

            if (this.device === "desktop") {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -1,
                    ease: "power1.out",
                    duration: "0.7",
                    onComplete: resolve,
                });
            }
            else { 
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                }).to(this.room.position, {
                    z: -1,
                    ease: "power1.out",
                    duration: "0.7",
                    onComplete: resolve,
                });
            }
        });
    }

    secondIntro() {

        return new Promise ((resolve)=> {
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline.to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            }, "same")
            .to(this.roomChildren.cube.rotation, {
                y: 2*Math.PI,
            }, "same")
            .to(this.roomChildren.cube.scale, {
                x: 11.,
                y: 11.23,
                z: 11.22,
                ease: "power1.out"
            }, "same")
            .to(this.roomChildren.cube.position, {
                x: 2.6,
                y: 11.2,
                z: 4.6,
                ease: "back.out"
            }, "same")
            .to(this.roomChildren.wall.scale, {
                x: 10.665681838989258,
                y: 9.59201431274414,
                z: 10.405462265014648,
            })
            .set(this.roomChildren.fake__wall.scale, {
                x: 1,
                y: 1,
                z: 1,
            })
            .to(this.roomChildren.cube.scale, {
                x: 0,
                y: 0,
                z: 0,
            }) 
            .to(this.roomChildren.desk.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out",
                duration: 0.4,
            }) 
            .to(this.roomChildren.cabinet.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out",
                duration: 0.4,
            }, "<+=0.15") 
            .to(this.roomChildren.bed.scale, {
                x: 3.561274290084839,
                y:0.7499647736549377,
                z: 6.197537422180176,
                ease: "back.out",
                duration: 0.5,
            },"<+=0.15") 
            .to(this.roomChildren.box2.scale, {
                x: 1.37487,
                y: 1.10916,
                z: 1.3452,
                ease: "back.out",
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.box1.scale, {
                x: 1.35882,
                y: 0.993757,
                z: 1.35882,
                ease: "back.out",
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.book1.scale, {
                x: -0.6578431725502014,
                y: -0.14172077178955078,
                z: -1.0060994625091553,
                duration: 0.4,
            },"<+=0.15")
            .to(this.roomChildren.lamp1_1.scale, {
                x: 0.03988884389400482,
                y: 0.033630888909101486,
                z: 0.03988884389400482,
                duration: 0.25,
            },"<+=0.15")
            .to(this.roomChildren.lamp1_2.scale, {
                x: 0.12042233347892761,
                y: 3.18845534324646,
                z: 0.12042233347892761,
                duration: 0.3,
            },"<+=0.1")   
            .to(this.roomChildren.lamp1_3.scale, {
                x: -0.3988676369190216,
                y: -0.06796187162399292,
                z: -0.3988676369190216,
                duration: 0.3,
            },"<")     
            .to(this.roomChildren.lamp1.scale, {
                x: 1.3149751424789429,
                y: 1.1768885850906372,
                z: 1.3149751424789429,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.carpet.scale, {
                x: -5.241390228271484,
                y: -0.05543050169944763,
                z: -5.241390228271484,
                duration: 0.4,
                ease: "back.out",
            },"<+=0.15") 
            .to(this.roomChildren.computer.scale, {
                x: 2.9291858673095703,
                y: 2.912670850753784,
                z: 1.6106812953948975,
                duration: 0.3,
                ease: "back.out(1)",
            },"<+=0.15") 
            .to(this.roomChildren.keyboard.scale, {
                x: 0.6535781621932983,
                y: 0.000831558951176703,
                z: 0.08707960695028305,
                duration: 0.3,
            },"<+=0.15") 
            .to(this.roomChildren.mouse.scale, {
                x: 0.05541212111711502,
                y: 0.01908853091299534,
                z: 0.05759280174970627,
                duration: 0.3,
            },"<+=0.15") 
            .to(this.roomChildren.holder.scale, {
                x: 0.39381736516952515,
                y: 0.39381736516952515,
                z: 0.39381736516952515,
                duration: 0.3,
            },"<+=0.15") 
            .to(this.roomChildren.textbook.scale, {
                x: -0.8277817368507385,
                y: -0.10515011101961136,
                z: -1.200506329536438,
                duration: 0.3,
            },"<+=0.15") 
            .to(this.roomChildren.cup.scale, {
                x: 0.3141181766986847,
                y: 0.32643285393714905,
                z: 0.3141181766986847,
                duration: 0.4,
            },"<+=0.15")
            .to(this.roomChildren.shelf1.scale, {
                x: 4.159143447875977,
                y: 0.11133898049592972,
                z: 1.1721199750900269,
                duration: 0.4,
            },"<+=0.15")
            .to(this.roomChildren.shelf1.position, {
                x: -7.833316326141357,
                z: 2.8565711975097656,
                duration: 0.4,
            },"<+=0.15")
            .to(this.roomChildren.shelf2.scale, {
                x: 4.159143447875977,
                y: 0.11133898049592972,
                z: 1.1721199750900269,
                duration: 0.4,
            },"<+=0.15")
            .to(this.roomChildren.shelf2.position, {
                x: -7.833316326141357,
                z: 2.8565711975097656,
                duration: 0.4,
            },"<+=0.15")
            .to(this.roomChildren.shelf2.position, {
                x: -7.833316326141357,
                z: 2.8565711975097656,
                duration: 0.4,
            },"<+=0.15")
            .to(this.roomChildren.lamp2_1.scale, {
                x: -0.5410515069961548,
                y: -0.06891237199306488,
                z: -0.5410515069961548,
                duration: 0.3,
            },"<+=0.1")   
            .to(this.roomChildren.lamp2_2.scale, {
                x: 0.06561155617237091,
                y: 1.0194369554519653,
                z: 0.06561155617237091,
                duration: 0.3,
            },"<")     
            .to(this.roomChildren.lamp2_3.scale, {
                x: 0.7307718992233276,
                y: 0.6845114827156067,
                z: 0.7307718992233276,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.phone.scale, {
                x: 0.7307718992233276,
                y: 0.6845114827156067,
                z: 0.7307718992233276,
                duration: 0.4,
            },"<") 
            .to(this.roomChildren.poster1.scale, {
                x: 1.910263180732727,
                y: 1.6497119665145874,
                z: 0.10077943652868271,
                duration: 0.4,
                ease: "back.out(1)",
            },"<+=0.15")  
            .to(this.roomChildren.poster2.scale, {
                x: 1.5902454853057861,
                y: 1.8262255191802979,
                z: 0.0912836343050003,
                duration: 0.4,
                ease: "back.out(1)",
            },"<+=0.15")  
            .to(this.roomChildren.poster3.scale, {
                x: 2.1607797145843506,
                y: 3.387428045272827,
                z: 0.1111418753862381,
                duration: 0.4,
                ease: "back.out(1)",
            },"<+=0.15")  
            .to(this.roomChildren.pillow1.scale, {
                x: 2.0298759937286377,
                y: 1.739692211151123,
                z: 1.4317166805267334,
                duration: 0.4,
                ease: "back.out(1)",
            },"<")  
            .to(this.roomChildren.pillow2.scale, {
                x: 1.9276858568191528,
                y: 1.601382851600647,
                z: 1.3483161926269531,
                duration: 0.4,
                ease: "back.out(1)",
            },"<+=0.15")  
            
        });
    }

    onScroll(e) {
        if (e.deltaY > 0 ) {
            window.removeEventListener("wheel", this.scrollOnceEvent);
            this.playSecondIntro();
        }
    }

    async playIntro() {
        await this.firstIntro();
        this.scrollOnceEvent = this.onScroll.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent );
    }

    async playSecondIntro() {
        await this.secondIntro();
    }

    resize() {
        
    }
}