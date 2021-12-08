import * as THREE from 'https://cdn.skypack.dev/three';
import {GLTFLoader}  from "https://cdn.skypack.dev/three/examples/jsm/loaders/GLTFLoader.js";

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth/window.innerHeight,
    0.1,
    1000
    );

camera.position.set(7,7,7)
camera.lookAt(0,2,0)

var canvas = document.querySelector('canvas');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(window.innerWidth, window.innerHeight); 

var point = new THREE.PointLight(0xFFFFFF)
point.position.set(10,10,10)
point.lookAt(0,2,0)
scene.add(point)

var color = new THREE.MeshLambertMaterial({color : 0xB4C3ED})

var x = 0
var y = 0

document.addEventListener('mousemove', (event)=>{
    x = ((event.clientX - window.innerWidth/2)/window.innerWidth)
    y = ((event.clientY - window.innerHeight/2)/window.innerHeight)

})
var model
const loader = new GLTFLoader();
loader.load ('finalroom2.glb' , function(gltf){
    model = gltf.scene;
    model.traverse((o) =>{
        if (o.isMesh){
            o.material = color
        }
    });
    scene.add(gltf.scene);
}, undefined, function(error) {
        console.error(error);
});
scene.background = new THREE.Color(0x83A1CD)
var render = function(){
    requestAnimationFrame(render)
    renderer.render(scene,camera)
    model.rotation.y = x
    camera.position.y = 7-y
}
render()