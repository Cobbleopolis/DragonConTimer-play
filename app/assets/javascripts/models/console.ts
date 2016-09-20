class Station {

    id: string;
    timeRemaining: number = 0;

    private lastUpdatedTime: Date;

    element: ConsoleElement;

    timer: number;

    constructor(id: string, time: number) {
        this.id = id;
        this.timeRemaining = time;
        this.element = new ConsoleElement(this);
    }

    startTimer(): void {
        this.lastUpdatedTime = new Date;
        if (this.timeRemaining === 0)
            this.timeRemaining = 60;
        this.timer = setInterval(this.updateTime.bind(this), 250);
    }

    updateTime(): void {
        let currentTime: Date = new Date();
        this.timeRemaining -= (currentTime.getTime() - this.lastUpdatedTime.getTime()) / 1000;
        this.element.updateProgBar();
        this.lastUpdatedTime = currentTime;
        if (this.timeRemaining <= 0)
            this.stopTimer();
    }

    stopTimer(): void {
        clearInterval(this.timer);
    }
}

class ConsoleElement {

    con: Station;

    container: JQuery;

    progressBar: JQuery;

    constructor(console: Station) {
        this.con = console;
        this.container = $("#console" + console.id);
        this.progressBar = this.container.find(".progress-bar");
    }

    updateProgBar(): void {
        this.progressBar
            .attr("aria-valuenow", this.con.timeRemaining)
            .css("width", this.con.timeRemaining / 60 * 100 + "%")
            .text((this.con.timeRemaining | 0) + " min");
    }
}
