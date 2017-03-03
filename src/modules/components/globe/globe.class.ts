import { GlobeOptions } from './globe.model';
import Scene = THREE.Scene;
import Camera = THREE.PerspectiveCamera;
import PerspectiveCamera = THREE.PerspectiveCamera;
import Renderer = THREE.Renderer;

export class Globe {

    public scene: Scene;
    public camera: PerspectiveCamera;

    private readonly dataURL;
    private rotationSpeed;
    private cloudRotationSpeed;
    private globalIllumination;
    private domClass;
    private dataPolling;
    private renderer: Renderer;

    constructor(options: GlobeOptions) {
        this.rotationSpeed = options.rotationSpeed;
        this.cloudRotationSpeed = options.rotationSpeed;
        this.globalIllumination = options.globalIllumination;
        this.domClass = options.domClass;
        this.dataURL = options.dataURL;
        this.dataPolling = options.dataPolling;
        this.createScene(options);
    }

    // TODO: change height, width to auto
    private createScene (options) {
        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, .1, 10000);
        window.addEventListener('resize', this.handleResize, false);
    }

    private handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}