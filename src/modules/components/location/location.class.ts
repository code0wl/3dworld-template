import { Marker } from '../marker/marker.class';

export class LocationService {
    public markers: Map<string, Marker> = new Map();

    constructor(
        private container,
        private scene,
        private circumference) {
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
                        this.container,
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