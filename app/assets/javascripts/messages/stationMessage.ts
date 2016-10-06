import {Station} from "../models/station";

interface IStationMessage {
    messageType:number;

    id: string;

    station:Station;
}

export class StationMessage implements IStationMessage {
    public messageType:number;

    public id:string;

    public station:Station;

    constructor(messageType:number, id:string, station?:Station) {
        this.messageType = messageType;
        this.id = id;
        this.station = station
    }

    static fromJSON(obj:IStationMessage):StationMessage {
        return $.extend({}, obj);
    }
}
