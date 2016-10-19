import "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Stations} from "./components/stations";
import update = require("react-addons-update");

interface MainProps {
}

interface MainState {

}

class Main extends React.Component<MainProps, MainState> {

    render() {
        return (
            <div>
                <Stations/>
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