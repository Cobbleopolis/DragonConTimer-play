import * as React from "react";
import {Station} from "../models/station";
import {StationMessage} from "../messages/stationMessage";
import {MessageType} from "../messages/messageType";
import {StationComponent} from "./station";
import update = require("react-addons-update");

export interface StationsProps {

}

export interface StationsState {
    stations: Station[]
}

export class Stations extends React.Component<StationsProps, StationsState> {
    socket: WebSocket = new WebSocket("ws://" + window.location.host + "/stations");

    constructor(props: StationsProps) {
        super(props);
        this.socket.onopen = (event: Event) => {
            console.log("Connected to %s!", this.socket.url);
        };
        this.socket.onmessage = (event: MessageEvent) => {
            let msg: StationMessage = JSON.parse(event.data);
            if (msg.messageType === 1) {
                this.setState(update(this.state, {stations: {$push: [msg.station]}}) as StationsState)
            } else if (msg.messageType === 2) {
                let updatedStations = this.state.stations;
                for (let i = 0; i <= updatedStations.length; i++)
                    if (updatedStations[i].id === msg.id) {
                        updatedStations[i] = msg.station;
                        break;
                    }
                this.setState(update(this.state, {stations: {$set: updatedStations}}) as StationsState)
            }
        };
        this.socket.onerror = (event: Event) => {
            console.log(event);
        };
        this.socket.onclose = (event: CloseEvent) => {
            console.log(event);
        };
        this.state = {stations: []};
        this.sendUpdate = this.sendUpdate.bind(this)
    }

    sendUpdate(station: Station, ...fieldKey: [string, any][]): any {
        station.time = Math.random() * 3600000;
        fieldKey.forEach((fk) => {
            station = update(station, {[fk[0]]: {$set: fk[1]}}) as Station;
        });
        let message: StationMessage = new StationMessage(MessageType.UPDATE, station.id, station);
        this.socket.send(JSON.stringify(message))
    }

    render() {
        return (
            <div>
                {this.state.stations
                    .sort((s1: Station, s2: Station) => (s1.id.charCodeAt(0) > s2.id.charCodeAt(0)) ? 1 : -1)
                    .map(station => <StationComponent key={station.id} station={station}
                                                      sendUpdate={this.sendUpdate}/>)}
            </div>
        );
    }

}