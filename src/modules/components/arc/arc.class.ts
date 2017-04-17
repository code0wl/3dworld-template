import Vector3 = THREE.Vector3;
import Mesh = THREE.Mesh;

export class ArcData {
    public markerCollection: Array<Mesh> = [];
    private scene: THREE.Scene;
    private circumference: number;
    
    constructor(scene, circumference) {
        this.scene = scene;
        this.circumference = circumference;
    }
    
    public visualize() {
        this.renderCoordinates();
        const GCNY = this.convertLatLonToVec3(40.7, -73.6).multiplyScalar(this.circumference + .1);
        const NOLA = this.convertLatLonToVec3(30, -90).multiplyScalar(this.circumference + .1);
        this.drawCurve(this.createSphereArc(GCNY, NOLA));
    }
    
    private renderCoordinates() {
        this.addMarker(20, -160, 0xFF0000);
        this.addMarker(40.7, -73.6, 0x0000FF);
        this.addMarker(30, -90, 0x00FF00);
    }
    
    private addMarker(lat, lon, colory) {
        const contextPosition = this.convertLatLonToVec3(lat, lon).multiplyScalar(this.circumference);
        const marker: any = new THREE.Mesh(new THREE.SphereGeometry(.1, 30, .1), new THREE.MeshBasicMaterial({color: colory}));
        marker.position.setX(contextPosition.x);
        marker.position.setY(contextPosition.y);
        marker.position.setZ(contextPosition.z);
        this.markerCollection.push(marker);
        this.scene.add(marker);
    }
    
    private convertLatLonToVec3(lat, lon) {
        lat = lat * Math.PI / 180.0;
        lon = -lon * Math.PI / 180.0;
        return new THREE.Vector3(
            Math.cos(lat) * Math.cos(lon),
            Math.sin(lat),
            Math.cos(lat) * Math.sin(lon));
    }
    
    private greatCircleFunction(P, Q) {
        const angle = P.angleTo(Q);
        return t => {
            const x = new THREE.Vector3().addVectors(
                P.clone().multiplyScalar(Math.sin((1 - t) * angle)),
                Q.clone().multiplyScalar(Math.sin(t * angle)))
            .divideScalar(Math.sin(angle));
            return x;
        };
    }
    
    private createSphereArc(P, Q) {
        const sphereArc = new THREE.Curve();
        sphereArc.getPoint = this.greatCircleFunction(P, Q);
        return sphereArc;
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