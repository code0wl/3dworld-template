import { WorldOptions } from './world.model';
import { Lighting } from '../lighting/lighting.class';
import { Composer } from '../shaders/composer.class';
import { Camera } from '../camera/camera.class';
import { UI } from '../ui/ui.class';
import { Cloud } from '../cloud/clouds';
import { LocationService } from '../location/location.class';
import { WorldTexture } from '../texture/texture';
import { TweenLite } from 'gsap';

export class World {
    public raycaster: THREE.Raycaster;
    public camera: Camera;
    public scene: THREE.Scene;
    public composer: Composer;
    public sphere: THREE.Mesh;
    public properties: WorldOptions;

    private locations: LocationService;
    private ui: UI;
    private intersected: any;
    private lighting: Lighting;
    private cloud: Cloud;
    private mouse: any;
    private texture: WorldTexture;
    private globe: any;
    private projector: THREE.Projector;
    private hasClicked: boolean = false;

    // extract to control class
    private velocityX: number = 0;
    private velocityY: number = 0;
    private friction: number = 0.07;

    constructor(options: WorldOptions) {
        this.properties = options;
        this.composer = new Composer();
        this.lighting = new Lighting();
        this.raycaster = new THREE.Raycaster();
        this.scene = new THREE.Scene();
        this.camera = new Camera(options.width, options.height);
        this.intersected = false;
        this.projector = new THREE.Projector();
        this.mouse = new THREE.Vector2();
        this.ui = new UI(this);
        this.globeGenerate();
    }

    public init(): void {
        this.scene.add(this.sphere);
        this.scene.add(this.lighting.ambientLight());
        this.scene.add(this.lighting.directionalLight());
        this.camera.cameraControl.dampingFactor = 100;
        this.camera.cameraControl.zoomSpeed = .1;

        document.addEventListener('mouseup', this.onDocumentMouseMove.bind(this), false);
        document.addEventListener('mousedown', this.onDocumentClicked.bind(this), false);

        this.render();
    }

    private onDocumentClicked(event) {
        event.preventDefault();
        this.hasClicked = true;

        setTimeout(() => {
            this.hasClicked = !this.hasClicked;
        }, 500);
    }

    private onDocumentMouseMove(event) {
        event.preventDefault();
        this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }

    private globeGenerate() {

        const earthDiffTexture = new THREE.MeshPhongMaterial({
            emissive: new THREE.TextureLoader().load('../../../../static/globe/PlanetEarth_EMISSION.jpg'),
            shininess: 5,
            reflectivity: 0.2,
            envMap: new THREE.TextureLoader().load('../../../../static/globe/PlanetEarth_REFLECTION.jpg'),
            bumpMap: new THREE.TextureLoader().load('../../../../static/globe/PlanetEarth_BUMP.jpg'),
            map: new THREE.TextureLoader().load('../../../../static/globe/PlanetEarth_DIFFUSE.jpg'),
            bumpScale: 0.3,
        } as any);

        const loadingManager = new THREE.LoadingManager(() => {
            this.scene.add(this.globe);
        });

        const loader: THREE.ColladaLoader = new THREE.ColladaLoader(loadingManager);

        loader.load('../../../../static/globe/Earth.dae', (collada) => {

            collada.scene.traverse(function (node) {
                if (node.isMesh) {
                    node.material = earthDiffTexture;
                    Object.assign(node.scale, { x: 15, y: 15, z: 15 });
                }
            });

            this.globe = collada.scene;

            this.locations = new LocationService(this.properties.container, this.globe, this.options.circumference);

            this.scene.add(this.globe);

            this.locations.visualize();

        });

    }

    // extract to UI class
    private zoomIn(coordinates) {
        this.camera.setDetailView(coordinates);
        this.ui.showUI = true;
    }

    public zoomOut() {
        this.camera.setNormalView();
        this.ui.showUI = false;
        this.intersected = null;
    }

    private checkIntersections() {

        this.raycaster.setFromCamera(this.mouse, this.camera.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0 && this.hasClicked) {

            const object = intersects[0].object;

            if (this.intersected != object && object.name === 'location' && !this.ui.showUI) {

                this.zoomIn(object.position);

                this.ui.showDetailedUI(object[0]);
            }

        } else {

            if (this.intersected) {
                this.intersected.material.emissive.setHex(this.intersected.currentHex);
                this.zoomOut();
            }

        }
    }

    private render(): void {
        this.camera.camera.updateProjectionMatrix();        
        this.camera.cameraControl.update();
        
        document.querySelector('main.world').appendChild(this.composer.renderer.domElement);
        this.composer.renderer.autoClear = false;
        this.composer.renderer.render(this.scene, this.camera.camera);

        this.checkIntersections();

        requestAnimationFrame(this.render.bind(this));
    }

}
