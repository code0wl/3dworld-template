export class Canvas {

    public canvas: HTMLCanvasElement;

    constructor() {
        this.canvas = document.createElement('canvas');
        this.canvas.height = window.innerHeight;
        this.canvas.width = window.innerWidth;
        this.canvas.style.overflow = 'hidden';
        this.renderCanvas();
    }

    private renderCanvas() {
        document.body.appendChild(this.canvas);
    }

}