import type * as THREE from "three";
import { gsap } from "gsap";
import EventEmitter from "./Utils/EventEmitter";
import convert from "./Utils/convertDivsToSpans";
import type Camera from "./Camera";
import type Sizes from "./Utils/Sizes";
import type World from "./World/World";
import { WINDOW_LIGHT_INTENSITY } from "./World/Environment";

// [room child, duration, position on the timeline, ease]; each grows from 0 to its modelled scale
type Pop = [name: string, duration: number, position?: gsap.Position, ease?: string];

export default class Preloader extends EventEmitter<{ enablecontrols: [] }> {
    private room!: THREE.Group;
    private roomChildren!: Record<string, THREE.Object3D>;
    private touchStartY = 0;

    constructor(
        private readonly world: World,
        private readonly sizes: Sizes,
        private readonly camera: Camera
    ) {
        super();
    }

    // called once the world is built and its shaders are compiled
    start() {
        this.setAssets();
        this.playIntro();
    }

    private setAssets() {
        convert(document.querySelector(".intro-text")!);
        convert(document.querySelector(".hero-main-title")!);
        convert(document.querySelector(".hero-main-description")!);
        convert(document.querySelector(".hero-second-subheading")!);
        convert(document.querySelector(".second-sub")!);

        this.room = this.world.room.actualRoom;
        this.roomChildren = this.world.room.roomChildren;
    }

    private firstIntro() {
        return new Promise<void>((resolve) => {
            const isDesktop = this.sizes.device === "desktop";
            const timeline = gsap.timeline();

            timeline
                .to(".preloader", {
                    opacity: 0,
                    delay: 1,
                    onComplete: () => {
                        document.querySelector(".preloader")!.classList.add("hidden");
                    },
                })
                .to(this.roomChildren.cube.scale, {
                    x: 1.4,
                    y: 1.4,
                    z: 1.4,
                    ease: "back.out(2.5)",
                    duration: isDesktop ? 0.7 : 0.5,
                })
                .to(this.room.position, {
                    ...(isDesktop ? { x: -1.3 } : { z: -1 }),
                    ease: "power1.out",
                    duration: 0.7,
                })
                .to(".intro-text .animatedis", {
                    yPercent: -100,
                    stagger: 0.07,
                    ease: "back.out(2)",
                    duration: 0.4,
                    onComplete: resolve,
                })
                .to(".arrow-svg-wrapper", { opacity: 1 }, "<")
                .to(".toggle-bar", { opacity: 1 }, "<");
        });
    }

