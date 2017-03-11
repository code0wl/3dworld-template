import { World } from '../world/world.class';
export class Composer {

    public renderer: THREE.WebGLRenderer;
    private composer: THREE.EffectComposer;
    private world: World;

    constructor(world) {
        this.world = world;
        this.configureRenderer();
    }

    //split into private galaxy background in world
    private configureRenderer() {
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = true;
    }

}