import MeshBasicMaterial = THREE.MeshBasicMaterial;
import { World } from '../world/world.class';

export class Layer {

    public earthLightsMesh: THREE.Mesh;
    private world: World;

    public constructor(world) {
        this.world = world;
        this.overlay();
    }

    public earthLights() {
        const geometry = new THREE.SphereGeometry(15.01, 32, 32);

        const material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('../../../static/images/planets/city_lights_4k.png'),
            transparent: true,
            opacity: .37,
            lights: true
        });

        this.earthLightsMesh = new THREE.Mesh(geometry, material);
        return this.earthLightsMesh;
    }

    public createOverlayMaterial() {
        const olMaterial = new THREE.MeshPhongMaterial();
        olMaterial.map = new THREE.Texture(this.world.data.addCanvas());
        olMaterial.transparent = true;
        olMaterial.lights = true;
        olMaterial.opacity = 1;
        return olMaterial;
    }

    public overlay() {
        const overlayGeometry = new THREE.SphereGeometry(15.1, 32, 32);
        const overlayMesh = new THREE.Mesh(overlayGeometry, this.createOverlayMaterial());
        overlayMesh.name = 'overlay';
        this.world.scene.add(overlayMesh);
    }

    public latLongToVector3(lat, lon, radius, heigth) {
        const phi = (lat) * Math.PI / 180;
        const theta = (lon - 180) * Math.PI / 180;

        const x = -(radius + heigth) * Math.cos(phi) * Math.cos(theta);
        const y = (radius + heigth) * Math.sin(phi);
        const z = (radius + heigth) * Math.cos(phi) * Math.sin(theta);

        return new THREE.Vector3(x, y, z);
    };

}
