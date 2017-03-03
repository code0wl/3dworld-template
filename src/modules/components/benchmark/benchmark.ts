export class Benchmark {

    private stats: any;

    constructor() {
        this.addStatsObject();
    }

    private addStatsObject() {
        this.stats = new Stats();
        this.stats.setMode(0);
        this.stats.domElement.style.position = 'absolute';
        this.stats.domElement.style.left = 0;
        this.stats.domElement.style.top = 0;
        document.body.appendChild(this.stats.domElement);
    }
}