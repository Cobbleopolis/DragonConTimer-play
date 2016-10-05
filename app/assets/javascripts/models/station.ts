export interface IStation {id: string; time: number;}

export class Station implements IStation {

    public id:string;

    public time:number;

    constructor(id: string, time: number) {
        this.id = id;
        this.time = time;
    }

    static fromJSON(obj:IStation):Station {
        return $.extend({}, obj)
    }
}