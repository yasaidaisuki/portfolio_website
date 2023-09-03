import * as THREE from "three";
import Experience from "../Experience.js";

export default class Floor {
    constructor() {
        // setting objects
        this.experience = new Experience();
        this.scene = this.experience.scene; 

        this.setFloor();
        this.setCircles();
    }

    setFloor() {
        this.geometry = new THREE.PlaneGeometry(100,100);
        this.material = new THREE.MeshStandardMaterial({
            color: 0xF7F0E1,
        });
        this.plane = new THREE.Mesh(this.geometry, this.material);
        this.scene.add(this.plane);
        this.plane.rotation.x = -Math.PI/2;
        this.plane.position.y = -0.31;
        this.plane.receiveShadow = true ;
    }

    setCircles() {
        this.geometry = new THREE.CircleGeometry( 5, 64 ); 
        this.material1 = new THREE.MeshStandardMaterial( { color: 0xe5A1AA } ); 
        this.material2 = new THREE.MeshStandardMaterial( { color: 0x7AD0AC } ); 
        this.material3 = new THREE.MeshStandardMaterial( { color: 0x8395CD } );
        this.material3 = new THREE.MeshStandardMaterial( { color: 0x8395CD } );
        this.material4 = new THREE.MeshStandardMaterial( { color: 0xF7F0E1 } );

        this.circleFirst = new THREE.Mesh( this.geometry, this.material1 );
        this.circleSecond = new THREE.Mesh( this.geometry, this.material2 ); 
        this.circleThird = new THREE.Mesh( this.geometry, this.material3 );
        this.circleFourth = new THREE.Mesh( this.geometry, this.material4 );

        this.circleFirst.position.y = -0.3;

        this.circleSecond.position.x = 2; 
        this.circleSecond.position.y = -0.29; 
        this.circleThird.position.y = -0.28;
        this.circleFourth.position.y = -0.27;

        this.circleFirst.scale.set(0,0,0);
        this.circleSecond.scale.set(0,0,0); 
        this.circleThird.scale.set(0,0,0);
        this.circleFourth.scale.set(0,0,0);

        this.circleFirst.rotation.x = -Math.PI/2;
        this.circleSecond.rotation.x = -Math.PI/2;
        this.circleThird.rotation.x = -Math.PI/2;
        this.circleFourth.rotation.x = -Math.PI/2;

        this.circleFirst.receiveShadow = true;
        this.circleSecond.receiveShadow = true;
        this.circleThird.receiveShadow = true;
        this.circleFourth.receiveShadow = true;

        this.scene.add( this.circleFirst );
        this.scene.add( this.circleSecond );
        this.scene.add( this.circleThird );
        this.scene.add( this.circleFourth );
    }

    resize() {
        
    }

    update() {

    }
}