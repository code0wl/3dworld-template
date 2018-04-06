import { WorldOptions } from './world.model';
import { Lighting } from '../lighting/lighting.class';
import { Composer } from '../shaders/composer.class';
import { Camera } from '../camera/camera.class';
import { UI } from '../ui/ui.class';
import { Cloud } from '../cloud/clouds';
import { LocationService } from '../location/location.class';
import { WorldTexture } from '../texture/texture';

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
    private globe: THREE.SphereGeometry;
    private projector: THREE.Projector;
    private hasClicked: boolean = false;

    constructor(options: WorldOptions) {
        this.properties = options;
        this.composer = new Composer();
        this.lighting = new Lighting();
        this.raycaster = new THREE.Raycaster();
        this.scene = new THREE.Scene();
        this.cloud = new Cloud();
        this.camera = new Camera(options.width, options.height);
        this.ui = new UI();
        this.intersected = false;
        this.create(options);
        this.projector = new THREE.Projector();
        this.mouse = new THREE.Vector2();
        this.locations = new LocationService(this.scene, options.circumference);
        this.mode(options.mode);
    }

    public init(): void {
        this.scene.add(this.sphere);
        this.scene.add(this.lighting.ambientLight());
        this.setWorldOrientation(this.properties.startRotation);
        this.camera.cameraControl.dampingFactor = 100;
        this.camera.cameraControl.zoomSpeed = .1;
        this.render();
        document.addEventListener('mousemove', this.onDocumentMouseMove.bind(this), false);
        document.addEventListener('mousedown', this.onDocumentClicked.bind(this), false);
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

    private mode(mode) {
        if (mode.flight) {
            this.locations.visualize();
        }
    }

    private setWorldOrientation(rotation) {
        this.sphere.rotation.y = rotation;
    }

    private create(options): void {
        const texture = new WorldTexture();
        this.sphere = new THREE.Mesh(this.globeGenerate(), texture.applyTexture('../../../static/images/planets/black10k.jpg'));
        this.sphere.name = options.name;
        this.sphere.add(this.cloud.cloudTexture());
    }

    private globeGenerate(): THREE.SphereGeometry {
        this.globe = new THREE.SphereGeometry(15, 32, 32);
        return this.globe;
    }

    // extract to UI class
    private zoomIn(coordinates) {
        this.camera.setDetailView(coordinates); // make dynamic
        this.ui.showUI = true;
        this.camera.cameraControls = false;
    }

    private zoomOut(coordinates) {
        this.camera.setNormalView(coordinates); // make dynamic
        this.ui.showUI = false;
        this.camera.cameraControls = true;
    }

    private checkIntersections() {

        this.raycaster.setFromCamera(this.mouse, this.camera.camera);

        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0 && this.hasClicked) {

            const object = intersects[0].object;

            if (this.intersected != object && object.name === 'location') {

                if (!this.ui.showUI) {
                    
                    console.log(object);
                    this.zoomIn([10, 40, 25]); // todo get coors

                }

                this.ui.showDetailedUI(object[0]);
            }

        } else {

            if (this.intersected) {

                this.intersected.material.emissive.setHex(this.intersected.currentHex);

            }

            this.intersected = null;

        }
    }

    private render(): void {

        this.camera.cameraControl.update();

        this.cloud.cloudMesh.rotation.y += this.properties.cloudsSpinSpeed;

        document.body.appendChild(this.composer.renderer.domElement);
        this.composer.renderer.autoClear = false;
        this.composer.renderer.render(this.scene, this.camera.camera);

        this.checkIntersections()

        requestAnimationFrame(this.render.bind(this));
    }

}
