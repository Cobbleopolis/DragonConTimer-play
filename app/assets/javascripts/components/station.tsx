import * as React from "react";
import * as R from "react-bootstrap";
import {Station} from "../models/station";
import update = require("react-addons-update");

export interface StationProps {
    station: Station,
    sendUpdate: (station: Station, ...fieldKey: [string, any][]) => any
}

export interface StationState {
}

const dangerPoint: number = 600000;
const warningPoint: number = 1200000;
const successPoint: number = 1800000;
const infoPoint: number = 2700000;

export class StationComponent extends React.Component<StationProps, StationState> {

    constructor(props: StationProps) {
        super(props);
        this.actionSelected = this.actionSelected.bind(this);
        this.clear = this.clear.bind(this);
    }

    handleChange(formField: string, e: any): void {
        this.props.sendUpdate(this.props.station, [formField, e.target.value])
    }

    actionSelected(eventKey: any): void {
        switch (eventKey) {
            case "clear":
                this.clear();
                break;
        }
    }

    clear() {
        this.props.sendUpdate(this.props.station, ["name", ""], ["console", ""], ["game", ""]);
    }

    render() {
        let progressBarStyle: string = null;
        if (this.props.station.time <= dangerPoint)
            progressBarStyle = "danger";
        else if (this.props.station.time <= warningPoint)
            progressBarStyle = "warning";
        else if (this.props.station.time <= successPoint)
            progressBarStyle = "success";
        else if (this.props.station.time <= infoPoint)
            progressBarStyle = "info";
        let min: number = Math.floor(this.props.station.time / 60000);
        let minDisplay: string = (min != 0) ? `${min}min` : "";
        let sec: number = Math.floor(this.props.station.time % 60000 / 1000);
        let secDisplay: string = (sec != 0) ? `${sec}sec` : "";
        return (
            <div className="panel panel-default">
                <div className="panel-heading">{this.props.station.id}</div>
                <div className="panel-body">
                    <R.ProgressBar bsStyle={progressBarStyle} now={this.props.station.time} max={3600000}
                                   label={(minDisplay + " " + secDisplay).trim()}/>
                    <R.Form inline>
                        <R.FormGroup controlId="name">
                            <R.ControlLabel>Name</R.ControlLabel>
                            &nbsp;
                            <R.FormControl value={this.props.station.name} type="text" placeholder="John Doe"
                                           onChange={this.handleChange.bind(this, "name")}/>
                        </R.FormGroup>
                        &nbsp;
                        <R.FormGroup controlId="console">
                            <R.ControlLabel>Console</R.ControlLabel>
                            &nbsp;
                            <R.FormControl value={this.props.station.console} componentClass="select" onChange={this.handleChange.bind(this, "console")}>
                                <option value="" disabled hidden>Select One</option>
                                <option value="xbox">Xbox One</option>
                                <option value="ps4">Play Station 4</option>
                                <option value="wiiu">Wii U</option>
                            </R.FormControl>
                        </R.FormGroup>
                        &nbsp;
                        <R.FormGroup controlId="game">
                            <R.ControlLabel>Game</R.ControlLabel>
                            &nbsp;
                            <R.FormControl disabled={this.props.station.console.length === 0} value={this.props.station.game} componentClass="select" onChange={this.handleChange.bind(this, "game")}>
                                <option value="" disabled hidden>Select One</option>
                                <option value="game1">Game 1</option>
                                <option value="game2">Game 2</option>
                                <option value="game3">Game 3</option>
                            </R.FormControl>
                        </R.FormGroup>
                        &nbsp;
                        <R.FormGroup style={{float: "right"}}>
                            <R.DropdownButton title="Actions" onSelect={this.actionSelected} id="actions">
                                <R.MenuItem eventKey="clear">Clear</R.MenuItem>
                            </R.DropdownButton>
                        </R.FormGroup>
                    </R.Form>
                </div>
            </div>
        );
    }
}