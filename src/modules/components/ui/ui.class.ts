import {Clock} from '../clock/clock.class';

export class UI {
    
    private time: Clock;
    private isShowing: boolean;
    private detail: any;
    
    constructor() {
        this.time = new Clock();
    }
    
    public showDetailedUI(): void {
        this.isShowing ? this.renderUI() : this.removeUI();
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
        this.detail.style.height = `100%`;
    }
    
    private removeUI(): void {
        if (this.detail) {
            this.detail.classList.remove('fadeInUp');
            this.detail.classList.add('fadeOutDown');
            this.detail.style.height = 0;
        }
    }
}
