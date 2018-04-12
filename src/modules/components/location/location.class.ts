import { Marker } from '../marker/marker.class';

export class LocationService {
    public markers: Map<string, Marker> = new Map();
    private scene: THREE.Scene;
    private circumference: number;

    constructor(scene, circumference) {
        this.scene = scene;
        this.circumference = circumference;
    }

    public visualize() {
        this.renderCoordinates();
    }

    private renderCoordinates() {
        fetch('static/data/domain/data.json')
            .then(data => data.json())
            .then((payload) => {
                payload.countries.map(country => {
                    const marker = new Marker(
                        country.name,
                        country.coordinates.lat,
                        country.coordinates.lon,
                        this.scene,
                        this.circumference,
                        country.clients,
                        country.timezone,
                    );
                    this.markers.set(country.name, marker);
                });
            });
    }
}