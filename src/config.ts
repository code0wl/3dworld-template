import { WorldOptions } from './modules/components/world/world.model';

export const worldOptions: WorldOptions = {
    spinSpeed: 0.000086400,
    cloudsSpinSpeed: 0.0002,
    startRotation: 1200, //TODO: this is bad
    globalLighting: 0x222222,
    domNode: `<div class="data-countries"></div>`, // extract to external module
    dataURL: 'static/js/data/data.json',
    pollingInterval: 30000,
    data_size_height: 4,
    name: 'earth',
    data_size_width: 4,
    width: window.innerWidth,
    height: window.innerHeight,
    benchmark: true
};