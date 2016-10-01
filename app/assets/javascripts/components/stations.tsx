import * as React from "react";
import { ProgressBar } from "react-bootstrap";

export interface StationProps {id: string}

export interface StationState {id: string; time: number;}

export class Station extends React.Component<StationProps, StationState> {

    static getInitialState(): StationState {
        return {id: 'Loading...', time: 0}
    }

    constructor(props: StationProps) {
        super(props);
        this.state = Station.getInitialState();
        $.ajax({
            type: 'GET',
            url: `/data/stations/${this.props.id}`,
            dataType: 'json',
            context: this,
            error(error: JQueryXHR, status: string, errorThrown: string) {
                console.error(status + ' | ' + errorThrown, error);
            },
            success(data: StationState) {
                this.setState(data);
            }
        });
        setInterval(() => {
            this.setState({time: this.state.time - 15000} as StationState);
        }, 250)
    }

    render() {
        return (
            <div className="panel panel-default">
                <div className="panel-heading">{this.state.id}</div>
                <div className="panel-body">
                    <ProgressBar now={this.state.time} max={3600000} label={`${Math.floor(this.state.time / 60000)}min`}/>
                </div>
            </div>
        );
    }
}