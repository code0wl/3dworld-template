import { World } from './modules/components/world/world.class';
import { worldOptions } from './config';

const earth = new World(worldOptions);

//@start init
earth.initialise();