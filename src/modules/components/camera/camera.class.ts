export class Camera {

    public camera: THREE.PerspectiveCamera;
    public cameraControl: THREE.OrbitControls;

    constructor(width, height) {
        this.camera = new THREE.PerspectiveCamera(25, width / height, .1, 10000);
        this.cameraControl = new THREE.OrbitControls(this.camera);
        this.cameraControl.minDistance = 55;
        this.cameraControl.maxDistance = 80;
        this.setNormalView([80, 36, 33]);
        this.camera.name = 'main-camera';
    }

    set cameraControls(state: boolean) {
        this.cameraControl.enabled = state;
    }

    public setNormalView(coors: Array<number>): void {
        this.camera.position.x = coors[0];
        this.camera.position.y = coors[1];
        this.camera.position.z = coors[2];
        this.cameraControl.target = new THREE.Vector3(0, 0, 0);
        this.cameraControl.rotateLeft(0);
    }

    public setDetailView(coors: Array<number>): void {
        this.camera.position.y = coors[0];
        this.camera.position.z = coors[1];
        this.cameraControl.target = new THREE.Vector3(0, 0, 0);
        this.cameraControl.rotateLeft(-7.5);
    }

}
