import { Control } from '../control/control.class';
import Vector3 = THREE.Vector3;
export class Camera {

    public camera: THREE.PerspectiveCamera;
    private control: Control;
    public cameraControl: THREE.OrbitControls;

    constructor(width, height, mainScene) {
        this.control = new Control();
        this.camera = new THREE.PerspectiveCamera(25, width / height, .1, 10000);
        this.cameraControl = new THREE.OrbitControls(this.camera);
        this.cameraControl.minDistance = 55;
        this.cameraControl.maxDistance = 80;
        this.setNormalView();
        this.camera.name = 'main-camera';
    }

    public setNormalView(): void {
        this.camera.position.x = 80;
        this.camera.position.y = 36;
        this.camera.position.z = 33;
        this.cameraControl.target = new THREE.Vector3(0, 0, 0);
    }

    public setDetailView(): void {
        this.camera.position.z = 5;
        this.camera.position.y = 10;
        this.cameraControl.target = new THREE.Vector3(6, 5, 25);
    }

}
