import { SideBar } from "../sidebar/sidebar";
import { World } from "../world/world.class";

export class UI {

    private isShowing: boolean;
    private detail: any;
    private sideBar: SideBar;

    constructor(private world: World) {}

    public showDetailedUI(content): void {
        this.sideBar = new SideBar(this.world, content);
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
