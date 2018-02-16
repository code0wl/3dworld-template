import { convertLatLonToVec3 } from '../../utils/converters';

export class Marker {
    constructor(lat: number, lon, colory: number, scene: THREE.Scene, circumference: number) {
        const contextPosition = convertLatLonToVec3(lat, lon).multiplyScalar(circumference);
        const marker: any = new THREE.Mesh(new THREE.SphereGeometry(.1, 30, .1), new THREE.MeshBasicMaterial({color: colory}));
        marker.position.setX(contextPosition.x);
        marker.position.setY(contextPosition.y);
        marker.position.setZ(contextPosition.z);
        scene.add(marker);
    }
}