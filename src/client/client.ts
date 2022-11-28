import * as THREE from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { VRButton } from 'three/examples/jsm/webxr/VRButton';
import ExampleBox from './src/exampleBox';
import { MapControls, OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { createText } from 'three/examples/jsm/webxr/Text2D.js';
import { BoxLineGeometry } from 'three/examples/jsm/geometries/BoxLineGeometry.js';

let camera: THREE.PerspectiveCamera;
let scene: THREE.Scene;
let renderer: THREE.WebGLRenderer;
let stats: Stats;
let cube1: ExampleBox;
let cube2: ExampleBox;
let cube3: ExampleBox;
let controls: OrbitControls;

init();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color( 0x202020 );

    //Setup Camera
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.z = 2;

    //Setup Render
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.xr.enabled = true;

    document.body.appendChild(renderer.domElement);
    document.body.appendChild(VRButton.createButton(renderer));

    //Setup Stats
    stats = Stats();
    document.body.appendChild(stats.dom);

    //Example Content
    const light = new THREE.PointLight(0xffffff, 1);
    light.position.set(0, 5, 10);
    scene.add(light);

    //Setup some text
    const text = createText( 'v0.0.1', 0.08 );
    text.position.set( 0, 1.9, - 1.0 );
    scene.add( text );

    //Grid Room Helper
	const room = new THREE.LineSegments(
		new BoxLineGeometry( 6, 6, 6, 10, 10, 10 ).translate( 0, 0, 0 ),
		new THREE.LineBasicMaterial( { color: 0x808080 } )
	);
	scene.add( room );

    //Grid Floor Helper
    /*
    const size = 40;
    const divisions = 100;
    const gridHelper = new THREE.GridHelper( size, divisions );
    scene.add( gridHelper );
    */

    //Setup controls
    controls = new OrbitControls(camera, renderer.domElement);

    setupCubes();
    window.addEventListener('resize', onWindowResize, false);

    renderer.setAnimationLoop(update);
}

function update() {

    stats.update();

    controls.update();
    cube1.update();
    cube2.update();
    cube3.update();

    renderer.render(scene, camera);
}

function setupCubes() {

    cube1 = new ExampleBox(scene, new THREE.Color("rgb(255, 0, 0)"), new THREE.Vector3(-2, 1, -2));
    scene.add(cube1.getbox());

    cube2 = new ExampleBox(scene, new THREE.Color("rgb(0, 255, 0)"), new THREE.Vector3(0, 1, -2));
    scene.add(cube2.getbox());

    cube3 = new ExampleBox(scene, new THREE.Color("rgb(0, 0, 255)"), new THREE.Vector3(2, 1, -2));
    scene.add(cube3.getbox());
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}