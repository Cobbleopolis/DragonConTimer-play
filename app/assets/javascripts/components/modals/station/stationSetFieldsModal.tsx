import * as React from "react";
import * as R from "react-bootstrap";
import {Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button} from "react-bootstrap";
import {Station} from "../../../models/station";

export interface StationSetFieldsModalProps {
    show: boolean;
    onClose: () => void;
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
        if (props.station)
            this.state = {
                name: props.station.name,
                console: props.station.console,
                game: props.station.game
            };
        else
            this.state = {
                name: "",
                console: "",
                game: ""
            };
        // this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event: any) {
        console.log(typeof event);
        console.log(event.target());
        event.preventDefault();
    }

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Set Fields</ModalTitle>
                </ModalHeader>
                <form></form>

                <R.Form onSubmit={this.onSubmit}>
                    <ModalBody>
                        <R.FormGroup controlId="name">
                            <R.ControlLabel>Name</R.ControlLabel>
                            &nbsp;
                            <R.FormControl value={this.state.name} type="text" placeholder="John Doe"/>
                        </R.FormGroup>
                        &nbsp;
                        <R.FormGroup controlId="console">
                            <R.ControlLabel>Console</R.ControlLabel>
                            &nbsp;
                            <R.FormControl value={this.state.console} componentClass="select">
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
                            <R.FormControl disabled={this.state.console.length === 0}
                                           value={this.state.game} componentClass="select">
                                <option value="" disabled hidden>Select One</option>
                                <option value="game1">Game 1</option>
                                <option value="game2">Game 2</option>
                                <option value="game3">Game 3</option>
                            </R.FormControl>
                        </R.FormGroup>

                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={this.props.onClose}>Close</Button>
                        <Button type="submit" onClick={(event: any) => {console.log(event); event.preventDefault()}}>Save</Button>
                    </ModalFooter>
                </R.Form>
            </Modal>
        );
    }
}