import { Marker } from '../plot/plot.class';

export class GlobeData {
    public markerCollection = [];
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
        this.markerCollection.push(
            new Marker(40.7, -73.6, 0x0000FF, this.scene, this.circumference),
            new Marker(30, -90, 0x00FF00, this.scene, this.circumference),
            new Marker(-40.1, 40.1, 0x00FF00, this.scene, this.circumference)
        );
    }

    private drawCurve(curve) {
        const lineGeometry = new THREE.Geometry();
        lineGeometry.vertices = curve.getPoints(20);
        lineGeometry.computeLineDistances();

        const lineMaterial = new THREE.LineBasicMaterial();
        lineMaterial.color = new THREE.Color(0xFFFFFF);

        const line = new THREE.Line(lineGeometry, lineMaterial);
        this.scene.add(line);
    }
}