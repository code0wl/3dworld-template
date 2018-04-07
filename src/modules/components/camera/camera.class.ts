export class Camera {

    public camera: THREE.PerspectiveCamera;
    public cameraControl: THREE.OrbitControls;

    constructor(width, height) {
        this.camera = new THREE.PerspectiveCamera(25, width / height, .1, 10000);
        this.cameraControl = new THREE.OrbitControls(this.camera);
        this.cameraControl.minDistance = 55;
        this.cameraControl.maxDistance = 80;
        this.setNormalView();
        this.camera.name = 'main-camera';
    }

    set cameraControls(state: boolean) {
        this.cameraControl.enabled = state;
    }

    public setNormalView(): void {
        this.camera.position.x = 4;
        this.camera.position.y = 28;
        this.camera.position.z = 47;

        this.animateToPosition(0, this.camera.position.x);
    }

    public setDetailView(coors: Array<number>): void {
        this.camera.position.y = coors[0];
        this.camera.position.z = coors[1];
        this.cameraControl.rotateLeft(-7.5);
    }

    private animateToPosition(start, end) {
        do {

            console.log(start);

            if (start >= end) {
                start -= .0001;
            }

            start += .0001;

            this.camera.position.x = start;

        } while (start !== end);
    }

}
