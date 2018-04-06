import { SideBar } from "../sidebar/sidebar";

export class UI {

    private isShowing: boolean;
    private detail: any;
    private sideBar: SideBar;

    public showDetailedUI(content): void {
        this.sideBar = new SideBar(content);
        this.isShowing ? this.renderUI() : this.removeUI();
    }

    public set showUI(show) {
        this.isShowing = show;
    }

    private renderUI(): void {
        this.detail = document.querySelector('.detailed-view');
        this.detail.classList.remove('fadeOutLeft');
        this.detail.classList.add('fadeInLeft', 'animated', 'is-open');
    }

    private removeUI(): void {
        if (this.detail) {
            this.detail.classList.remove('fadeInLeft', 'is-open');
            this.detail.classList.add('fadeOutLeft');
        }
    }
}
