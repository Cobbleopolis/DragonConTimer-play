import * as React from "react";
import * as R from "react-bootstrap";
import {Button, Modal, ModalBody, ModalFooter, ModalHeader, ModalTitle} from "react-bootstrap";
import {Station} from "../../../models/station";
import {ConsoleStore} from "../../../store/consoleStore";
import {Console} from "../../../models/console";
import update = require("react-addons-update");

export interface StationSetFieldsModalProps {
    show: boolean;
    onClose: () => void;
    updateValues: (station: Station, updatedName: string, updatedConsole: string, updatedGame: string) => void;
    station?: Station;
}

export interface StationSetFieldsModalState {
    name: string;
    console: string;
    game: string;
}

export class StationSetFieldsModal extends React.Component<StationSetFieldsModalProps, StationSetFieldsModalState> {

    constructor(props: StationSetFieldsModalProps) {
        super(props);
        if (props.station) {
            console.log("Setting state");
            this.state = {
                name: props.station.name,
                console: props.station.console,
                game: props.station.game
            };
        } else {
            this.state = {
                name: "",
                console: "",
                game: ""
            };
        }
        this.handleSubmit = this.handleSubmit.bind(this);
        this.onEnter = this.onEnter.bind(this);
    }

    onEnter() {
        this.setState({
            name: this.props.station.name,
            console: this.props.station.console,
            game: this.props.station.game
        });
    }

    handleChange(fieldName: string, event: any) {
        this.setState(update(this.state, {[fieldName]: {$set: event.target.value}}) as StationSetFieldsModalState)
    }

    handleSubmit(event: any) {
        this.props.updateValues(this.props.station,
            this.state.name,
            this.state.console,
            this.state.game
        );
        this.props.onClose();
        event.preventDefault();
    }

    render() {
        let consoleDropdown: JSX.Element[] = [];
        ConsoleStore.consoles.forEach((v: Console) => {
            consoleDropdown.push(<option key={v.id} value={v.id}>{v.name}</option>);
        });
        let gameDropdown: JSX.Element[] = [];
        ConsoleStore.getConsole(this.state.console).games.forEach(game => gameDropdown.push(<option key={game} value={game}>{game}</option>));
        gameDropdown = gameDropdown.sort((g1: JSX.Element, g2: JSX.Element) => g1.props.value.localeCompare(g2.props.value));
        return (
            <Modal show={this.props.show} onEnter={this.onEnter} onHide={this.props.onClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Set Fields</ModalTitle>
                </ModalHeader>

                <R.Form>
                    <ModalBody>
                        <R.FormGroup controlId="name">
                            <R.ControlLabel>Name</R.ControlLabel>
                            &nbsp;
                            <R.FormControl value={this.state.name} onChange={this.handleChange.bind(this, "name")}
                                           type="text" placeholder="John Doe"/>
                        </R.FormGroup>
                        &nbsp;
                        <R.FormGroup controlId="console">
                            <R.ControlLabel>Console</R.ControlLabel>
                            &nbsp;
                            <R.FormControl value={this.state.console} onChange={this.handleChange.bind(this, "console")}
                                           componentClass="select">
                                <option value="" disabled hidden>Select One</option>
                                {consoleDropdown}
                            </R.FormControl>
                        </R.FormGroup>
                        &nbsp;
                        <R.FormGroup controlId="game">
                            <R.ControlLabel>Game</R.ControlLabel>
                            &nbsp;
                            <R.FormControl disabled={this.state.console.length === 0}
                                           value={this.state.game} onChange={this.handleChange.bind(this, "game")}
                                           componentClass="select">
                                <option value="" disabled hidden>Select One</option>
                                {gameDropdown}
                            </R.FormControl>
                        </R.FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.props.onClose}>Close</Button>
                        <Button type="submit" bsStyle="success" onClick={this.handleSubmit}>Save</Button>
                    </ModalFooter>
                </R.Form>
            </Modal>
        );
    }
}