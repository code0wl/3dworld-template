export class Camera {

    public camera: THREE.PerspectiveCamera;
    public cameraControl: THREE.OrbitControls;

    constructor(width, height) {
        this.camera = new THREE.PerspectiveCamera(25, width / height, .1, 10000);

        this.cameraControl = new THREE.OrbitControls(this.camera);

        this.setNormalView();
        this.camera.name = 'main-camera';
    }

    set cameraControls(state: boolean) {
        this.cameraControl.enabled = state;
    }

    public setNormalView(): void {
        this.camera.position.x = 4;
        this.camera.position.y = 28;
        this.camera.position.z = 70;

        this.cameraControl.autoRotate = true;
        this.cameraControl.autoRotateSpeed = .2;
    }

    public setDetailView(coors: Array<number>): void {
        this.camera.position.x = coors[0];
        this.camera.position.y = coors[1];
        this.camera.position.z = 25;

        this.cameraControl.autoRotate = false;
    }

    private panCamera(coordinates) {
        const rotateStart = new THREE.Vector2();
        const rotateEnd = new THREE.Vector2();
        const rotateDelta = new THREE.Vector2();
        const panStart = new THREE.Vector3();
        const panDelta = new THREE.Vector3();
        const phiDelta = 0;
        const thetaDelta = 0;
        const lastPosition = new THREE.Vector3();
    }

}
