export interface IStation {
    id: string;
    time: number;
    name: string;
    console: string;
    game: string;
}

export class Station implements IStation {

    public id: string;

    public time: number;

    public name: string;

    public console: string;

    public game: string;

    constructor(id: string, time: number, name: string, console: string, game: string) {
        this.id = id;
        this.time = time;
        this.name = name;
        this.console = console;
        this.game = game;
    }

    static fromJSON(obj: IStation): Station {
        return $.extend({}, obj)
    }
}