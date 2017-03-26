import { WorldOptions } from './modules/components/world/world.model';
import * as moment from 'moment';

const currentTime = Number(moment('00:00:00', 'HH:mm:ss').fromNow().replace(/[a-z]/g, ''));
const fullRotation = 6;
const currentRotation = -(fullRotation / (currentTime / fullRotation));

export const worldOptions: WorldOptions = {
    spinSpeed: .000086400,
    cloudsSpinSpeed: 0.0002,
    startRotation: currentRotation,
    globalLighting: 0x222222,
    dataURL: 'static/js/data/data.json',
    pollingInterval: 30000,
    data_size_height: 4,
    name: 'earth',
    data_size_width: 4,
    width: window.innerWidth,
    height: window.innerHeight,
    benchmark: true
};
