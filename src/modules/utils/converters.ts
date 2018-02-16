export function convertLatLonToVec3(lat, lon) {
    lat = lat * Math.PI / 180.0;
    lon = -lon * Math.PI / 180.0;
    return new THREE.Vector3(
        Math.cos(lat) * Math.cos(lon),
        Math.sin(lat),
        Math.cos(lat) * Math.sin(lon));
}

export function createSphereArc(P, Q) {
    const sphereArc = new THREE.Curve();
    sphereArc.getPoint = this.greatCircleFunction(P, Q);
    return sphereArc;
}

export function greatCircleFunction(P, Q) {
    const angle = P.angleTo(Q);
    return t => {
        const x = new THREE.Vector3().addVectors(
            P.clone().multiplyScalar(Math.sin((1 - t) * angle)),
            Q.clone().multiplyScalar(Math.sin(t * angle)))
            .divideScalar(Math.sin(angle));
        return x;
    };
}