import { WorldOptions } from './world.model';
import { Lighting } from '../lighting/lighting.class';
import { Composer } from '../shaders/composer.class';
import { Camera } from '../camera/camera.class';
import { UI } from '../ui/ui.class';
import { LocationService } from '../location/location.class';
import { WorldTexture } from '../texture/texture';
import { TweenLite } from 'gsap';
import { Marker, TYPE_LOCATION } from "../marker/marker.class";

export class World {
    public raycaster: THREE.Raycaster;
    public camera: Camera;
    public scene: THREE.Scene;
    public composer: Composer;
    public sphere: THREE.Mesh;
    public options: WorldOptions;

    private locations: LocationService;
    private ui: UI;
    private intersected: Marker;
    private lighting: Lighting;
    private mouse: any;
    private globe: THREE.Scene;
    private hasClicked: boolean = false;

    // extract to control class
    private velocityX: number = 0;
    private velocityY: number = 0;
    private friction: number = 0.07;

    constructor(options: WorldOptions) {
        this.options = options;
        this.composer = new Composer();
        this.lighting = new Lighting();
        this.raycaster = new THREE.Raycaster();
        this.scene = new THREE.Scene();
        this.camera = new Camera(options.width, options.height);
        this.mouse = new THREE.Vector2();
        this.ui = new UI(this); // refactor
        this.globeGenerate();
    }

    public init(): void {

        this.scene.add(this.lighting.ambientLight());
        this.scene.add(this.lighting.directionalLight());

        let down: boolean = false;
        let dragged: boolean = false;

        this.options.container.addEventListener('mousedown', (event: MouseEvent) => {
            down = true;
            this.velocityX = 0;
            this.velocityY = 0;
        });

        this.options.container.addEventListener('mousemove', (event: MouseEvent) => {
            if (down) {
                dragged = true;
                this.velocityX = event.movementX;
                this.velocityY = event.movementY;
            }
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = - (event.clientY / window.innerHeight) * 2 + 1;

            this.checkIntersections(event);
        });

        this.options.container.addEventListener('mouseup', (event: MouseEvent) => {
            if (down && !dragged) {

                this.hasClicked = true;

                if (this.intersected) {

                    this.zoomIn(this.intersected);
                    this.ui.showDetailedUI(this.intersected);

                }
            }

            down = false;
            dragged = false;

        });

        this.options.container.appendChild(this.composer.renderer.domElement);

        this.render();

    }

    private globeGenerate() {

        const earthDiffTexture = new THREE.MeshPhongMaterial({
            emissive: new THREE.TextureLoader().load('static/globe/PlanetEarth_EMISSION.jpg'),
            shininess: 5,
            reflectivity: 0.2,
            envMap: new THREE.TextureLoader().load('static/globe/PlanetEarth_REFLECTION.jpg'),
            bumpMap: new THREE.TextureLoader().load('static/globe/PlanetEarth_BUMP.jpg'),
            map: new THREE.TextureLoader().load('static/globe/PlanetEarth_DIFFUSE.jpg'),
            bumpScale: 0.001,
        } as any);

        const loader = new THREE.ColladaLoader();

        loader.load('static/globe/Earth.dae', (collada) => {

            collada.scene.traverse(function (node: any) {

                if (node.isMesh) {

                    node.material = earthDiffTexture;
                    Object.assign(node.scale, { x: 15, y: 15, z: 15 });

                }

            });

            this.globe = collada.scene;

            this.locations = new LocationService(this.options.container, this.globe, this.options.circumference);

            this.scene.add(this.globe);

            this.locations.visualize();

        });
    }

    // extract to UI class
    private zoomIn(marker: Marker) {
        this.camera.setDetailView(marker.position);
        this.ui.showUI = true;
    }

    public zoomOut() {
        this.camera.setNormalView();
        this.ui.showUI = false;
        this.intersected = null;
    }

    private checkIntersections(event: MouseEvent) {

        if (!this.globe) return;

        this.raycaster.setFromCamera(this.mouse, this.camera.camera);

        const intersects = this.raycaster.intersectObjects(this.globe.children);

        if (intersects.length > 0) {
            const object = intersects[0].object;

            if (object.type === TYPE_LOCATION && this.locations.markers.has(object.name)) {

                const marker = this.locations.markers.get(object.name);

                if (marker != this.intersected) {
                    console.log(object);
                }

                this.intersected = marker;
                marker.over(event);

                return;
            }
        }

        if (this.intersected) {
            this.intersected.out();
            this.intersected = null;
        }
    }

    private render(): void {

        const rotateX: number = (Math.PI / 1000) * this.velocityY;
        const rotateY: number = (Math.PI / 1000) * this.velocityX;

        if (this.camera.rotate) {

            this.velocityX -= this.velocityX * this.friction;
            this.velocityY -= this.velocityY * this.friction;
            this.scene.rotateY(rotateY);

        }

        this.camera.camera.updateProjectionMatrix();
        this.camera.cameraControl.update();

        this.composer.renderer.autoClear = false;
        this.composer.renderer.render(this.scene, this.camera.camera);

        requestAnimationFrame(this.render.bind(this));
    }

}