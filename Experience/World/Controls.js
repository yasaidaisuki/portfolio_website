import * as THREE from "three";
import Experience from "../Experience.js";
import GSAP from "gsap"

export default class Controls {
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.scene = this.experience.scene; 
        this.resources = this.experience.resources;
        this.time = this.experience.time;
        this.camera = this.experience.camera;
        this.room = this.experience.world.room.actualRoom;

        this.dummyCurve = new THREE.Vector3(0,0,0);

        // smoothing the motion of the curve
        this.lerp = {
            current: 0,
            target: 0,
            ease: 0.1,
        };

        this.position = new THREE.Vector3(0,0,0);

        this.directionalVector = new  THREE.Vector3(0,0,0);
        // multiply vector with static vector
        this.staticVector = new  THREE.Vector3(0,1,0);
        // resultant vector
        this.crossVector = new  THREE.Vector3(0,0,0);

        this.setPath(); 
        // control orthographic camera with mouse wheel
        this.onWheel();
    }

    onWheel() {
        window.addEventListener("wheel", (e) =>
         {
            // if scrolling up 
            if (e.deltaY > 0) {
                this.lerp.target += 0.01;
            }
            // scrolling down
            else {
                this.lerp.target -= 0.01;
            }
         });
    }

    setPath() {
        this.curve = new THREE.CatmullRomCurve3( [
            new THREE.Vector3( -5, 0, 0 ),
            new THREE.Vector3( 0, 0, -5 ),
            new THREE.Vector3( 5, 0, 0 ),
            new THREE.Vector3( 0, 0, 5 ),
        ], true );

        const points = this.curve.getPoints( 50 );
        const geometry = new THREE.BufferGeometry().setFromPoints( points );
        
        const material = new THREE.LineBasicMaterial( { color: 0xff0000 } );
        
        // Create the final object to add to the scene
        const curveObject = new THREE.Line( geometry, material );

        this.scene.add(curveObject);
    }

    resize() {
        
    }

    update() {
        this.lerp.current = GSAP.utils.interpolate(
            this.lerp.current, 
            this.lerp.target,
            this.lerp.ease
        );
        // copies position lerp.current and puts it into position
        this.curve.getPointAt(this.lerp.current % 1, this.position);
        this.camera.orthoCam.position.copy(this.position);
        // v1 - v2
        this.directionalVector.subVectors(
            this.curve.getPointAt((this.lerp.current % 1) + 0.0000001),
            this.position
        );
        // converts into unit vector
        this.directionalVector.normalize();
        // cross product of v1 & v2
        this.crossVector.crossVectors(
            this.directionalVector,
            this.staticVector
        );
        this.crossVector.multiplyScalar(1000000);
        this.camera.orthoCam.lookAt(this.crossVector);
        console
    }
}