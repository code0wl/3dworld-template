// to create and and instantiate worlds
import { WorldOptions } from './world.model';
import { Cloud } from '../cloud/cloud.class';
export class World {

    public properties: WorldOptions;
    public sphere: THREE.Mesh;
    public clouds: Cloud;
    public globe: THREE.SphereGeometry;

    constructor(options: WorldOptions) {
        this.properties = options;
        this.clouds = new Cloud();
        this.sphere = new THREE.Mesh(this.globeGenerate(), this.decoratePlanet());
        this.sphere.name = 'earth';
        this.sphere.add(this.clouds.render(this));
    }

    private decoratePlanet(): THREE.MeshPhongMaterial {
        const worldMatertial = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('../../../static/images/planets/earthmap4k.jpg'),
            bumpMap: THREE.ImageUtils.loadTexture('../../../static/images/planets/earthbump4k.jpg'),
            bumpScale: 5,
            normalMap: THREE.ImageUtils.loadTexture('../../../static/images/planets/earth_normalmap_flat4k.jpg'),
            specularMap: THREE.ImageUtils.loadTexture('../../../static/images/planets/earthspec4k.jpg'),
            specular: new THREE.Color(0x333333),
            normalScale: new THREE.Vector2(0.5, 0.7)
        });
        return worldMatertial;
    }

    private globeGenerate() {
        this.globe = new THREE.SphereGeometry(15, 32, 32);
        return this.globe;
    }

}
