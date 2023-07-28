import EventEmitter from "events";

export default class Time extends EventEmitter {
    constructor() {
        super();
        this.start = Date.now();
        this.current = this.start;
        this.elasped = 0;
        this.delta = 16;
 
        this.update();
    }

    update() {
        // get current time
        const currentTime = Date.now();
        this.delta = currentTime - this.current;
        // update current time
        this.current = currentTime;
        // elapsed time
        this.elasped = this.current - this.start;

        console.log(this.delta);
        this.emit("update");
        window.requestAnimationFrame(() => this.update());
    }
}