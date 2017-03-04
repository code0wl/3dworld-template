import { World } from './modules/components/world/world.class';
import { WorldOptions } from './modules/components/world/world.model';

const worldOptions: WorldOptions = {
    spinSpeed: 0.0003,
    cloudsSpinSpeed: 0.0004,
    globalLighting: 0x222222,
    domNode: `<div class="data-countries"></div>`,
    dataURL: 'static/js/data/data.json',
    pollingInterval: 30000,
    data_size_height: 4,
    data_size_width: 4,
    width: window.innerWidth,
    benchmark: true,
    height: window.innerHeight
};

const earth = new World(worldOptions);

// three.js scene
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, .1, 10000);

//globals
var cameraControl,
    composer,
    sceneBG, cameraBG,
    latLongToVector3,
    renderer,
    clock;

//@start init
function moduleInit() {

    clock = new THREE.Clock();

    // camera position
    camera.position.x = 80;
    camera.position.y = 30;
    camera.position.z = 1;
    camera.name = 'main-camera';
    camera.lookAt(scene.position);

    // controls (using orbit library)
    cameraControl = new THREE.OrbitControls(camera);
    cameraControl.minDistance = 55;
    cameraControl.maxDistance = 80;

    // size hack FIX ME
    renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(0x000000, 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMapEnabled = true;

    // world
    scene.add(earth.sphere);

    // create overlay
    var overlayGeometry = new THREE.SphereGeometry(15.1, 32, 32);
    var overlayMesh = new THREE.Mesh(overlayGeometry, earth.layer.createOverlayMaterial());
    overlayMesh.name = 'overlay';
    scene.add(overlayMesh);

    //lights
    scene.add(earth.layer.earthLights());

    // now add some better lighting
    scene.add(earth.lighting.ambientLight(earth));

    // add sunlight
    scene.add(earth.lighting.directionalLight());

    // add background
    cameraBG = new THREE.OrthographicCamera(-window.innerWidth, window.innerWidth, window.innerHeight, -window.innerHeight, -10000, 10000);
    cameraBG.position.z = 50;
    sceneBG = new THREE.Scene();

    var materialColor = new THREE.MeshBasicMaterial({
        map: THREE.ImageUtils.loadTexture("static/images/space.jpg"),
        depthTest: false
    });

    var bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
    bgPlane.position.z = -100;
    bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);
    sceneBG.add(bgPlane);

    document.querySelector('.country-list').innerHTML = earth.properties.domNode;

    // add these passes to the composer
    document.body.appendChild(renderer.domElement);
    composerRender();
    render();

}


//@start convert data to 3d
latLongToVector3 = function (lat, lon, radius, heigth) {
    var phi = (lat) * Math.PI / 180;
    var theta = (lon - 180) * Math.PI / 180;

    var x = -(radius + heigth) * Math.cos(phi) * Math.cos(theta);
    var y = (radius + heigth) * Math.sin(phi);
    var z = (radius + heigth) * Math.cos(phi) * Math.sin(theta);

    return new THREE.Vector3(x, y, z);
};
//@end convert data to 3d

//@start composer
function composerRender() {
    var bgPass = new THREE.RenderPass(sceneBG, cameraBG);
    var renderPass = new THREE.RenderPass(scene, camera);
    var effectCopy = new THREE.ShaderPass(THREE.CopyShader);

    renderPass.clear = false;
    effectCopy.renderToScreen = true;
    composer = new THREE.EffectComposer(renderer);
    composer.addPass(bgPass);
    composer.addPass(renderPass);
    composer.addPass(effectCopy);
    return composer;
}
//@end composer

//@start render loop
function render() {

    scene.getObjectByName('overlay').material.map.needsUpdate = true;
    cameraControl.update();

    earth.sphere.rotation.y += earth.properties.spinSpeed;
    earth.layer.earthLightsMesh.rotation.y += earth.properties.spinSpeed;
    scene.getObjectByName('overlay').rotation.y += earth.properties.spinSpeed;

    requestAnimationFrame(render);
    renderer.render(scene, camera);
    camera.lookAt(scene.position);

    earth.benchmark.stats.update();

    renderer.autoClear = false;
    composer.render();
}

//@end render loop

//@start handleResize
function handleResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

//@end handleResize

//render when window is ready
moduleInit();
window.addEventListener('resize', handleResize, false);

