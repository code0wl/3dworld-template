import DateTimeFormat = Intl.DateTimeFormat;

export class Clock {

    private time: any;
    private clock: HTMLDivElement;

    constructor() {
        this.setWorldToday();
    }

    public update() {
        this.time = new Date();
        this.clock.innerText = `${this.time}`;
    }

    private setWorldToday() {
        this.clock = document.createElement('div');
        this.clock.classList.add('clock');
        document.body.appendChild(this.clock);
    }

}
