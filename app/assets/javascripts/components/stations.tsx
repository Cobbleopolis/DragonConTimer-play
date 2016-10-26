import * as React from "react";
import {Station} from "../models/station";
import {StationMessage} from "../messages/stationMessage";
import {MessageType} from "../messages/messageType";
import {StationComponent} from "./station";
import {StationSetFieldsModal} from "./modals/station/stationSetFieldsModal";
import update = require("react-addons-update");

export interface StationsProps {

}

export interface StationsState {
    stations: Map<string, Station>;
    setFields: {
        show: boolean;
        boundStation: Station;
    };
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
            let updatedStations = this.state.stations;
            if (msg.messageType === 1) {
                updatedStations.set(msg.id, msg.station);
                this.setState(update(this.state, {stations: {$set: updatedStations}}) as StationsState)
            } else if (msg.messageType === 2) {
                updatedStations.set(msg.id, msg.station);
                this.setState(update(this.state, {stations: {$set: updatedStations}}) as StationsState)
            }
        };
        this.socket.onerror = (event: Event) => {
            console.log(event);
        };
        this.socket.onclose = (event: CloseEvent) => {
            console.log(event);
        };
        this.state = {
            stations: new Map<string, Station>(),
            setFields: {
                show: false,
                boundStation: null
            }
        };
        this.sendUpdate = this.sendUpdate.bind(this);
        this.showSetFields = this.showSetFields.bind(this);
        this.closeSetFields = this.closeSetFields.bind(this)
    }

    sendUpdate(station: Station, ...fieldKey: [string, any][]): any {
        station.time = Math.random() * 3600000;
        fieldKey.forEach((fk) => {
            station = update(station, {[fk[0]]: {$set: fk[1]}}) as Station;
        });
        let message: StationMessage = new StationMessage(MessageType.UPDATE, station.id, station);
        this.socket.send(JSON.stringify(message))
    }

    showSetFields(station: Station) {
        this.setState(update(this.state, {
            setFields: {
                show: {$set: true},
                boundStation: {$set: station}
            }
        }) as StationsState);
    }

    closeSetFields() {
        this.setState(update(this.state, {
            setFields: {show: {$set: false}},
            boundStation: {$set: null}
        }) as StationsState);
    }

    clearStation(station: Station) {
        this.sendUpdate(station, ["name", ""], ["console", ""], ["game", ""]);
    }

    render() {
        let stationElements: JSX.Element[] = [];
        this.state.stations.forEach((v: Station, k: string) => {
            stationElements.push(<StationComponent key={k} station={v} showSetFields={this.showSetFields}
                                                   clearFields={this.clearStation.bind(this, v)}/>)
        });
        stationElements = stationElements.sort((s1: JSX.Element, s2: JSX.Element) => (s1.props.station.id > s2.props.station.id) ? 1 : -1);
        return (
            <div>
                {stationElements}
                <StationSetFieldsModal show={this.state.setFields.show}
                                       onClose={this.closeSetFields} updateValues={this.sendUpdate}
                                       station={this.state.setFields.boundStation}/>
            </div>
        );
    }

}