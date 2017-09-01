import * as React from "react";
import * as R from "react-bootstrap";
import {Station} from "../models/station";
import {Console} from "../models/console";
import {ConsoleStore} from "../store/consoleStore";
import {StationRef} from "../reference/stationRef";
import update = require("react-addons-update");

export interface StationProps {
    station: Station;
    showSetFields: (station: Station) => void;
    clearFields: () => void;
    resetTime: () => void;
    zeroTime: () => void;
}

export interface StationState {
    showSetFieldsModal: boolean;
}

const dangerPoint: number = 600000;
const warningPoint: number = 1200000;
const successPoint: number = 1800000;
const infoPoint: number = 2700000;

export class StationComponent extends React.Component<StationProps, StationState> {

    constructor(props: StationProps) {
        super(props);
        this.state = {
            showSetFieldsModal: false
        };
        this.actionSelected = this.actionSelected.bind(this);
        this.closeSetFields = this.closeSetFields.bind(this);
    }

    actionSelected(eventKey: any): void {
        switch (eventKey) {
            case "clear": {
                this.props.clearFields();
                break;
            }
            case "setFields": {
                this.props.showSetFields(this.props.station);
                break;
            }
            case "resetTime": {
                this.props.resetTime();
                break;
            }
            case "zeroTime": {
                this.props.zeroTime();
                break;
            }
            default: {
                console.error("Unknown event key: " + eventKey);
                break;
            }
        }
    }

    closeSetFields() {
        this.setState(update(this.state, {showSetFieldsModal: {$set: false}}) as StationState);
    }

    render() {
        let panelType: string = "default";
        if (this.props.station.time <= 0)
            if (this.props.station.name === "" && this.props.station.console === "" && this.props.station.game === "")
                panelType = "success";
            else
                panelType = "danger";

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
        let selectedConsole: Console = ConsoleStore.getConsole(this.props.station.console);
        return (
            <div className={"panel panel-" + panelType}>
                <div className="panel-heading">{this.props.station.id} ({this.props.station.consoleOptions.map(consoleId => ConsoleStore.getConsole(consoleId).name).join(", ")})</div>
                <div className="panel-body">
                    <R.ProgressBar bsStyle={progressBarStyle} now={this.props.station.time} max={StationRef.MAX_STATION_TIME}
                                   label={(minDisplay + " " + secDisplay).trim()}/>
                    <R.Form inline>
                        <R.FormGroup controlId="name">
                            <R.ControlLabel>Name</R.ControlLabel>
                            &nbsp;
                            <R.FormControl value={this.props.station.name} type="text" placeholder="John Doe" disabled/>
                        </R.FormGroup>
                        &nbsp;
                        <R.FormGroup controlId="console">
                            <R.ControlLabel>Console</R.ControlLabel>
                            &nbsp;
                            <R.FormControl value={selectedConsole.name} type="text" placeholder="" disabled/>
                        </R.FormGroup>
                        &nbsp;
                        <R.FormGroup controlId="game">
                            <R.ControlLabel>Game</R.ControlLabel>
                            &nbsp;
                            <R.FormControl value={this.props.station.game} type="text" placeholder="" disabled/>
                        </R.FormGroup>
                        &nbsp;
                        <R.FormGroup style={{float: "right"}}>
                            <R.DropdownButton title="Actions" onSelect={this.actionSelected} id="actions">
                                <R.MenuItem eventKey="setFields">Set Fields</R.MenuItem>
                                <R.MenuItem eventKey="resetTime">Reset Time</R.MenuItem>
                                <R.MenuItem eventKey="zeroTime">Zero Time</R.MenuItem>
                                <R.MenuItem eventKey="clear">Clear</R.MenuItem>
                            </R.DropdownButton>
                        </R.FormGroup>
                    </R.Form>
                </div>
            </div>
        );
    }
}