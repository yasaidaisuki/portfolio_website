import EventEmitter from "./EventEmitter";

export default class Time extends EventEmitter<{ update: [] }> {
    readonly start = performance.now();
    current = this.start;
    elapsed = 0;
    // milliseconds since the previous frame
    delta = 16;

    constructor() {
        super();
        requestAnimationFrame(this.update);
    }

    private update = (now: number) => {
        // rAF's timestamp is the frame's start, which can be just before `start`
        this.delta = Math.max(0, now - this.current);
        this.current = now;
        this.elapsed = this.current - this.start;
        this.emit("update");
        requestAnimationFrame(this.update);
    };
}
