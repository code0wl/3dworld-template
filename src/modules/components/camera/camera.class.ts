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
        this.camera.zoom = 1;
        this.camera.updateProjectionMatrix();
        this.cameraControl.target = new THREE.Vector3(0, 0, 0);

        this.cameraControl.autoRotate = true;
        this.cameraControl.autoRotateSpeed = .2;
        this.cameraControl.noRotate = false;
    }

    public setDetailView({ x, y, z }): void {
        this.cameraControl.target = new THREE.Vector3(x, y, z);
        this.camera.zoom = 10;
        this.camera.updateProjectionMatrix();
        this.cameraControl.autoRotate = false;
        this.cameraControl.noRotate = true;
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
