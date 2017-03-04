export class Cloud {

    public render(world) {
        var geometry = new THREE.SphereGeometry(15.15, 32, 32);
        var material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('../../../static/images/planets/fair_clouds_4k.png'),
            side: THREE.DoubleSide,
            opacity: 0.5,
            transparent: true,
            depthWrite: false
        });
        const cloudMesh = new THREE.Mesh(geometry, material);
        cloudMesh.rotation.y += world.properties.cloudsSpinSpeed;
        return cloudMesh;
    }

}