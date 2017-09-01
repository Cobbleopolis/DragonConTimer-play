export interface IGame {
    name: string;
    count: number;
}

export class Game implements IGame {

    public name: string;

    public count: number;

    constructor(name: string, count: number) {
        this.name = name;
        this.count = count;
    }
}