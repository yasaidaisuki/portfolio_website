import * as THREE from "three";
import { gsap } from "gsap";
import type Time from "../Utils/Time";
import type { Items } from "../Utils/Resources";

const LAMP_DISTANCE = 1;
const LAMP_DECAY = 1;

export default class Room {
    readonly actualRoom: THREE.Group;
    // top-level model pieces by lowercased name, e.g. "desk", "lamp1_2"
    readonly roomChildren: Record<string, THREE.Object3D> = {};
    readonly lampLight1: THREE.PointLight;
    readonly lampLight2: THREE.PointLight;

    private readonly lamps: THREE.Mesh[] = [];
    private readonly lampOffMaterial = new THREE.MeshStandardMaterial({
        color: 0xdce4e1,
        emissive: 0x000000,
        emissiveIntensity: 0.5,
    });
    private readonly lampOnMaterial = new THREE.MeshStandardMaterial({
        emissive: 0xffffff,
        emissiveIntensity: 0.6,
    });

    // smoothing the motion of the curve
    private readonly lerp = {
        current: 0,
        target: 0,
        ease: 0.1,
    };

    constructor(scene: THREE.Scene, items: Items, private readonly time: Time) {
        this.actualRoom = items.room.scene;
        this.setModel(items.screen);

        // lamp lights
        this.lampLight1 = new THREE.PointLight(0xffffff, 0, LAMP_DISTANCE, LAMP_DECAY);
        this.lampLight1.position.set(10.278803825378418, 8.356810569763184, 5.399413108825684);
        this.actualRoom.add(this.lampLight1);

        this.lampLight2 = new THREE.PointLight(0xffffff, 0, LAMP_DISTANCE, LAMP_DECAY);
        this.lampLight2.position.set(-2.903419017791748, 5.227436256408691, -0.7773137092590332);
        this.actualRoom.add(this.lampLight2);

        scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.1, 0.1, 0.1);

        this.onMouseMove();
    }

    private setModel(screen: THREE.VideoTexture) {
        // giving object lighting
        this.actualRoom.traverse((object) => {
            if (!(object instanceof THREE.Mesh)) return;
            object.castShadow = true;
            object.receiveShadow = true;
            // the glass has a barely visible transmission, which still costs an extra scene render per frame
            if (object.material instanceof THREE.MeshPhysicalMaterial) {
                object.material.transmission = 0;
            }
        });

        this.actualRoom.children.forEach((child) => {
            if (child.name === "Computer") {
                (child.children[1] as THREE.Mesh).material = new THREE.MeshBasicMaterial({
                    map: screen,
                });
            }
            if (child.name === "lamp1" || child.name === "lamp2_3") {
                const lamp = child as THREE.Mesh;
                lamp.material = this.lampOffMaterial;
                this.lamps.push(lamp);
            }

            // remember the modelled scale so the intro can grow each piece back to it
            child.userData.scale = child.scale.clone();
            child.scale.set(0, 0, 0);

            if (child.name === "Cube") {
                child.position.set(0, -1, 0);
            }

            this.roomChildren[child.name.toLowerCase()] = child;
        });
    }

    setLamps(on: boolean) {
        gsap.to(this.lampLight1, { intensity: on ? 0.35 : 0 });
        gsap.to(this.lampLight2, { intensity: on ? 0.25 : 0 });
        // setting emission
        const material = on ? this.lampOnMaterial : this.lampOffMaterial;
        this.lamps.forEach((lamp) => (lamp.material = material));
    }

    private onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            // calculating mouse location
            const rotation = ((e.clientX - window.innerWidth / 2) * 2) / window.innerWidth;
            // adding lerp rotation
            this.lerp.target = rotation * 0.05;
        });
    }

    update() {
        // `ease` is the fraction covered per 60fps frame; scaling by delta keeps it the same at any frame rate
        const ease = 1 - Math.pow(1 - this.lerp.ease, this.time.delta / (1000 / 60));
        this.lerp.current = gsap.utils.interpolate(this.lerp.current, this.lerp.target, ease);

        // updating rotation
        this.actualRoom.rotation.y = this.lerp.current;
    }
}
