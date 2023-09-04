import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap"

export default class Room {
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.scene = this.experience.scene; 
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.room = this.resources.items.room;
        this.actualRoom = this.room.scene;
        this.roomChildren = {};

        // smoothing the motion of the curve
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.05,
        };

        this.setModel();
        this.onMouseMove();
    }

    setModel() {
        // pre setting groups
        this.actualRoom.children.forEach((child) => {

        })

        // giving object lighting
        this.actualRoom.children.forEach((child) => {
            child.castShadow = true;
            child.receiveShadow = true; 

            // setting light for grouped children
            if (child instanceof THREE.Group ) {
                child.children.forEach((groupchild)=> {
                    groupchild.castShadow = true;
                    groupchild.receiveShadow = true;
                }); 
            }

            if (child.name === "Computer") {
                child.children[1].material = new THREE.MeshBasicMaterial({
                    map: this.resources.items.screen,
                });
            }
            if (child.name === "lamp1") {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xdce4e1,
                    emissive: 0x000000,
                    emissiveIntensity: 0.5,
                });    
            }
            if (child.name === "lamp2_3") {
                child.material = new THREE.MeshStandardMaterial({
                    color: 0xdce4e1,
                    emissive: 0x000000,
                    emissiveIntensity: 0.5,
                });    
            }

            this.experience.world.environment.windowLight.visible = false;
            //child.scale.set(0,0,0);

            if (child.name === "Cube") { 
                child.position.set(0, -1, -16);
                child.scale.set(0,0,0); 
            }

            this.roomChildren[child.name.toLowerCase()] = child;

        });
        
        // lamp lights
        this.intensity = 0;
        const dist = 1;
        const decay = 1;
        this.lampLight1 = new THREE.PointLight(0xffffff, this.intensity, dist , decay );
        this.lampLight1.position.set(10.278803825378418, 8.356810569763184 , 5.399413108825684);
        this.lampLight1.rotation.x = -Math.PI/2;
        this.actualRoom.add(this.lampLight1);

        this.lampLight2 = new THREE.PointLight(0xffffff, this.intensity, decay);
        this.lampLight2.position.set(-2.903419017791748, 5.227436256408691 , -0.7773137092590332);
        this.lampLight2.rotation.x = -Math.PI/2;
        this.actualRoom.add(this.lampLight2);

        this.roomChildren["lampLight1"] = this.lampLight1;
        this.roomChildren["lampLight2"] = this.lampLight2;

        this.scene.add(this.actualRoom);
        this.actualRoom.scale.set(0.1,0.1,0.1);
        //this.actualRoom.rotation.y = -Math.PI/2;
    }
    
    onMouseMove() {
        window.addEventListener("mousemove", (e) => {
            // calculating mouse location
            this.rotation = ((e.clientX - window.innerWidth/2) * 2) / window.innerWidth;
            // adding lerp rotation
            this.lerp.target = this.rotation*0.05;
        });
    }

    resize() {
        
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current, 
            this.lerp.target,
            this.lerp.ease
        );    

        // updating rotation
        this.actualRoom.rotation.y = this.lerp.current;

    }
}