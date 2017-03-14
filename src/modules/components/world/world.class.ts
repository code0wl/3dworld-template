import { WorldOptions } from './world.model';
import { Cloud } from '../cloud/cloud.class';
import { Layer } from '../layer/layer.class';
import { Lighting } from '../lighting/lighting.class';
import { Benchmark } from '../benchmark/benchmark.class';
import { DataFetch } from '../data/fetch.class';
import { Composer } from '../shaders/composer.class';
import { Camera } from '../camera/camera.class';
import { Clock } from '../clock/clock.class';
import { Control } from '../control/control.class';
import Vector3 = THREE.Vector3;

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
    private time: Clock;
    private lighting: Lighting;
    private globe: THREE.SphereGeometry;

    constructor(options: WorldOptions) {
        this.properties = options;
        this.camera = new Camera(options.width, options.height);
        this.clouds = new Cloud();
        this.sphere = new THREE.Mesh(this.globeGenerate(), this.decoratePlanet());
        this.sphere.name = options.name;
        this.composer = new Composer();
        this.lighting = new Lighting();
        this.sphere.add(this.clouds.render());
        this.hasBenchmark(options.benchmark);
        this.scene = new THREE.Scene();
        this.data = new DataFetch(this, options.dataURL);
        this.layer = new Layer(this);
        this.time = new Clock();
        this.control = new Control();
        this.setStartingRotation(options.startRotation);
    }

    public init(): void {
        this.scene.add(this.sphere);
        this.scene.add(this.layer.earthLights);
        this.scene.add(this.lighting.ambientLight(this));
        this.scene.add(this.lighting.directionalLight());
        document.querySelector('.country-list').innerHTML = this.properties.domNode;
        this.render();
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

    private setStartingRotation(start: number): void {
        this.sphere.rotation.y = start;
        this.scene.getObjectByName('overlay').rotation.y = start;
    }

    private globeGenerate(): THREE.SphereGeometry {
        this.globe = new THREE.SphereGeometry(15, 32, 32);
        return this.globe;
    }

    private render(): void {
        const obj = this.scene.getChildByName('overlay') as any;
        obj.material.map.needsUpdate = true;
        this.camera.cameraControl.update();

        this.time.update();

        this.sphere.rotation.y += this.properties.spinSpeed;
        this.layer.earthLights.rotation.y += this.properties.spinSpeed;
        obj.rotation.y += this.properties.spinSpeed;
        this.clouds.cloudMesh.rotation.y += this.properties.cloudsSpinSpeed;

        this.composer.renderer.render(this.scene, this.camera.camera);
        this.camera.camera.lookAt(this.scene.position);

        this.benchmark.stats.update();
        document.body.appendChild(this.composer.renderer.domElement);
        this.composer.renderer.autoClear = false;

        requestAnimationFrame(() => {
            this.render();
        });
    }

}
