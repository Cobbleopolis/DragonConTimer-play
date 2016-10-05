import * as React from "react";
import { ProgressBar } from "react-bootstrap";
import {Station} from "../models/station";

export interface StationProps {station: Station}

export interface StationState {id: string; time: number;}

export class StationComponent extends React.Component<StationProps, {}> {

    static getInitialState(): StationState {
        return {id: 'Loading...', time: 0}
    }

    constructor(props: StationProps) {
        super(props);
        // this.state = StationComponent.getInitialState();
        // $.ajax({
        //     type: 'GET',
        //     url: `/data/stations/${this.props.id}`,
        //     dataType: 'json',
        //     context: this,
        //     error(error: JQueryXHR, status: string, errorThrown: string) {
        //         console.error(status + ' | ' + errorThrown, error);
        //     },
        //     success(data: StationState) {
        //         this.setState(data);
        //     }
        // });
        // setInterval(() => {
        //     this.setState({time: this.state.time - 15000} as StationState);
        // }, 250)
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">{this.props.station.id}</div>
                <div className="panel-body">
                    <ProgressBar now={this.props.station.time} max={3600000} label={`${Math.floor(this.props.station.time / 60000)}min`}/>
                </div>
            </div>
        );
    }
}