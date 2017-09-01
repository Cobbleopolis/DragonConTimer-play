export interface IConsole {
    id: string;
    name: string;
    games: string[];
}

export class Console implements IConsole {

    public id: string;

    public name: string;

    public games: string[];

    constructor(id: string, name: string, games: string[]) {
        this.id = id;
        this.name = name;
        this.games = games;
    }
}