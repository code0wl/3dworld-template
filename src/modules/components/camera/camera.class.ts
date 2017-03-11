export class Camera {

    public camera: THREE.Camera;
    public cameraControl: THREE.OrbitControls;
    public cameraBG: THREE.OrthographicCamera;

    constructor(width, height) {
        this.camera = new THREE.PerspectiveCamera(25, width / height, .1, 10000);
        this.camera.position.x = 80;
        this.camera.position.y = 30;
        this.camera.position.z = 1;

        this.cameraControl = new THREE.OrbitControls(this.camera);
        this.cameraControl.minDistance = 55;
        this.cameraControl.maxDistance = 80;
        this.camera.name = 'main-camera';
    }
}
