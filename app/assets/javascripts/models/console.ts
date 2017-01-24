import {Game} from "./game";
export interface IConsole {
    id: string;
    name: string;
    games: Game[];
}

export class Console implements IConsole {

    public id: string;

    public name: string;

    public games: Game[];

    constructor(id: string, name: string, games: Game[]) {
        this.id = id;
        this.name = name;
        this.games = games;
    }
}