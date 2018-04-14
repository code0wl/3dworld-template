import { WorldOptions } from './modules/components/world/world.model';

export const worldOptions: WorldOptions = {
    globalLighting: 0x222222,
    circumference: 15,
    container: document.querySelector('.world'),
    name: 'earth',
    width: window.innerWidth,
    height: window.innerHeight,
};