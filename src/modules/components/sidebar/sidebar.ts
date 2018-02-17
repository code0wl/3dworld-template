export class SideBar {
    public isOpen: boolean;
    public sidebarComponent: HTMLDivElement;

    constructor(content: string) {
        this.sidebarComponent = document.createElement('div');
        this.sidebarComponent.textContent = content;
        this.sidebarComponent.classList.add('detailed-view');
        document.body.appendChild(this.sidebarComponent);
    }

}