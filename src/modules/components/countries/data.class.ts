import { Marker } from '../plot/plot.class';

export class GlobeData {
    private scene: THREE.Scene;
    private circumference: number;

    constructor(scene, circumference) {
        this.scene = scene;
        this.circumference = circumference;
    }

    public visualize() {
        this.renderCoordinates();
    }

    private renderCoordinates() {
        const newZealand = new Marker(-41.28, 159, this.scene, this.circumference);
        const holland = new Marker(52, -11, this.scene, this.circumference);
        const portugal = new Marker(40, -25, this.scene, this.circumference);
    }
}