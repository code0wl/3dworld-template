import Vector3 = THREE.Vector3;
import { World } from '../world/world.class';

export class Layer {

    public lights: THREE.Mesh;
    private world: World;

    public constructor(world) {
        this.world = world;
    }

    // implement light texture
    public earthLightsTexture(): THREE.Mesh {
        const geometry = new THREE.SphereGeometry(15.04, 32, 32);

        const material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('../../../world/static/images/planets/city_lights_4k.png'),
            transparent: true,
            opacity: .3,
            lights: true
        });

        this.lights = new THREE.Mesh(geometry, material);
        return this.lights;
    }

    public latLongToVector3(lat, lon, radius, height): Vector3 {
        const phi = (lat) * Math.PI / 180;
        const theta = (lon - 180) * Math.PI / 180;

        const x = -(radius + height) * Math.cos(phi) * Math.cos(theta);
        const y = (radius + height) * Math.sin(phi);
        const z = (radius + height) * Math.cos(phi) * Math.sin(theta);

        return new THREE.Vector3(x, y, z);
    }

}
