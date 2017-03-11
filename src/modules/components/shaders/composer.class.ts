import { World } from '../world/world.class';
export class Composer {

    public sceneBG: THREE.Scene;
    public renderer: THREE.WebGLRenderer;

    private cameraBG: THREE.OrthographicCamera;
    private composer: THREE.EffectComposer;
    private world: World;

    constructor(world) {
        this.world = world;
        this.configureRenderer();
    }

    //split into private galaxy background in world
    private configureRenderer() {
        this.cameraBG = new THREE.OrthographicCamera(
            -window.innerWidth,
            window.innerWidth,
            window.innerHeight,
            -window.innerHeight,
            -10000, 10000);
        this.cameraBG.position.z = 50;

        this.sceneBG = new THREE.Scene();
        const materialColor = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('../../../../static/images/space.jpg')
        });

        const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), materialColor);
        bgPlane.position.z = -100;
        bgPlane.scale.set(window.innerWidth * 2, window.innerHeight * 2, 1);
        this.sceneBG.add(bgPlane);

        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000, 1.0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = true;
        this.renderer.autoClear = false;
        this.renderer.render(this.sceneBG, this.cameraBG);
        this.renderer.render(this.world.scene, this.world.camera);
    }

    public render() {
        return this.composer;
    }

}