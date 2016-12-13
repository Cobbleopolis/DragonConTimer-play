import {StationMessageType} from "./stationMessageType";

interface IStationMessage {

}

export class StationMessage {

    messageType:StationMessageType;

    id: string;

    updatedTime?:number;

    updatedName?:string;

    updatedConsole?:string;

    updatedGame?:string;

    static fromJSON(obj:IStationMessage):StationMessage {
        return $.extend({}, obj);
    }
}
