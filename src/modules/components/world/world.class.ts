// to create and and instantiate worlds
import { WorldOptions } from './world.model';
export class World {

    public properties: WorldOptions;

    constructor(options: WorldOptions) {
        this.properties = options;
    }

}