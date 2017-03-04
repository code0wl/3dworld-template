"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Camera = (function () {
    function Camera(width, height) {
        this.camera = new THREE.PerspectiveCamera(25, width / height, .1, 10000);
    }
    return Camera;
}());
exports.Camera = Camera;
//# sourceMappingURL=camera.class.js.map