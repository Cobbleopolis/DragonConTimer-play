import {StationMessageType} from "./stationMessageType";

interface IStationMessage {

}

export class StationMessage {

    messageType:StationMessageType;

    id: string;

    updatedTime:number;

    updatedName:string;

    updatedConsole:string;

    updatedGame:string;

    constructor(messageType: StationMessageType, id: string, updatedTime: number = 0, updatedName: string = "", updatedConsole: string = "", updatedGame: string = "") {
        this.messageType = messageType;
        this.id = id;
        this.updatedTime = updatedTime;
        this.updatedName = updatedName;
        this.updatedConsole = updatedConsole;
        this.updatedGame = updatedGame;
    }

    static fromJSON(obj:IStationMessage):StationMessage {
        return $.extend({}, obj);
    }
}
