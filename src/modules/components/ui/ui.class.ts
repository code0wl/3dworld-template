export class UI {

    private isShowing: boolean;

    constructor() {
        console.log('ui initialised');
    }

    public showDetailedUI(): void {
        console.log(this.isShowing);
    }

    public set showUI(show) {
        this.isShowing = show;
    }

}