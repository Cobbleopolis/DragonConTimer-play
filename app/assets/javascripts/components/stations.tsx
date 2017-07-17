import * as React from "react";
import {Station} from "../models/station";
import {StationMessage} from "../messages/stationMessage";
import {StationMessageType} from "../messages/stationMessageType";
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
        $.getJSON("data/stations", (data: any) => {
            let initialStations: Map<string, Station> = new Map<string, Station>();
            for (let key in data)
                if (data.hasOwnProperty(key))
                    initialStations.set(key, data[key]);
            this.setState(update(this.state, {stations: {$set: initialStations}}) as StationsState)
        });
        this.socket.onopen = (event: Event) => {
            console.log("Connected to %s!", this.socket.url);
        };
        this.socket.onmessage = (event: MessageEvent) => {
            let updatedStations = this.state.stations;
            (JSON.parse(event.data) as StationMessage[]).map(stationMsg => {
                let station = updatedStations.get(stationMsg.id);
                if (stationMsg.messageType == StationMessageType.TIME_UPDATE) {
                    if (stationMsg.updatedTime !== undefined)
                        station.time = stationMsg.updatedTime;
                } else if (stationMsg.messageType == StationMessageType.FIELD_UPDATE) {
                    if (stationMsg.updatedName !== undefined)
                        station.name = stationMsg.updatedName;
                    if (stationMsg.updatedConsole !== undefined)
                        station.console = stationMsg.updatedConsole;
                    if (stationMsg.updatedGame !== undefined)
                        station.game = stationMsg.updatedGame;
                }
                updatedStations.set(stationMsg.id, station);
            });
            this.setState(update(this.state, {stations: {$set: updatedStations}}) as StationsState);
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
        setInterval(() => {
            let updatedStations = this.state.stations;
            updatedStations.forEach((station: Station) => station.time = Math.max(station.time - 1000, 0));
            this.setState(update(this.state, {stations: {$set: updatedStations}}) as StationsState)
        }, 1000);
        this.sendFieldUpdates = this.sendFieldUpdates.bind(this);
        this.showSetFields = this.showSetFields.bind(this);
        this.closeSetFields = this.closeSetFields.bind(this)
    }

    sendFieldUpdates(station: Station, updatedName: string, updatedConsole: string, updatedGame: string): any {
        // station.time = Math.random() * 3600000;
        let message: StationMessage = {
            messageType: StationMessageType.FIELD_UPDATE,
            id: station.id,
            updatedName: updatedName,
            updatedConsole: updatedConsole,
            updatedGame: updatedGame
        };
        this.socket.send(JSON.stringify([message]))
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
        this.sendFieldUpdates(station, "", "", "");
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
                <p>{stationElements.length}</p>
                {stationElements}
                <StationSetFieldsModal show={this.state.setFields.show}
                                       onClose={this.closeSetFields} updateValues={this.sendFieldUpdates}
                                       station={this.state.setFields.boundStation}/>
            </div>
        );
    }

}