import { Marker } from '../marker/marker.class';

export class LocationService {

    public markers: Marker[] = [];

    constructor(private scene, private circumference) { }

    public visualize() {
        this.renderCoordinates();
    }

    private renderCoordinates() {
        fetch('src/data/domain/data.json')
            .then(data => data.json())
            .then((payload) => {
                payload.countries.map(country => {
                    this.markers.push(new Marker(country.coordinates.lat, country.coordinates.lon, this.scene, this.circumference, country.clients));
                });
            });
    }
}