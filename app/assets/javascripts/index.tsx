import "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {StationComponent} from "./components/stations";
import {Station} from "./models/station";
import {StationMessage} from "./messages/stationMessage";
import {MessageType} from "./messages/messageType";
import update = require("react-addons-update");

interface MainProps {
}

interface MainState {
    stations: Station[]
}

class Main extends React.Component<MainProps, MainState> {
    socket: WebSocket = new WebSocket("ws://" + window.location.host + "/stations");

    constructor(props: MainProps) {
        super(props);
        this.socket.onopen = (event: Event) => {
            console.log("Connected to %s!", this.socket.url);
        };
        this.socket.onmessage = (event: MessageEvent) => {
            let msg: StationMessage = JSON.parse(event.data);
            if (msg.messageType === 1) {
                this.setState(update(this.state, {stations: {$push: [msg.station]}}) as MainState)
            } else if (msg.messageType === 2) {
                let updatedStations = this.state.stations;
                for (let i = 0; i <= updatedStations.length; i++)
                    if (updatedStations[i].id === msg.id) {
                        updatedStations[i] = msg.station;
                        break;
                    }
                this.setState(update(this.state, {stations: {$set: updatedStations}}) as MainState)
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

    sendUpdate(station: Station): any {
        station.time = Math.random() * 3600000;
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

$(function () {
    ReactDOM.render(
        <Main/>,
        document.getElementById("main")
    );
});