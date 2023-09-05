import { EventEmitter } from "events";
import Experience from "./Experience";
import GSAP from "gsap";
import convert from "./Utils/covertDivsToSpans.js";

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
        convert(document.querySelector(".intro-text"));
        convert(document.querySelector(".hero-main-title"));
        convert(document.querySelector(".hero-main-description"));
        convert(document.querySelector(".hero-second-subheading"));
        convert(document.querySelector(".second-sub"));
        
        this.room = this.experience.world.room.actualRoom;
        this.roomChildren = this.experience.world.room.roomChildren;
    }

    firstIntro() {
        return new Promise ((resolve)=> {
            this.timeline = new GSAP.timeline();

            this.timeline.to(".preloader", {
                opacity: 0,
                delay: 1,
                onComplete: () => {
                    document.querySelector(".preloader").classList.add(".hidden");
                }
            });

            if (this.device === "desktop") {
                this.timeline.to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: 0.7,
                }).to(this.room.position, {
                    x: -0.8,
                    ease: "power1.out",
                    duration: "0.7",
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
                });
            }
            this.timeline.to(".intro-text .animatedis", {
                yPercent: -100,
                stagger: 0.07,
                ease: "back.out(2)",
                duration: 0.4,
                onComplete: resolve,
            })
            .to(".arrow-svg-wrapper", {
                opacity: 1,
            }, "<")
        });
    }

    secondIntro() {
        return new Promise ((resolve)=> {
            this.secondTimeline = new GSAP.timeline();

            this.secondTimeline.to(".intro-text .animatedis", {
                yPercent: 100,
                stagger: 0.07,
                ease: "back.in(1.3)",
                duration: 0.4,
            })
            .to(".arrow-svg-wrapper", {
                opacity: 0,
            }, "<")
            .to(this.room.position, {
                x: 0,
                y: 0,
                z: 0,
                ease: "power1.out",
            }, "same")
            .to(this.roomChildren.cube.rotation, {
                y: 2*Math.PI,
            }, "same")
            .to(this.roomChildren.cube.scale, {
                x: 11,
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
            .to(this.camera.orthoCam.position, {
                y: 4,
            },"same")
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
                duration: 0.5,
            }) 
            .to(this.roomChildren.cabinet.scale, {
                x: 1,
                y: 1,
                z: 1,
                ease: "back.out",
                duration: 0.5,
            }, "<+=0.15") 
            .to(this.roomChildren.bed.scale, {
                x: 3.561274290084839,
                y: 0.7499647736549377,
                z: 6.197537422180176,
                ease: "back.out",
                duration: 0.5,
            },"<+=0.15") 
            .to(this.roomChildren.box2.scale, {
                x: 1.37487,
                y: 1.10916,
                z: 1.3452,
                ease: "back.out",
                duration: 0.5,
            },"<+=0.15") 
            .to(this.roomChildren.box1.scale, {
                x: 1.35882,
                y: 0.993757,
                z: 1.35882,
                ease: "back.out",
                duration: 0.5,
            },"<+=0.15") 
            .to(this.roomChildren.book1.scale, {
                x: -0.6578431725502014,
                y: -0.14172077178955078,
                z: -1.0060994625091553,
                duration: 0.4,
            },"<+=0.1")
            .to(this.roomChildren.lamp1_1.scale, {
                x: 0.03988884389400482,
                y: 0.033630888909101486,
                z: 0.03988884389400482,
                duration: 0.25,
            },"<+=0.1")
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
            },"<+=0.1") 
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
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.mouse.scale, {
                x: 0.05541212111711502,
                y: 0.01908853091299534,
                z: 0.05759280174970627,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.holder.scale, {
                x: 0.39381736516952515,
                y: 0.39381736516952515,
                z: 0.39381736516952515,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.textbook.scale, {
                x: -0.8277817368507385,
                y: -0.10515011101961136,
                z: -1.200506329536438,
                duration: 0.4,
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
                duration: 0.6,
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
                duration: 0.6,
            },"<+=0.15")
            .to(this.roomChildren.lamp2_1.scale, {
                x: -0.5410515069961548,
                y: -0.06891237199306488,
                z: -0.5410515069961548,
                duration: 0.3,
            },"<+=0.15")   
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
                x: 1.040769338607788,
                y: 1.040769338607788,
                z: 1.040769338607788,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.poster1.scale, {
                x: 1.910263180732727,
                y: 1.6497119665145874,
                z: 0.10077943652868271,
                duration: 0.4,
                ease: "back.out",
            },"<+=0.15")  
            .to(this.roomChildren.poster2.scale, {
                x: 1.5902454853057861,
                y: 1.8262255191802979,
                z: 0.0912836343050003,
                duration: 0.4,
                ease: "back.out",
            },"<+=0.15")  
            .to(this.roomChildren.poster3.scale, {
                x: 2.1607797145843506,
                y: 3.387428045272827,
                z: 0.1111418753862381,
                duration: 0.4,
                ease: "back.out",
            },"<+=0.15")  
            .to(this.roomChildren.pillow1.scale, {
                x: 2.0298759937286377,
                y: 1.739692211151123,
                z: 1.4317166805267334,
                duration: 0.4,
                ease: "back.out",
            },"<")  
            .to(this.roomChildren.pillow2.scale, {
                x: 1.9276858568191528,
                y: 1.601382851600647,
                z: 1.3483161926269531,
                duration: 0.4,
                ease: "back.out",
            },"<+=0.15")  
            .to(this.roomChildren.pillow2.scale, {
                x: 1.9276858568191528,
                y: 1.601382851600647,
                z: 1.3483161926269531,
                duration: 0.4,
                ease: "back.out",
            },"<+=0.15") 
            .to(this.roomChildren.frame.scale, {
                x: 0.9609348177909851,
                y: 0.13879582285881042,
                z: 4.823689937591553,
                duration: 0.4,
            },"<") 
            .set(this.roomChildren.fake__wall.scale, {
                x: 0,
                y: 0,
                z: 0,
            },"<") 
            .to(this.roomChildren.fake_frame.scale, {
                x: 0.9609348177909851,
                y: 0.13879582285881042,
                z: 4.823689937591553,
                duration: 0.4,
            },"<") 
            .to(this.roomChildren.frame.position, {
                x: 8.823111534118652,
                z: -3.392366647720337,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.fake_frame.position, {
                x: 9.03757381439209,
                z: -3.599921226501465,
                duration: 0.4,
            },"<") 
            .to(this.roomChildren.fake_frame.scale, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.bar1.scale, {
                x: 0.4864078760147095,
                y: 0.5873807072639465,
                z: 0.31835228204727173,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.bar2.scale, {
                x: 0.23906876146793365,
                y: 7.286600112915039,
                z: 0.23906874656677246,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.hanger1.scale, {
                x: 0.6295828819274902,
                y: 0.47083765268325806,
                z: 0.42681804299354553,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.hanger2.scale, {
                x: 0.6295828819274902,
                y: 0.47083765268325806,
                z: 0.42681804299354553,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.hanger3.scale, {
                x: 0.6295828819274902,
                y: 0.47083765268325806,
                z: 0.42681804299354553,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.hanger4.scale, {
                x: 0.6295828819274902,
                y: 0.47083765268325806,
                z: 0.42681804299354553,
                duration: 0.4,
            },"<+=0.15") 
            .to(this.roomChildren.blinds.scale, {
                x: -5.3427510261535645,
                y: -20.517847061157227,
                z: -2.81984281539917,
                duration: 0.7,
                ease: "power1.out",
            },"<+=0.15") 
            .to(this.roomChildren.blind_holders.scale, {
                x: 0.8051218390464783,
                y: 0.8051218390464783,
                z: 0.8051218390464783,
                duration: 0.4,
            },"<") 
            .to(this.roomChildren.chair.scale, {
                x: 1.504396915435791,
                y: 1.4172548055648804,
                z: 1.504396915435791,
                duration: 0.4,
            },"<+=0.6") 
            .to(this.roomChildren.chair.children[0].rotation, {
                y: Math.PI * 6,
                ease: "power4.out",
                duration: 2,
            },"<+=0.2") 
            .to(this.roomChildren.plant.scale, {
                x: 0.5571946501731873,
                y: 0.5571946501731873,
                z: 0.5571946501731873,
                duration: 0.4,
            },"<") 
            .to(this.roomChildren.box3.scale, {
                x: 1.0239899158477783,
                y: 0.6923670172691345,
                z: 0.8245781660079956,
                duration: 0.4,
            },"<") 
            .to(this.roomChildren.book2_1.scale, {
                x: -0.7568146586418152,
                y: -0.15787771344184875,
                z: -1.1044329404830933,
                duration: 0.4,
            },"<+=0.2") 
            .to(this.roomChildren.book2_2.scale, {
                x: -0.7332358956336975,
                y: -0.12114348262548447,
                z: -1.0520448684692383,
                duration: 0.4,
            },"<") 
            .to(this.roomChildren.book3_1.scale, {
                x: -0.7568146586418152,
                y: -0.15787771344184875,
                z: -1.1044329404830933,
                duration: 0.4,
            },"<+=0.2") 
            .to(this.roomChildren.book3_2.scale, {
                x: -0.7320989966392517,
                y: -0.11181052029132843,
                z: -1.048675298690796,
                duration: 0.4,
            },"<") 
            .to(this.roomChildren.book4_1.scale, {
                x: -0.7568146586418152,
                y: -0.15787771344184875,
                z: -1.1044330596923828,
                duration: 0.4,
            },"<+=0.2") 
            .to(this.roomChildren.book4_2.scale, {
                x: -0.618922233581543,
                y: -0.12181471288204193,
                z: -0.8939098119735718,
                duration: 0.4,
                
            },"<")
            .to(".hero-main-title .animatedis", {
                yPercent: -100,
                stagger: 0.07,
                ease: "back.out(2)",
                duration: 0.3,
            },"<")
            .to(".hero-main-description .animatedis", {
                yPercent: -100,
                stagger: 0.07,
                ease: "back.out(2)",
                duration: 0.3,
            },"<")
            .to(".first-sub .animatedis", {
                yPercent: -100,
                stagger: 0.07,
                ease: "back.out(2)",
                duration: 0.4,
            },"<")
            .to(".second-sub .animatedis", {
                yPercent: -100,
                stagger: 0.07,
                ease: "back.out(2)",
                duration: 0.4,
            },"<")
            .to(this.world.environment.windowLight, {
                intensity: 7,
                onComplete: resolve
            })
            .to(".arrow-svg-wrapper", {
                opacity: 1,
            }, "<") 
            
        });
    }

    onScroll(e) {
        if (e.deltaY > 0 ) {
            window.removeEventListener("wheel", this.scrollOnceEvent);
            this.playSecondIntro();
        }
    }

    onTouch(e) {
        this.initialY = e.touches[0].clientY;
        window.removeEventListener("touchstart", this.touchStart);
    }

    onTouchMove(e) {
        let currentY = e.touches[0].clientY;
        let delta = this.initialY - currentY;
        if (delta > 0) {
            window.removeEventListener("touchmove", this.touchMove);
            this.playSecondIntro();
            
        }
        this.initialY = null;
    }

    async playIntro() {
        await this.firstIntro();
        this.scrollOnceEvent = this.onScroll.bind(this);
        this.touchStart = this.onTouch.bind(this);
        this.touchMove = this.onTouchMove.bind(this);
        window.addEventListener("wheel", this.scrollOnceEvent );
        window.addEventListener("touchstart", this.touchStart);
        window.addEventListener("touchmove", this.touchMove);
    }

    async playSecondIntro() {
        await this.secondIntro();
        this.emit("enablecontrols");
    }

    resize() {
        
    }
}