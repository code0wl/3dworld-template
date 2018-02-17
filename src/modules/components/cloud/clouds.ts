export class Cloud {

    public cloudMesh: THREE.Mesh;

    public cloudTexture(): THREE.Mesh {
        const geometry = new THREE.SphereGeometry(15.2, 32, 32);
        const material = new THREE.MeshPhongMaterial({
            map: THREE.ImageUtils.loadTexture('../../../static/images/planets/fair_clouds_4k.png'),
            side: THREE.DoubleSide,
            opacity: 0.1,
            transparent: true,
            depthWrite: false
        });
        this.cloudMesh = new THREE.Mesh(geometry, material);
        return this.cloudMesh;
    }

}