import EventEmitter from "./EventEmitter";

export type Device = "desktop" | "mobile";

// shared by Controls' media queries and the `desktop` breakpoint in style.css
export const DESKTOP_MIN_WIDTH = 968;

const getDevice = (width: number): Device => (width < DESKTOP_MIN_WIDTH ? "mobile" : "desktop");

export default class Sizes extends EventEmitter<{ resize: [] }> {
    width = window.innerWidth;
    height = window.innerHeight;
    aspect = this.width / this.height;
    pixelRatio = Math.min(window.devicePixelRatio, 2);
    device = getDevice(this.width);
    readonly frustum = 5;

    constructor() {
        super();

        window.addEventListener("resize", () => {
            this.width = window.innerWidth;
            this.height = window.innerHeight;
            this.aspect = this.width / this.height;
            this.pixelRatio = Math.min(window.devicePixelRatio, 2);
            this.device = getDevice(this.width);
            this.emit("resize");
        });
    }
}
