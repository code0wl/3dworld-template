import { WorldOptions } from './world.model';
import { Lighting } from '../lighting/lighting.class';
import { Benchmark } from '../benchmark/benchmark.class';
import { Composer } from '../shaders/composer.class';
import { Camera } from '../camera/camera.class';
import { UI } from '../ui/ui.class';
import { SideBar } from '../sidebar/sidebar';
import { Cloud } from '../cloud/clouds';
import { LocationService } from '../location/location.class';

export class World {
    public raycaster: THREE.Raycaster;
    public camera: Camera;
    public scene: THREE.Scene;
    public benchmark: any;
    public composer: Composer;
    public sphere: THREE.Mesh;
    public properties: WorldOptions;

    private arcs: LocationService;
    private ui: UI;
    private intersected: any;
    private lighting: Lighting;
    private cloud: Cloud;
    private mouse: any;
    private globe: THREE.SphereGeometry;

    constructor(options: WorldOptions) {
        new SideBar('some content');
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
        this.mouse = new THREE.Vector2();
        this.arcs = new LocationService(this.scene, options.circumference);
        this.hasBenchmark(options.benchmark);
        this.mode(options.mode);
    }

    public init(): void {
        this.scene.add(this.sphere);
        this.scene.add(this.lighting.ambientLight());
        this.setWorldOrientation(this.properties.startRotation);
        this.camera.cameraControl.dampingFactor = 100;
        this.camera.cameraControl.zoomSpeed = .1;
        this.render();
        this.detailsMode();
    }

    private mode(mode) {
        if (mode.flight) {
            this.arcs.visualize();
        }
    }

    private detailsMode(): void {
        window.addEventListener('keydown', (e) => {
            if (e.keyCode === 68) {
                this.camera.setDetailView([10, 40, 25]);
                this.ui.showUI = true;
                this.camera.cameraControls = false;
            } else if (e.keyCode === 78) {
                this.camera.setNormalView([80, 36, 33]);
                this.ui.showUI = false;
                this.camera.cameraControls = true;
            }
            this.ui.showDetailedUI();
        });
    }

    private setWorldOrientation(rotation) {
        this.sphere.rotation.y = rotation;
    }

    private create(options): void {
        this.sphere = new THREE.Mesh(this.globeGenerate(), this.decoratePlanet());
        this.sphere.name = options.name;
        this.sphere.add(this.cloud.cloudTexture());
    }

    private hasBenchmark(benchmark): void {
        if (benchmark) {
            this.benchmark = new Benchmark();
        }
    }

    private decoratePlanet(): THREE.MeshPhongMaterial {
        return new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('../../../static/images/planets/black10k.jpg'),
        } as THREE.MeshBasicMaterialParameters);
    }

    private globeGenerate(): THREE.SphereGeometry {
        this.globe = new THREE.SphereGeometry(15, 32, 32);
        return this.globe;
    }

    private render(): void {

        this.benchmark.stats.update();
        this.camera.cameraControl.update();

        this.cloud.cloudMesh.rotation.y += this.properties.cloudsSpinSpeed;

        document.body.appendChild(this.composer.renderer.domElement);
        this.composer.renderer.autoClear = false;
        this.composer.renderer.render(this.scene, this.camera.camera);

        this.raycaster.setFromCamera(this.mouse, this.camera.camera);
        const intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {
            console.log('intersection!');
            if (this.intersected != intersects[0].object) {

                if (this.intersected) {
                    this.intersected.material.emissive.setHex(this.intersected.currentHex);
                }

                this.intersected = intersects[0].object;
                this.intersected.currentHex = this.intersected.material.emissive.getHex();
            }
        } else {
            if (this.intersected) {
                this.intersected.material.emissive.setHex(this.intersected.currentHex);
            }
            this.intersected = null;
        }

        requestAnimationFrame(this.render.bind(this));
    }

}
