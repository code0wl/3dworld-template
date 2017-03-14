import DateTimeFormat = Intl.DateTimeFormat;
export class Clock {

    private time: any;

    constructor() {
        this.time = new Date().getUTCMonth();
        this.setWorldToday();
    }

    private setWorldToday() {
        const clock = document.createElement('div');
        clock.classList.add('clock');
        clock.innerText = `${this.time}`;
        document.body.appendChild(clock);
    }

    public get remainingTime(): number {
        return this.tomorrowBegins();
    }

    private tomorrowBegins() {
        return this.time.getTime() - 86400000;
    }

}