import { Marker } from '../marker/marker.class';

export class LocationService {
    public markers: Marker[] = [];
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
                    this.markers.push(new Marker(country.coordinates.lat, country.coordinates.lon, this.scene, this.circumference, country.clients));
                });
            });
    }
}