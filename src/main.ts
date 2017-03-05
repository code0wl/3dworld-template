import { World } from './modules/components/world/world.class';
import { WorldOptions } from './modules/components/world/world.model';

const worldOptions: WorldOptions = {
    spinSpeed: 0.0001,
    cloudsSpinSpeed: 0.0002,
    globalLighting: 0x222222,
    domNode: `<div class="data-countries"></div>`,
    dataURL: 'static/js/data/data.json',
    pollingInterval: 30000,
    data_size_height: 4,
    name: 'earth',
    data_size_width: 4,
    width: window.innerWidth,
    benchmark: true,
    height: window.innerHeight
};

const earth = new World(worldOptions);

// three.js scene


//@start init
function moduleInit() {

    const clock = new THREE.Clock();
    earth.camera.camera.lookAt(earth.scene.position);

    // world
    earth.scene.add(earth.sphere);

    //lights
    earth.scene.add(earth.layer.earthLights());

    // now add some better lighting
    earth.scene.add(earth.lighting.ambientLight(earth));

    // add sunlight
    earth.scene.add(earth.lighting.directionalLight());

    document.querySelector('.country-list').innerHTML = earth.properties.domNode;

    // add these passes to the composer

    earth.composer.render();
    render();

}

//@start render loop
function render() {
    const obj = earth.scene.getChildByName('overlay') as any;
    obj.material.map.needsUpdate = true;
    earth.camera.cameraControl.update();

    earth.sphere.rotation.y += earth.properties.spinSpeed;
    earth.layer.earthLightsMesh.rotation.y += earth.properties.spinSpeed;
    earth.scene.getObjectByName('overlay').rotation.y += earth.properties.spinSpeed;

    requestAnimationFrame(render);
    earth.composer.renderer.render(earth.scene, earth.camera.camera);
    earth.camera.camera.lookAt(earth.scene.position);

    earth.benchmark.stats.update();
    document.body.appendChild(earth.composer.renderer.domElement);
    earth.composer.renderer.autoClear = false;
    earth.composer.render();
    earth.clouds.cloudMesh.rotation.y += earth.properties.cloudsSpinSpeed;

}
//@end render loop


//render when window is ready
moduleInit();

