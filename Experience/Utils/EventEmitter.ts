type Listener<Args extends unknown[]> = (...args: Args) => void;

// minimal typed event emitter: `Events` maps each event name to its payload
export default class EventEmitter<Events extends Record<string, unknown[]>> {
    private listeners: { [K in keyof Events]?: Listener<Events[K]>[] } = {};

    on<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this {
        (this.listeners[event] ??= []).push(listener);
        return this;
    }

    off<K extends keyof Events>(event: K, listener: Listener<Events[K]>): this {
        this.listeners[event] = this.listeners[event]?.filter((l) => l !== listener);
        return this;
    }

    protected emit<K extends keyof Events>(event: K, ...args: Events[K]): void {
        this.listeners[event]?.forEach((listener) => listener(...args));
    }
}
