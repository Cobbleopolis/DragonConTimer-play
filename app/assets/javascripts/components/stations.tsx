import * as React from "react";
import { ProgressBar, Button } from "react-bootstrap";
import {Station, IStation} from "../models/station";

export interface StationProps {station: Station, sendUpdate: (station: Station) => any}

export interface StationState {id: string; time: number;}

const dangerPoint: number = 600000;
const warningPoint: number = 1200000;
const successPoint: number = 1800000;
const infoPoint: number = 2700000;

export class StationComponent extends React.Component<StationProps, {}> {

    constructor(props: StationProps) {
        super(props);
        this.update = this.update.bind(this);
    }

    update() {
        this.props.sendUpdate(this.props.station)
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
                    <ProgressBar bsStyle={progressBarStyle} now={this.props.station.time} max={3600000} label={(minDisplay + " " + secDisplay).trim()}/>
                    <Button onClick={this.update}>Send</Button>
                </div>
            </div>
        );
    }
}