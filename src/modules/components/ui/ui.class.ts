import { SideBar } from "../sidebar/sidebar";


export class UI {

    private isShowing: boolean;
    private detail: any;
    private sideBar: SideBar;

    public showDetailedUI(): void {
        this.sideBar = new SideBar('content');
        this.isShowing ? this.renderUI() : this.removeUI();
    }

    public set showUI(show) {
        this.isShowing = show;
    }

    private renderUI(): void {
        this.detail = document.querySelector('.detailed-view');
        this.detail.classList.remove('fadeOutDown');
        this.detail.classList.add('fadeInUp', 'animated', 'is-open');
    }

    private removeUI(): void {
        if (this.detail) {
            this.detail.classList.remove('fadeInUp', 'is-open');
            this.detail.classList.add('fadeOutDown');
        }
    }
}
