import { World } from '../world/world.class';

export class Layer {

    public lights: THREE.Mesh;
    private world: World;

    public constructor(world) {
        this.world = world;
    }

}
