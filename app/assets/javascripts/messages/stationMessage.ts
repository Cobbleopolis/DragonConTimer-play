import {MessageType} from "./messageType";
import {Station} from "../models/station";
export class StationMessage {
    messageType: MessageType;

    id: string;

    station?: Station;

    constructor(messageType: MessageType, id: string, station?: Station) {
        this.messageType = messageType;
        this.id = id;
        this.station = station
    }
}
