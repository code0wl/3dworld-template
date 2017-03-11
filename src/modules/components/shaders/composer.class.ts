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
        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0x000000, 1.0);
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.shadowMapEnabled = true;
    }

    public render() {
        const bgPass = new THREE.RenderPass(this.sceneBG, this.cameraBG);
        const renderPass = new THREE.RenderPass(this.world.scene, this.world.camera.camera);
        const effectCopy = new THREE.ShaderPass(THREE.CopyShader);

        renderPass.clear = false;
        effectCopy.renderToScreen = true;
        this.composer = new THREE.EffectComposer(this.renderer);
        this.composer.addPass(bgPass);
        this.composer.addPass(renderPass);
        this.composer.addPass(effectCopy);
        return this.composer;
    }

}