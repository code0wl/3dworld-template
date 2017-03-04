import MeshBasicMaterial = THREE.MeshBasicMaterial;
export class Layer {

    public earthLightsMesh: THREE.Mesh;

    public earthLights() {
        var geometry = new THREE.SphereGeometry(15.01, 32, 32);

        var material = new THREE.MeshBasicMaterial({
            map: THREE.ImageUtils.loadTexture('../../../static/images/planets/city_lights_4k.png'),
            transparent: true,
            opacity: .37,
            lights: true
        });

        this.earthLightsMesh = new THREE.Mesh(geometry, material);
        return this.earthLightsMesh;
    }

}
