import * as React from "react";
import * as ReactDOM from "react-dom";
import {Station} from "./components/stations";

interface MainProps {}

interface MainState { ids: string[] }

class Main extends React.Component<MainProps, MainState> {
    constructor(props: MainProps) {
        super(props);
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