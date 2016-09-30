import * as React from "react";
import * as ReactDOM from "react-dom";
import {Station} from "./components/stations";

interface MainProps { compiler: string; framework: string; }

class Main extends React.Component<{}, {}> {
    render() {
        return <Station id="A" />;
    }
}

$(function() {
    ReactDOM.render(
        <Main/>,
        document.getElementById("main")
    );
});