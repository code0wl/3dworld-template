import { GlobeOptions } from './globe.model';

export class Globe {

    private rotationSpeed;
    private cloudRotationSpeed;
    private globalIllumination;
    private domClass;
    private dataURL;
    private dataPolling;

    constructor(options: GlobeOptions) {
        this.rotationSpeed = options.rotationSpeed;
        this.cloudRotationSpeed = options.rotationSpeed;
        this.globalIllumination = options.globalIllumination;
        this.domClass = options.domClass;
        this.dataURL = options.dataURL;
        this.dataPolling = options.dataPolling;
    }

}