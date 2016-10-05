export interface IStation {id: string; time: number;}

export class Station {

    id: string;

    time: number;

    constructor(id: string, time: number) {
        this.id = id;
        this.time = time;
    }
}