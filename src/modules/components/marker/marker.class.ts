import { convertLatLonToVec3 } from '../../utils/converters';

export const TYPE_LOCATION = "location";

export class Marker {

    private mesh: THREE.Mesh;
    private timeTip: HTMLElement;

    constructor(private name: string, private lat: number, private lon: number, scene: THREE.Scene, circumference: number, private payload: any, private timezone: string) {
        this.mesh = new THREE.Mesh(new THREE.SphereGeometry(.2, .2, .2), new THREE.MeshPhongMaterial({ color: '#e63908', specular: 0x009900, name: name, shininess: 30 }));
        const position = convertLatLonToVec3(lat, lon - 180, circumference + 0.5);
        this.mesh.position.setX(position.x);
        this.mesh.position.setY(position.y);
        this.mesh.position.setZ(position.z);
        this.mesh.type = TYPE_LOCATION;
        this.mesh.name = name;

        scene.add(this.mesh);
    }

    public get meta(): any {
        return this.payload;
    }

    public get position(): THREE.Vector3 {
        return this.mesh.position;
    }

    private updateTime() {
        if (!this.timeTip) {
            return;
        }
        const time = (new Date()).toLocaleString([], {
            timeZone: this.timezone,
            year: 'numeric', month: 'numeric', day: 'numeric',
            hour: 'numeric', minute: 'numeric', second: 'numeric',
        });
        this.timeTip.innerHTML = `${this.name}<br/>${time}`;
        setTimeout(() => this.updateTime(), 1000);
    }

    private updatePosition(event: MouseEvent) {
        if (!this.timeTip) {
            return;
        }
        this.timeTip.style.left = `${event.clientX + 20}px`;
        this.timeTip.style.top = `${event.clientY - 28}px`;
    }

    over(event: MouseEvent) {
        if (this.timeTip) {
            this.updatePosition(event);
            return
        }
        this.timeTip = document.createElement("div");
        this.timeTip.className = "time-tip";
        this.updateTime();
        this.updatePosition(event);

        document.body.appendChild(this.timeTip)
    }

    out() {
        console.log(this.name, "out");
        document.body.removeChild(this.timeTip);
        this.timeTip = null;
    }

}