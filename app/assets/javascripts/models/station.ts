export interface IStation {
    id: string;
    time: number;
    name: string;
    consoleOptions: string[];
    console: string;
    game: string;
}

export class Station implements IStation {

    public id: string;

    public time: number;

    public name: string;

    public consoleOptions: string[];

    public console: string;

    public game: string;

    constructor(id: string, time: number, name: string, consoleOptions: string[], console: string, game: string) {
        this.id = id;
        this.time = time;
        this.name = name;
        this.consoleOptions = consoleOptions;
        this.console = console;
        this.game = game;
    }

    static fromJSON(obj: IStation): Station {
        return $.extend({}, obj)
    }
}