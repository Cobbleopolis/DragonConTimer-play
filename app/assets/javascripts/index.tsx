import * as React from "react";
import * as ReactDOM from "react-dom";
import {StationComponent} from "./components/stations";
import {Station} from "./models/station";
import {StationMessage} from "./messages/stationMessage";
import {MessageType} from "./messages/messageType";

interface MainProps {}

interface MainState { stations: Station[] }

class Main extends React.Component<MainProps, MainState> {
    socket: WebSocket = new WebSocket("ws://" + window.location.host + "/stations");
    constructor(props: MainProps) {
        super(props);
        this.socket.onopen = (event: Event) => {
            console.log("Connected to %s!", this.socket.url);
            this.socket.send(JSON.stringify(new StationMessage(MessageType.UPDATE, "A", new Station("A", 1800000))));
        };
        this.socket.onmessage = (event: MessageEvent) => {
            let message: StationMessage = event.data as StationMessage;
            if (message.messageType === MessageType.ADD) {
                this.setState({stations: this.state.stations.concat(message.station)})
            } else if (message.messageType === MessageType.UPDATE) {
                let index = -1;
                for (let i = 0; i <= this.state.stations.length; i++)
                    if (this.state.stations[i].id === message.id) {
                        this.state.stations[i] = message.station;
                        break;
                    }
                this.setState(this.state)
            }
            console.log(event.data);
        };
        this.state = {stations: []};
    }

    render() {
        let stations: any[] = [];
        this.state.stations.forEach(i => stations.push(<StationComponent station={i}/>));
        return (
            <div>
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