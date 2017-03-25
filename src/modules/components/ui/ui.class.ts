import { Clock } from '../clock/clock.class';
export class UI {

    private time: Clock;
    private isShowing: boolean;
    private detail: any;

    constructor() {
        this.time = new Clock();
    }

    public showDetailedUI(): void {
        if (this.isShowing) {
            this.renderUI();
        } else {
            this.removeUI();
        }
    }

    public set showUI(show) {
        this.isShowing = show;
    }

    public update() {
        this.time.update();
    }

    private renderUI(): void {
        this.detail = document.querySelector('.detailed-view');
        this.detail.classList.remove('fadeOutDown');
        this.detail.classList.add('fadeInUp', 'animated');
        this.detail.innerText = 'Generated stats';
    }

    private removeUI(): void {
        this.detail.classList.remove('fadeInUp');
        this.detail.classList.add('fadeOutDown');
    }

}