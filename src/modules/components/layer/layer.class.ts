import MeshBasicMaterial = THREE.MeshBasicMaterial;
import { World } from '../world/world.class';
export class Layer {

    public earthLightsMesh: THREE.Mesh;
    private world: World;

    public constructor(world) {
        this.world = world;
    }

    public earthLights() {
        var geometry = new THREE.SphereGeometry(15.01, 32, 32);

        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('../../../static/images/planets/city_lights_4k.png'),
            transparent: true,
            opacity: .37,
            lights: true
        });

        this.earthLightsMesh = new THREE.Mesh(geometry, material);
        return this.earthLightsMesh;
    }

    public createOverlayMaterial() {
        var olMaterial = new THREE.MeshPhongMaterial();
        olMaterial.map = new THREE.Texture(this.world.data.addCanvas());
        olMaterial.transparent = true;
        olMaterial.lights = true;
        olMaterial.opacity = 1;
        return olMaterial;
    }

}
