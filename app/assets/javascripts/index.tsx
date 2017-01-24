import "jquery";
import * as React from "react";
import * as ReactDOM from "react-dom";
import {Stations} from "./components/stations";
import {ConsoleStore} from "./store/consoleStore";
import {Console} from "./models/console";
import update = require("react-addons-update");

interface MainProps {
}

interface MainState {

}

class Main extends React.Component<MainProps, MainState> {

    constructor(props: MainProps) {
        super(props);
        $.getJSON("data/consoles", (data: Console[]) => {
            console.log("Got consoles");
            ConsoleStore.addConsole(...data)
        });
    }

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