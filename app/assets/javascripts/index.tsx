import * as React from "react";
import * as ReactDOM from "react-dom";
import {Station} from "./components/stations";

interface MainProps {}

interface MainState { ids: string[] }

class Main extends React.Component<MainProps, MainState> {
    socket: WebSocket = new WebSocket("ws://" + window.location.host + "/stations");
    constructor(props: MainProps) {
        super(props);
        this.socket.onopen = (event: Event) => {
            console.log("Connected to %s!", this.socket.url);
            this.socket.send("Hello!");
        };
        this.socket.onmessage = (event: MessageEvent) => {
            console.log(event.data);
        };
        this.state = {ids: []};
        $.ajax({
            type: 'GET',
            url: `/data/stationKeys`,
            dataType: 'json',
            context: this,
            error(error: JQueryXHR, status: string, errorThrown: string) {
                console.error(status + ' | ' + errorThrown, error);
            },
            success(data: string[]) {
                this.setState({ids: data});
            }
        });
    }

    render() {
        let stations: any = [];
        this.state.ids.forEach(i => stations.push(<Station id={i}/>));
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