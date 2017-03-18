export class Lighting {

    public light: THREE.AmbientLight;
    public directionLight: THREE.DirectionalLight;

    public ambientLight(world) {
        this.light = new THREE.AmbientLight(world.properties.globalLighting);
        this.light.name = 'ambient';
        return this.light;
    }

    public directionalLight(start) {
        this.directionLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionLight.position.x = start;
        this.directionLight.position.y = 10;
        this.directionLight.position.z = -50;
        this.directionLight.name = 'directional';
        return this.directionLight;
    }

}
