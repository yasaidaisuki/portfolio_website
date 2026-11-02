import EventEmitter from "./Utils/EventEmitter";

export type ThemeName = "light" | "dark";

export default class Theme extends EventEmitter<{ switch: [ThemeName] }> {
    theme: ThemeName = "light";
    private readonly toggleButton = document.querySelector<HTMLButtonElement>(".toggle-button")!;

    constructor() {
        super();
        this.setEventListeners();
    }

    private setEventListeners() {
        this.toggleButton.addEventListener("click", () => {
            this.theme = this.theme === "light" ? "dark" : "light";
            const isDark = this.theme === "dark";
            // the toggle knob slides via the `dark:` variant, keyed off this body class
            document.body.classList.toggle("dark-theme", isDark);
            document.body.classList.toggle("light-theme", !isDark);
            this.toggleButton.setAttribute("aria-pressed", String(isDark));

            this.emit("switch", this.theme);
        });
    }
}
