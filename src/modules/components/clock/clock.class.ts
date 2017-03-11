export class Clock {

    private time: Date;

    constructor() {
        this.time = new Date();
    }

    public setWorldToday() {
        console.log(this.time)
    }

    public get remainingTime(): number {
        return this.tomorrowBegins();
    }

    private tomorrowBegins() {
        return this.time.getTime() - 86400000;
    }

}