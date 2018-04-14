import { TweenLite, Circ } from 'gsap';

export class Camera {

    public camera: THREE.PerspectiveCamera;
    public cameraControl: any;
    public timeline: any;

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
        this.zoom = { level: 5, end: 1 };

        this.cameraControl.target = new THREE.Vector3(0, 0, 0);

        this.cameraControl.autoRotateSpeed = .2;
        this.cameraControl.noRotate = false;
    }

    public setDetailView({ x, y, z }): void {
        this.cameraControl.target = new THREE.Vector3(x, y, z);
        this.zoom = { level: 1, end: 10 };
        this.cameraControl.noRotate = true;
    }

    private set zoom({ level, end }) {
        const zoom = { level }

        this.timeline = TweenLite.to(zoom, 1, { level: end, onUpdate: updateZoom.bind(this), ease: Circ.easeOut, })

        function updateZoom() {
            this.camera.zoom = zoom.level;
        }
    }

}
