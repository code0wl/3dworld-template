import { GlobeOptions } from './globe.model';
import * as THREE from "three-js"; // return THREE JS

export class Globe {

    public scene: THREE.scene;
    public THREE: THREE;
    public camera: THREE.camera;

    private readonly dataURL;
    private rotationSpeed;
    private cloudRotationSpeed;
    private globalIllumination;
    private domClass;
    private dataPolling;
    private renderer: THREE.renderer;

    constructor(options: GlobeOptions) {
        this.THREE = THREE();
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
        this.scene = new this.THREE.Scene();
        this.camera = new this.THREE.PerspectiveCamera(25, window.innerWidth / window.innerHeight, .1, 10000);
        window.addEventListener('resize', this.handleResize, false);
    }

    private handleResize() {
        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }

}