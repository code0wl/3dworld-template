import { World } from './modules/components/world/world.class';
import { worldOptions } from './config';

const earth = new World(worldOptions);

//@start init
earth.initialise();
render();

earth.scene.add(this.world.scene.background)
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
