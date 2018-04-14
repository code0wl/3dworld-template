import { convertLatLonToVec3 } from '../../utils/converters';

export class Marker {

    constructor(lat: number, lon: number, scene: THREE.Scene, circumference: number, payload) {
        const contextPosition = convertLatLonToVec3(lat, lon += -90).multiplyScalar(circumference);

        const marker = new THREE.Mesh(new THREE.SphereGeometry(.5, .5, .2), new THREE.MeshPhongMaterial({ color: '#e63908', specular: 0x009900, name: name, shininess: 30 }));

        marker.position.set(contextPosition.x, contextPosition.y, contextPosition.z);

        Object.assign(marker, payload);

        marker.name = "location";

        scene.add(marker);
    }

}