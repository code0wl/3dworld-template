import DirectionalLight = THREE.DirectionalLight;
export class Lighting {

    public light: THREE.AmbientLight;
    public directionLight: THREE.DirectionalLight;

    public ambientLight(world): THREE.AmbientLight {
        this.light = new THREE.AmbientLight(world.properties.globalLighting);
        this.light.name = 'ambient';
        return this.light;
    }

    public updatePosition(position): void {
        this.directionLight.position.x = position;
    }

    public directionalLight(sunControl: number): DirectionalLight {
        this.directionLight = new THREE.DirectionalLight(0xffffff, 1);
        this.directionLight.position.x = sunControl;
        this.directionLight.position.y = 10;
        this.directionLight.position.z = -50;
        this.directionLight.name = 'directional';
        return this.directionLight;
    }

}
