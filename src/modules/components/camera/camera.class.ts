import { TweenLite, Circ } from 'gsap';

export class Camera {

    public camera: THREE.PerspectiveCamera;
    public cameraControl: any;
    public timeline: TweenLite;

    constructor(width, height) {
        this.camera = new THREE.PerspectiveCamera(25, width / height, .1, 10000);
        this.camera.name = 'main-camera';

        this.cameraControl = new THREE.OrbitControls(this.camera);
        
        this.cameraControl.enableKeys = false;

        this.setNormalView();
    }

    set cameraControls(state: boolean) {

        this.cameraControl.enabled = state;

    }

    public setNormalView(): void {

        this.camera.position.set(0, 0, 80);
        this.cameraControl.target = new THREE.Vector3(0, 0, 0);
        this.zoom = { level: 5, end: 1 };
        this.cameraControl.noRotate = false;

    }

    public setDetailView({ x, y, z }): void {

        this.cameraControl.target = new THREE.Vector3(x, y, z);
        this.cameraControl.noRotate = true;
        this.zoom = { level: 1, end: 10 };

    }

    private set zoom({ level, end }) {
        const zoom = { level };

        this.timeline = TweenLite.to(zoom, 1, { level: end, onUpdate: updateZoom.bind(this), ease: Circ.easeOut, })

        function updateZoom() {

            this.camera.zoom = zoom.level;

        }

    }

}
