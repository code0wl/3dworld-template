import { WorldOptions } from './modules/components/world/world.model';

export const worldOptions: WorldOptions = {
    cloudsSpinSpeed: 0.0002,
    startRotation: 6,
    globalLighting: 0x222222,
    circumference: 15,
    pollingInterval: 30000,
    data_size_height: 4,
    name: 'earth',
    data_size_width: 4,
    width: window.innerWidth,
    height: window.innerHeight,
    benchmark: true,
    mode: {
        flight: true
    }
};
