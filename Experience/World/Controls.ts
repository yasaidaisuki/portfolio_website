import type * as THREE from "three";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Lenis from "lenis";
import "lenis/dist/lenis.css";

import type Camera from "../Camera";
import Sizes, { DESKTOP_MIN_WIDTH } from "../Utils/Sizes";
import type World from "./World";
import { WINDOW_LIGHT_INTENSITY, WINDOW_LIGHT_POSITION, WINDOW_LIGHT_ZOOMED_INTENSITY, WINDOW_TARGET_POSITION } from "./Environment";

export default class Controls {
    readonly lenis: Lenis;

    constructor(
        private readonly world: World,
        private readonly sizes: Sizes,
        private readonly camera: Camera
    ) {
        gsap.registerPlugin(ScrollTrigger);

        // the page is locked to one screen during the intro
        document.querySelector(".page")!.classList.remove("h-screen", "overflow-hidden");

        this.lenis = this.setSmoothScroll();
        this.setScrollTrigger();
    }

    private setSmoothScroll() {
        // https://github.com/darkroomengineering/lenis#gsap-scrolltrigger
        const lenis = new Lenis();
        lenis.on("scroll", ScrollTrigger.update);
        gsap.ticker.add((time) => lenis.raf(time * 1000));
        gsap.ticker.lagSmoothing(0);
        return lenis;
    }

    private setScrollTrigger() {
        // a matchMedia context reverts everything created inside it when its query stops matching
        const mm = gsap.matchMedia();
        mm.add(`(min-width: ${DESKTOP_MIN_WIDTH}px)`, () => this.setRoomTimelines(false));
        mm.add(`(max-width: ${DESKTOP_MIN_WIDTH - 0.02}px)`, () => this.setRoomTimelines(true));
        mm.add("all", () => {
            this.setSectionTimelines();
            this.setCircleTimelines();
        });
    }

    // a timeline scrubbed while `trigger` scrolls through the viewport
    private scrubTimeline(trigger: string) {
        return gsap.timeline({
            scrollTrigger: {
                trigger,
                start: "top top",
                end: "bottom bottom",
                scrub: 1,
                invalidateOnRefresh: true,
            },
        });
    }

    private setRoomTimelines(isMobile: boolean) {
        const room = this.world.room.actualRoom;
        const { lampLight1, lampLight2 } = this.world.room;
        const { windowLight, target } = this.world.environment;
        const firstShift = () => this.sizes.width * 0.0012;
        const fourthShift = () => this.sizes.width * -0.0015;

        if (isMobile) {
            // Resets
            gsap.set(room.scale, { x: 0.07, y: 0.07, z: 0.07 });
            gsap.set(room.position, { x: -0.2, y: 0, z: 0 });
            gsap.set(this.camera.orthoCam.position, { x: 0, y: 6.5, z: 10 });
        }

        // First section
        const first = this.scrubTimeline(".first-move");
        if (isMobile) {
            first.to(room.scale, { x: 0.1, y: 0.1, z: 0.1 });
        }
        first
            .to(room.position, { x: firstShift }, "same")
            // window light and its target
            .to(windowLight.position, { x: () => WINDOW_LIGHT_POSITION.x + firstShift() }, "same")
            .to(target.position, { x: () => WINDOW_TARGET_POSITION.x + firstShift() }, "same");

        // Second section
        this.scrubTimeline(".second-move")
            .to(room.position, { x: 1, z: () => this.sizes.height * 0.001, duration: 0.8, delay: 0.2 }, "same")
            .to(room.scale, { x: 0.4, y: 0.4, z: 0.4 }, "same")
            .to(
                windowLight.position,
                {
                    x: () => (WINDOW_LIGHT_POSITION.x + firstShift()) * 3,
                    y: WINDOW_LIGHT_POSITION.y * 3,
                    duration: 0.9,
                },
                "same"
            )
            .to(lampLight2, { distance: 4 }, "same")
            .to(lampLight1, { distance: 4 }, "same");

        // Third section
        this.scrubTimeline(".third-move")
            .to(room.position, { x: 1.2, z: () => this.sizes.height * 0.004, duration: 0.8, delay: 0.2 }, "same")
            .to(room.scale, { x: 0.27, y: 0.27, z: 0.27 }, "same")
            .to(windowLight.position, { x: 5.562926, y: 3.759329, z: 0.333356, duration: 0.9 }, "same")
            .to(windowLight, { distance: 9, decay: 1.2, intensity: WINDOW_LIGHT_ZOOMED_INTENSITY, duration: 0.9 }, "same")
            .to(windowLight.shadow, { normalBias: 0.1 }, "same")
            .to(target.position, { x: 4.7, y: 3.5, z: 1, duration: 0.9 }, "same");

        // Fourth section
        this.scrubTimeline(".fourth-move")
            .to(room.position, { x: fourthShift, y: 0, z: 0, duration: 1, delay: 0.2 }, "same")
            .to(room.scale, { x: 0.1, y: 0.1, z: 0.1 }, "same")
            .to(lampLight2, { distance: 1 }, "same")
            .to(lampLight1, { distance: 1 }, "same")
            .to(windowLight.position, { x: () => WINDOW_LIGHT_POSITION.x + fourthShift(), y: 1, z: -0.7 }, "same")
            .to(
                target.position,
                { x: () => WINDOW_TARGET_POSITION.x + fourthShift(), y: 0, z: 0, duration: 0.9, delay: 0.2 },
                "same"
            )
            .to(
                windowLight,
                { distance: 2.7, decay: 1.5, intensity: WINDOW_LIGHT_INTENSITY, duration: 0.9, delay: 0.2 },
                "same"
            );
    }

    // each section's big rounded corner flattens as it scrolls in, and the bottom corner rounds as it leaves
    private setSectionTimelines() {
        document.querySelectorAll<HTMLElement>(".section").forEach((section) => {
            const isRight = section.classList.contains("right");
            this.scrubSection(
                section,
                "top",
                isRight ? { borderTopLeftRadius: 10 } : { borderTopRightRadius: 10, borderTopLeftRadius: 10 }
            );
            this.scrubSection(
                section,
                "bottom",
                isRight ? { borderBottomLeftRadius: 700 } : { borderBottomRightRadius: 700, borderBottomLeftRadius: 10 }
            );
        });
    }

    private scrubSection(section: HTMLElement, edge: "top" | "bottom", vars: gsap.TweenVars) {
        gsap.to(section, {
            ...vars,
            scrollTrigger: {
                trigger: section,
                start: `${edge} bottom`,
                end: `${edge} top`,
                scrub: 0.6,
            },
        });
    }

    // the floor circles grow as each move section scrolls past
    private setCircleTimelines() {
        const { circleFirst, circleSecond, circleThird, circleFourth } = this.world.floor;
        const circles: [string, THREE.Mesh][] = [
            [".first-move", circleFirst],
            [".second-move", circleSecond],
            [".third-move", circleThird],
            [".fourth-move", circleFourth],
        ];
        for (const [trigger, circle] of circles) {
            gsap.to(circle.scale, {
                x: 3,
                y: 3,
                z: 3,
                scrollTrigger: {
                    trigger,
                    start: "top top",
                    end: "bottom bottom",
                    scrub: 0.6,
                },
            });
        }
    }
}
