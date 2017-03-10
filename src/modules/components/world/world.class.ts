// to create and and instantiate worlds
import { WorldOptions } from './world.model';
import { Cloud } from '../cloud/cloud.class';
import { Layer } from '../layer/layer.class';
import { Lighting } from '../lighting/lighting.class';
import Light = THREE.Light;
import { Benchmark } from '../benchmark/benchmark.class';
import { DataFetch } from '../data/fetch.class';
import { Composer } from '../shaders/composer.class';
import { Camera } from '../camera/camera.class';

export class World {

    public layer: Layer;
    public camera: Camera;
    public data: DataFetch;
    public scene: THREE.Scene;
    public benchmark: any;
    public sphere: THREE.Mesh;

    private lighting: Lighting;
    private composer: Composer;
    private globe: THREE.SphereGeometry;
    private properties: WorldOptions;
    private clouds: Cloud;

    constructor(options: WorldOptions) {
        this.properties = options;
        this.camera = new Camera(options.width, options.height);
        this.clouds = new Cloud();
        this.sphere = new THREE.Mesh(this.globeGenerate(), this.decoratePlanet());
        this.sphere.name = options.name;
        this.composer = new Composer(this);
        this.lighting = new Lighting();
        this.sphere.add(this.clouds.render());
        this.hasBenchmark(options.benchmark);
        this.scene = new THREE.Scene();
        this.data = new DataFetch(this, options.dataURL);
        this.layer = new Layer(this);
    }

    public initialise(): void {
        this.camera.camera.lookAt(this.scene.position);
        this.scene.add(this.sphere);
        this.scene.add(this.layer.earthLights());
        this.scene.add(this.lighting.ambientLight(this));
        this.scene.add(this.lighting.directionalLight());
        this.scene.add(this.composer.sceneBG);
        document.querySelector('.country-list').innerHTML = this.properties.domNode; // TODO clean up
        this.composer.render();
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

}
