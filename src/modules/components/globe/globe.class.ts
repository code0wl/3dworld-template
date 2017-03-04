import { GlobeOptions } from './globe.model';
import THREELib from "three-js";

export class Globe {

    public scene: THREELib.scene;
    public THREE: THREELib;
    public camera: THREELib.camera;

    private readonly dataURL;
    private rotationSpeed;
    private cloudRotationSpeed;
    private globalIllumination;
    private domClass;
    private dataPolling;
    private renderer: THREELib.renderer;

    constructor(options: GlobeOptions) {
        this.THREE = THREELib();
        console.log(this.THREE, 'wtf');3
        this.rotationSpeed = options.rotationSpeed;
        this.cloudRotationSpeed = options.rotationSpeed;
        this.globalIllumination = options.globalIllumination;
        this.domClass = options.domClass;
        this.dataURL = options.dataURL;
        this.dataPolling = options.dataPolling;
        this.createScene();
    }

    // TODO: change height, width to auto
    private createScene() {
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