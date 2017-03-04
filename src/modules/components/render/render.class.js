"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var RenderLoop = (function () {
    function RenderLoop() {
        scene.getObjectByName('overlay').material.map.needsUpdate = true;
        cameraControl.update();
        cloudMesh.rotation.y += defaults.clouds_spin_speed;
        sphere.rotation.y += defaults.earth_spin_speed;
        cityLights.rotation.y += defaults.earth_spin_speed;
        scene.getObjectByName('overlay').rotation.y += defaults.earth_spin_speed;
        requestAnimationFrame(render);
        renderer.render(scene, camera);
        camera.lookAt(scene.position);
        stats.update();
        renderer.autoClear = false;
        composer.render();
    }
    return RenderLoop;
}());
exports.RenderLoop = RenderLoop;
//# sourceMappingURL=render.class.js.map