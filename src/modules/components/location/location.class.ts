import { Marker } from '../plot/plot.class';

export class LocationService {
    private scene: THREE.Scene;
    private circumference: number;

    constructor(scene, circumference) {
        this.scene = scene;
        this.circumference = circumference;
    }

    public visualize() {
        this.renderCoordinates();
    }

    private async renderCoordinates() {
        fetch("src/data/domain/data.json")
            .then(data => data.json())
            .then((payload) => {
                payload.countries.map(country => {
                    new Marker(country.coordinates.lat, country.coordinates.lon, this.scene, this.circumference);
                });
            });
    }
}