import * as React from "react";
import * as ReactDOM from "react-dom";
import {StationComponent} from "./components/stations";
import {Station} from "./models/station";
import {StationMessage} from "./messages/stationMessage";
import {MessageType} from "./messages/messageType";
import update = require("react-addons-update");

interface MainProps {}

interface MainState { stations: Station[] }

class Main extends React.Component<MainProps, MainState> {
    socket: WebSocket = new WebSocket("ws://" + window.location.host + "/stations");
    message:StationMessage = new StationMessage(MessageType.UPDATE, "A", new Station("A", 1800000));
    constructor(props: MainProps) {
        super(props);
        this.socket.onopen = (event: Event) => {
            console.log("Connected to %s!", this.socket.url);
            this.socket.send(JSON.stringify(this.message));
        };
        this.socket.onmessage = (event: MessageEvent) => {
            let msg:StationMessage = event.data;
            console.log("RECEIVE: " + msg);
            console.log(msg.messageType);
            if (msg.messageType === 1) {
                this.setState(update(this.state, {stations: {$push: [msg]}}))
            } else if (msg.messageType === 2) {
                let updatedStations = this.state.stations;
                for (let i = 0; i <= updatedStations.length; i++)
                    if (updatedStations[i].id === msg.id) {
                        updatedStations[i] = msg.station;
                        break;
                    }
                this.setState(update(this.state, {stations: {$set: updatedStations}}))
            }
        };
        this.state = {stations: []};
    }

    render() {
        let stations: any[] = [];
        this.state.stations.forEach(i => stations.push(<StationComponent station={i}/>));
        return (
            <div>
                <p>{JSON.stringify(this.state)}</p>
                {stations}
            </div>
        );
    }
}

$(function() {
    ReactDOM.render(
        <Main/>,
        document.getElementById("main")
    );
});