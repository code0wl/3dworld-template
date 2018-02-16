import { WorldOptions } from './world.model';
import { Cloud } from '../cloud/cloud.class';
import { Layer } from '../layer/layer.class';
import { Lighting } from '../lighting/lighting.class';
import { Benchmark } from '../benchmark/benchmark.class';
import { DataFetch } from '../data/fetch.class';
import { Composer } from '../shaders/composer.class';
import { Camera } from '../camera/camera.class';
import { Control } from '../control/control.class';
import { ArcData } from '../arc/arc.class';
import { UI } from '../ui/ui.class';

declare const window: Window;

export class World {
    public layer: Layer;
    public camera: Camera;
    public data: DataFetch;
    public scene: THREE.Scene;
    public benchmark: any;
    public control: Control;
    public composer: Composer;
    public sphere: THREE.Mesh;
    public clouds: Cloud;
    public properties: WorldOptions;

    private arcs: ArcData;
    private ui: UI;
    private lighting: Lighting;
    private globe: THREE.SphereGeometry;
    private dataPoints: any;

    constructor(options: WorldOptions) {
        this.properties = options;
        this.clouds = new Cloud();
        this.composer = new Composer();
        this.lighting = new Lighting();
        this.scene = new THREE.Scene();
        this.camera = new Camera(options.width, options.height, this.scene);
        this.data = new DataFetch(this, options.dataURL);
        this.layer = new Layer(this);
        this.control = new Control();
        this.ui = new UI();
        this.create(options);
        this.arcs = new ArcData(this.scene, options.circumference);
        this.hasBenchmark(options.benchmark);
        this.mode(options.mode);
        this.dataPoints = this.scene.getChildByName('overlay');
    }

    public init(): void {
        this.scene.add(this.sphere);
        this.scene.add(this.lighting.ambientLight(this));
        this.scene.add(this.lighting.directionalLight());
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
            } else if (e.keyCode === 78) {
                this.camera.setNormalView([80, 36, 33]);
                this.ui.showUI = false;
            }
            this.ui.showDetailedUI();
        });
    }

    private setWorldOrientation(rotation) {
        this.sphere.rotation.y = rotation;
        this.layer.lights.rotation.y = rotation;
        this.dataPoints.rotation.y = rotation;
    }

    private create(options): void {
        this.sphere = new THREE.Mesh(this.globeGenerate(), this.decoratePlanet());
        this.sphere.name = options.name;
        this.sphere.add(this.clouds.cloudTexture());
        this.scene.add(this.layer.earthLightsTexture());
    }

    private hasBenchmark(benchmark): void {
        if (benchmark) {
            this.benchmark = new Benchmark();
        }
    }

    private decoratePlanet(): THREE.MeshPhongMaterial {
        return new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('../../../static/images/planets/earthmap4k.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('../../../static/images/planets/earthbump4k.jpg'),
            bumpScale: 5,
            normalMap: THREE.ImageUtils.loadTexture('../../../static/images/planets/earth_normalmap_flat4k.jpg'),
            specularMap: THREE.ImageUtils.loadTexture('../../../static/images/planets/earthspec4k.jpg'),
            specular: new THREE.Color(0x333333),
            normalScale: new THREE.Vector2(0.5, 0.7)
        } as THREE.MeshBasicMaterialParameters);
    }

    private globeGenerate(): THREE.SphereGeometry {
        this.globe = new THREE.SphereGeometry(15, 32, 32);
        return this.globe;
    }

    private render(): void {
        this.dataPoints.material.map.needsUpdate = true;
        this.dataPoints.rotation.y += this.properties.spinSpeed;
        this.lighting.updatePosition(this.properties.cloudsSpinSpeed);

        this.sphere.rotation.y += this.properties.spinSpeed;
        this.layer.lights.rotation.y += this.properties.spinSpeed;
        this.clouds.cloudMesh.rotation.y += this.properties.cloudsSpinSpeed;

        this.ui.update();
        this.benchmark.stats.update();
        this.camera.cameraControl.update();

        document.body.appendChild(this.composer.renderer.domElement);
        this.composer.renderer.autoClear = false;
        this.composer.renderer.render(this.scene, this.camera.camera);

        requestAnimationFrame(() => {
            this.render();
        });
    }

}
