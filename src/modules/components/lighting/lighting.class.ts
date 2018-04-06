export class Lighting {

    public light: THREE.AmbientLight;
    public directionLight: THREE.AmbientLight;

    public ambientLight(): THREE.AmbientLight {
        this.light = new THREE.AmbientLight('#fff');
        this.light.name = 'ambient';
        return this.light;
    }

}
