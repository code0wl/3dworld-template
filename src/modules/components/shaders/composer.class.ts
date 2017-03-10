import { World } from '../world/world.class';
export class Composer {

    private composer: THREE.EffectComposer;
    private world: World;
    public sceneBG: THREE.Scene;
    private cameraBG: THREE.OrthographicCamera;
    public renderer: THREE.WebGLRenderer;

    constructor(world) {
        this.world = world;
        this.configureRenderer();
    }

    private configureRenderer() {
        this.sceneBG = new THREE.Scene();
        const materialColor = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('../../../../static/images/space.jpg'),
            depthTest: false,
            depthWrite: false
        });

        const bgPlane = new THREE.Mesh(new THREE.PlaneGeometry(2, 2), materialColor);
        bgPlane.position.z = -100;
        bgPlane.scale.set(this.world.properties.width * 2, this.world.properties.height * 2, 1);
        this.sceneBG.add(bgPlane);

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