    private secondIntro() {
        return new Promise<void>((resolve) => {
            const { cube, fake__wall, shelf1, shelf2, frame, fake_frame, chair } = this.roomChildren;
            const timeline = gsap.timeline();
            const pop = ([name, duration, position, ease]: Pop) => {
                const child = this.roomChildren[name];
                const { x, y, z } = child.userData.scale as THREE.Vector3;
                timeline.to(child.scale, { x, y, z, duration, ...(ease ? { ease } : {}) }, position);
            };

            // the cube grows into the room's walls
            timeline
                .to(".intro-text .animatedis", {
                    yPercent: 100,
                    stagger: 0.07,
                    ease: "back.in(1.3)",
                    duration: 0.4,
                })
                .to(".arrow-svg-wrapper", { opacity: 0 }, "<")
                .to(this.room.position, { x: 0, y: 0, z: 0, ease: "power1.out" }, "same")
                .to(cube.rotation, { y: 2 * Math.PI }, "same")
                .to(cube.scale, { x: 11, y: 11.23, z: 11.22, ease: "power1.out" }, "same")
                .to(cube.position, { x: 2.6, y: 11.2, z: 4.6, ease: "back.out" }, "same")
                .to(this.camera.orthoCam.position, { y: 4 }, "same");
            pop(["wall", 0.5]);
            timeline.set(fake__wall.scale, { x: 1, y: 1, z: 1 }).to(cube.scale, { x: 0, y: 0, z: 0 });

            // then the furniture pops in, piece by piece
            ([
                ["desk", 0.3, undefined, "back.out"],
                ["cabinet", 0.3, "<+=0.1", "back.out"],
                ["bed", 0.3, "<+=0.1", "back.out"],
                ["box2", 0.3, "<+=0.1", "back.out"],
                ["box1", 0.3, "<+=0.1", "back.out"],
                ["book1", 0.2, "<+=0.05"],
                ["lamp1_1", 0.15, "<+=0.05"],
                ["lamp1_2", 0.15, "<+=0.05"],
                ["lamp1_3", 0.15, "<"],
                ["lamp1", 0.3, "<+=0.1"],
                ["carpet", 0.3, "<+=0.1", "back.out"],
                ["computer", 0.3, "<+=0.1", "back.out(1)"],
                ["keyboard", 0.3, "<+=0.1"],
                ["mouse", 0.3, "<+=0.1"],
                ["holder", 0.3, "<+=0.1"],
                ["textbook", 0.3, "<+=0.1"],
                ["cup", 0.3, "<+=0.1"],
            ] satisfies Pop[]).forEach(pop);

            pop(["shelf1", 0.3, "<+=0.1"]);
            timeline.to(shelf1.position, { x: -7.833316326141357, z: 2.8565711975097656, duration: 0.4 }, "<+=0.1");
            pop(["shelf2", 0.3, "<+=0.1"]);
            timeline.to(shelf2.position, { x: -7.833316326141357, z: 2.8565711975097656, duration: 0.4 }, "<+=0.1");

            ([
                ["lamp2_1", 0.2, "<+=0.1"],
                ["lamp2_2", 0.2, "<"],
                ["lamp2_3", 0.3, "<+=0.1"],
                ["phone", 0.3, "<+=0.1"],
                ["poster1", 0.3, "<+=0.1", "back.out"],
                ["poster2", 0.3, "<+=0.1", "back.out"],
                ["poster3", 0.3, "<+=0.1", "back.out"],
                ["pillow1", 0.3, "<", "back.out"],
                ["pillow2", 0.3, "<+=0.1", "back.out"],
                ["frame", 0.3, "<+=0.1"],
            ] satisfies Pop[]).forEach(pop);

            // the frame slides off the fake wall onto the real one
            timeline.set(fake__wall.scale, { x: 0, y: 0, z: 0 }, "<");
            pop(["fake_frame", 0.3, "<"]);
            timeline
                .to(frame.position, { x: 8.823111534118652, z: -3.392366647720337, duration: 0.3 }, "<+=0.1")
                .to(fake_frame.position, { x: 9.03757381439209, z: -3.599921226501465, duration: 0.3 }, "<")
                .to(fake_frame.scale, { x: 0, y: 0, z: 0, duration: 0.3 }, "<+=0.1");

            ([
                ["bar1", 0.3, "<+=0.1"],
                ["bar2", 0.3, "<+=0.1"],
                ["hanger1", 0.3, "<+=0.1"],
                ["hanger2", 0.3, "<+=0.1"],
                ["hanger3", 0.3, "<+=0.1"],
                ["hanger4", 0.3, "<+=0.1"],
                ["blinds", 0.4, "<+=0.15", "power1.out"],
                ["blind_holders", 0.3, "<"],
                ["chair", 0.3, "<+=0.6"],
            ] satisfies Pop[]).forEach(pop);

            timeline.to(chair.children[0].rotation, { y: Math.PI * 6, ease: "power4.out", duration: 2 }, "<+=0.2");

            ([
                ["plant", 0.3, "<"],
                ["box3", 0.3, "<"],
                ["book2_1", 0.3, "<+=0.2"],
                ["book2_2", 0.3, "<"],
                ["book3_1", 0.3, "<+=0.2"],
                ["book3_2", 0.3, "<"],
                ["book4_1", 0.3, "<+=0.2"],
                ["book4_2", 0.3, "<"],
            ] satisfies Pop[]).forEach(pop);

            // hero text, then the window light fades in
            const letters = { yPercent: -100, stagger: 0.07, ease: "back.out(2)" };
            const { windowLight } = this.world.environment;
            timeline
                .to(".hero-main-title .animatedis", { ...letters, duration: 0.3 }, "<")
                .to(".hero-main-description .animatedis", { ...letters, duration: 0.1 }, "<")
                .to(".first-sub .animatedis", { ...letters, duration: 0.3 }, "<")
                .to(".second-sub .animatedis", { ...letters, duration: 0.3 }, "<")
                .to(windowLight, {
                    intensity: WINDOW_LIGHT_INTENSITY,
                    onStart: () => {
                        windowLight.shadow.autoUpdate = true;
                    },
                })
                .to(".arrow-svg-wrapper", { opacity: 1, onComplete: resolve }, "<");
        });
    }

    private onWheel = (e: WheelEvent) => {
        if (e.deltaY > 0) {
            this.playSecondIntro();
        }
    };

    private onTouchStart = (e: TouchEvent) => {
        this.touchStartY = e.touches[0].clientY;
    };

    private onTouchMove = (e: TouchEvent) => {
        // swiping up, i.e. scrolling down
        if (this.touchStartY - e.touches[0].clientY > 0) {
            this.playSecondIntro();
        }
    };

    private async playIntro() {
        await this.firstIntro();
        window.addEventListener("wheel", this.onWheel, { passive: true });
        window.addEventListener("touchstart", this.onTouchStart, { passive: true });
        window.addEventListener("touchmove", this.onTouchMove, { passive: true });
    }

    private async playSecondIntro() {
        // removing every trigger at once means the second intro can only start once
        window.removeEventListener("wheel", this.onWheel);
        window.removeEventListener("touchstart", this.onTouchStart);
        window.removeEventListener("touchmove", this.onTouchMove);

        await this.secondIntro();
        this.world.enableLights();
        this.emit("enablecontrols");
    }
}
