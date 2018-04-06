import { convertLatLonToVec3 } from '../../utils/converters';

export class Marker {
    constructor(lat: number, lon: number, scene: THREE.Scene, circumference: number, payload) {
        const contextPosition = convertLatLonToVec3(lat, lon).multiplyScalar(circumference);

        const marker = new THREE.Mesh(new THREE.SphereGeometry(.15, 30, .15), new THREE.MeshBasicMaterial({ color: '#cf3f40', name: "location" }));
        marker.position.setX(contextPosition.x);
        marker.position.setY(contextPosition.y);
        marker.position.setZ(contextPosition.z);
        Object.assign(marker, payload);
        marker.name = "location";
        scene.add(marker);
    }

    public select(coordinate) {
        console.log(coordinate);
    }
}