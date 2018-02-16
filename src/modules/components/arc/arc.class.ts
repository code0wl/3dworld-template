import { Marker } from '../plot/plot.class';
import { convertLatLonToVec3, createSphereArc } from '../../utils/converters';

export class ArcData {
    public markerCollection = [];
    private scene: THREE.Scene;
    private circumference: number;

    constructor(scene, circumference) {
        this.scene = scene;
        this.circumference = circumference;
    }

    public visualize() {
        this.renderCoordinates();
        const GCNY = convertLatLonToVec3(40.7, -73.6).multiplyScalar(this.circumference + .1);
        const NOLA = convertLatLonToVec3(30, -90).multiplyScalar(this.circumference + .1);
        this.drawCurve(createSphereArc(GCNY, NOLA));
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