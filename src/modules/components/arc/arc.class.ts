import Vector3 = THREE.Vector3;

export class ArcData {
    
    private scene: THREE.Scene;
    private circumference: number;
    
    constructor(scene, circumference) {
        this.scene = scene;
        this.circumference = circumference;
    }
    
    public visualize() {
        this.addMarker(20, -160, 0xFF0000); // Near Hawaii
        this.addMarker(40.7, -73.6, 0x0000FF); // Garden City, NY
        const GCNY = this.convertLatLonToVec3(40.7, -73.6).multiplyScalar(this.circumference + .5);
        this.addMarker(30, -90, 0x00FF00); // New Orleans, LA
        const NOLA = this.convertLatLonToVec3(30, -90).multiplyScalar(this.circumference + .5);
        this.drawCurve(this.createSphereArc(GCNY, NOLA), 0x00FFFF);
    }
    
    private addMarker(lat, lon, colory) {
        const contextPosition = this.convertLatLonToVec3(lat, lon).multiplyScalar(this.circumference);
        const marker: any = new THREE.Mesh(new THREE.SphereGeometry(1, 8, 4), new THREE.MeshBasicMaterial({color: colory}));
        marker.position.setX(contextPosition.x);
        marker.position.setY(contextPosition.y);
        marker.position.setZ(contextPosition.z);
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
        return (t) => {
            const X = new THREE.Vector3().addVectors(
                P.clone().multiplyScalar(Math.sin((1 - t) * angle)),
                Q.clone().multiplyScalar(Math.sin(t * angle)))
            .divideScalar(Math.sin(angle));
            return X;
        };
    }
    
    private createSphereArc(P, Q) {
        const sphereArc = new THREE.Curve();
        sphereArc.getPoint = this.greatCircleFunction(P, Q);
        return sphereArc;
    }
    
    private drawCurve(curve, color) {
        const lineGeometry = new THREE.Geometry();
        lineGeometry.vertices = curve.getPoints(1000);
        lineGeometry.computeLineDistances();
        
        const lineMaterial = new THREE.LineBasicMaterial();
        lineMaterial.color = (typeof(color) === "undefined") ? new THREE.Color(0xFFFFFF) : new THREE.Color(color);
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        this.scene.add(line);
    }
    
}