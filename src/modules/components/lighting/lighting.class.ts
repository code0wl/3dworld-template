export class Lighting {

    public light: THREE.AmbientLight;
    public directionLight: THREE.DirectionalLight;

    public ambientLight(): THREE.AmbientLight {
        this.light = new THREE.AmbientLight('#fff');
        this.light.name = 'ambient';

        return this.light;
    }

    public directionalLight(): THREE.DirectionalLight {
        this.directionLight = new THREE.DirectionalLight(0xffffff, 0.5);
        this.directionLight.name = 'ambient';

        return this.directionLight;
    }

}
