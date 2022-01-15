
import * as THREE from 'three';
import { OrbitControls } from 'https://threejs.org/examples/jsm/controls/OrbitControls.js';

import { Water } from 'https://threejs.org/examples/jsm/objects/Water.js';

import { Sky } from 'https://threejs.org/examples/jsm/objects/Sky.js';
import { GLTFLoader } from 'https://threejs.org/examples/jsm/loaders/GLTFLoader.js';



let camera, scene, renderer;
let controls, water, sun;

const loader = new GLTFLoader();

class Seagulls{
    constructor(){
        loader.load("assets/seagulls/scene.gltf",(seaio) =>{
            scene.add(seaio.scene)
            seaio.scene.scale.set(5,5,5)
            seaio.scene.position.set(-100,50,-500)
            this.seagull = seaio.scene
        })
    }
    movement1(){
        if(this.seagull){
            this.seagull.position.x += 1
            this.seagull.position.y += 0.1
            this.seagull.position.z += 0.5
        }
    }
}

const seagull = new Seagulls();

class Islands{
    constructor(){
        loader.load("assets/islands/scene.gltf",(islio) =>{
            scene.add(islio.scene)
            islio.scene.scale.set(0.1,0.1,0.1)
            islio.scene.position.set(2000,0,-1500)
            islio.scene.rotation.y = 1.5
        })
    }
}

const island = new Islands();

class Cloud{
    constructor(){
        loader.load("assets/clouds/scene.gltf",(cloudio) =>{
            scene.add(cloudio.scene)
            cloudio.scene.scale.set(100,100,100)
            cloudio.scene.position.set(-500,600,-1000)
            this.cloud = cloudio.scene
        })
    }  
    movement(){
        if(this.cloud){
            this.cloud.position.x += 0.1
        }
    }
}

const cloud = new Cloud();

class Boat{ 
    constructor(){
        loader.load("assets/boat/scene.gltf",(gltf) =>{
            scene.add(gltf.scene)
            gltf.scene.scale.set(3,3,3)
            gltf.scene.position.set(5,3,30)
            gltf.scene.rotation.y = 3

            this.boat = gltf.scene
            this.speed = {
                vel: 0,
                rot: 0.0
            }
        })
    }

    stop(){
        this.speed.vel = 0
        this.speed.rot = 0
    }

    update(){
        if(this.boat){
           this.boat.rotation.y += this.speed.rot
           this.boat.translateZ(this.speed.vel)
        }
    }
}

const boat = new Boat()

init();
animate();

function init() {



    renderer = new THREE.WebGLRenderer();
    renderer.setPixelRatio( window.devicePixelRatio );
    renderer.setSize( window.innerWidth, window.innerHeight );
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    document.body.appendChild( renderer.domElement );

    //

    scene = new THREE.Scene();

    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 1, 20000 );
    camera.position.set( 30, 30, 200 );
    

    //

    sun = new THREE.Vector3();

    // Water

    const waterGeometry = new THREE.PlaneGeometry( 10000, 10000 );

    water = new Water(
        waterGeometry,
        {
            textureWidth: 512,
            textureHeight: 512,
            waterNormals: new THREE.TextureLoader().load( 'assets/waternormals.jpg', function ( texture ) {

                texture.wrapS = texture.wrapT = THREE.RepeatWrapping;

            } ),
            sunDirection: new THREE.Vector3(),
            sunColor: 0xe35610,
            waterColor: 0x103f91,
            distortionScale: 3.7,
            fog: scene.fog !== undefined
        }
    );

    water.rotation.x = - Math.PI / 2;

    scene.add( water );

    // Skybox

    const sky = new Sky();
    sky.scale.setScalar( 10000 );
    scene.add( sky );

    const skyUniforms = sky.material.uniforms;

    skyUniforms[ 'turbidity' ].value = 10;
    skyUniforms[ 'rayleigh' ].value = 2;
    skyUniforms[ 'mieCoefficient' ].value = 0.005;
    skyUniforms[ 'mieDirectionalG' ].value = 0.8;

    const parameters = {
        elevation: 2,
        azimuth: 180
    };

    const pmremGenerator = new THREE.PMREMGenerator( renderer );

    function updateSun() {

        const phi = THREE.MathUtils.degToRad( 90 - parameters.elevation );
        const theta = THREE.MathUtils.degToRad( parameters.azimuth );

        sun.setFromSphericalCoords( 1, phi, theta );

        sky.material.uniforms[ 'sunPosition' ].value.copy( sun );
        water.material.uniforms[ 'sunDirection' ].value.copy( sun ).normalize();

        scene.environment = pmremGenerator.fromScene( sky ).texture;

    }

    updateSun();

    controls = new OrbitControls( camera, renderer.domElement );
    controls.maxPolarAngle = Math.PI * 0.495;
    controls.target.set( 0, 50, 0 );
    controls.minDistance = 40.0;
    controls.maxDistance = 500.0;
    controls.update();

    const waterUniforms = water.material.uniforms;

    window.addEventListener( 'resize', onWindowResize );

    window.addEventListener( 'keydown', function(e){
        if(e.key == "ArrowUp"){
            boat.speed.vel = 0.5
        }
        if(e.key == "ArrowDown"){
            boat.speed.vel = -0.5
        }
        if(e.key == "ArrowRight"){
            boat.speed.rot = -0.01
        }
        if(e.key == "ArrowLeft"){
            boat.speed.rot = 0.01
        }
    });
   
    window.addEventListener( 'keyup', function(e){
        boat.stop()
    });
    
}

const listener = new THREE.AudioListener();
camera.add( listener );

// create a global audio source
const sound = new THREE.Audio( listener );

// load a sound and set it as the Audio object's buffer
const audioLoader = new THREE.AudioLoader();
audioLoader.load( 'assets/audio/Pirates Theme.ogg', function( buffer ) {
	sound.setBuffer( buffer );
	sound.setLoop( true );
	sound.setVolume( 0.5 );
	sound.play();
});


function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize( window.innerWidth, window.innerHeight );

}

function animate() {
    
    requestAnimationFrame( animate );
    render();
    cloud.movement();
    boat.update();
    seagull.movement1();
}

function render() {
    water.material.uniforms[ 'time' ].value += 0.5 / 60.0;

    renderer.render( scene, camera );

}