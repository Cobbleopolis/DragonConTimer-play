import * as React from "react";

export interface StationProps {id: string}

export interface StationState {id: string; time: number;}

export class Station extends React.Component<StationProps, StationState> {

    serverRequest: JQueryXHR;

    static getInitialState(): StationState {
        return {id: 'Loading...', time: 0}
    }

    constructor(props: StationProps) {
        super(props);
        this.state = Station.getInitialState();
        this.serverRequest = $.ajax({
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
        setTimeout(() => {
            this.setState(this.state);
        }, 1000)
    }

    render() {
        console.log("Render");
        return (
            <div className="panel panel-default">
                <div className="panel-heading">{this.state.id}</div>
                <div className="panel-body">{this.state.time}</div>
            </div>
        );
    }
}