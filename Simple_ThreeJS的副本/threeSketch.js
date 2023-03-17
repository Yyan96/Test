import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


let scene, camera, renderer, controls;
let gui, stats; // helpers
let cube, light, pointLight, material;

init();
animate();

function init() {

    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    renderer = new THREE.WebGLRenderer();
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.getElementById("sketch-container").appendChild( renderer.domElement );

    //camera interaction controls
    controls = new OrbitControls( camera, renderer.domElement );
    
    //controls.update() must be called after any manual changes to the camera's transform
    camera.position.set( 0, 3, 3 );
    controls.update();

    //set up our scene
    light = new THREE.AmbientLight( 0xfffafe ); // soft white light
    scene.add( light );
    pointLight = new THREE.PointLight( 0xfffafe, 1, 100 );
    pointLight.position.set( 10, 10, 10 );
    scene.add( pointLight );
    
    const geometry = new THREE.BoxGeometry( 1, 1, 1 );
    
    const diffuseColor = new THREE.Color("rgb(255, 0, 255)");
    material = new THREE.MeshPhysicalMaterial( {
        color: diffuseColor,
        metalness: 0.8,
        roughness: 0.5,
        reflectivity: 0.5
    } );
    
    // material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );//cheaper basic material
    cube = new THREE.Mesh( geometry, material );
    
    scene.add( cube );

     //quick GUI
     gui = new dat.GUI({name: 'My GUI'});
     const mat = gui.addFolder('Material')
     mat.add(material.color, 'r', 0, 1);
     mat.add(material.color, 'g', 0, 1);
     mat.add(material.color, 'b', 0, 1);
     mat.add(material,'metalness',0,1);
     mat.add(material, 'roughness', 0, 1);
     mat.add(material, 'reflectivity', 0, 1); 

     //For frame rate
     stats = Stats()
     stats.showPanel( 0 ); // 0: fps, 1: ms, 2: mb, 3+: custom
     document.body.appendChild(stats.dom)
    

    //https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener
    //https://www.w3schools.com/js/js_htmldom_eventlistener.asp
    //https://www.w3schools.com/js/js_htmldom_events.asp
    window.addEventListener('resize', onWindowResize );
    window.addEventListener('keydown', onKeyDown ); 
}

function animate() {
    renderer.setAnimationLoop( render );
}

function render() {

    stats.begin();

    //simple animation
    cube.rotation.x += 0.01;
    cube.rotation.y += 0.01;

	stats.end();
   
    // required if controls.enableDamping or controls.autoRotate are set to true
	//controls.update();

    renderer.render( scene, camera );
}

function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

}

function onKeyDown(event) {

    // console.log(event.key);//https://developer.mozilla.org/en-US/docs/Web/API/Element/keydown_event
    if (event.key === "d") {
        dat.GUI.toggleHide();//show / hide for performance mode
    }

    console.log(stats);
};


