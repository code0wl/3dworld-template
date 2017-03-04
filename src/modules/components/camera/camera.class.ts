export class Camera {

    public camera: THREE.Camera;

    constructor(width, height) {
        this.camera = new THREE.PerspectiveCamera(25, width / height, .1, 10000);
    }

}