import * as React from "react";
import {Modal, ModalHeader, ModalTitle, ModalBody, ModalFooter, Button} from "react-bootstrap";

export interface StationSetFieldsModalProps {
    show: boolean;
    onClose: () => void;
}

export interface StationSetFieldsModalState {

}

export class StationSetFieldsModal extends React.Component<StationSetFieldsModalProps, StationSetFieldsModalState> {

    render() {
        return (
            <Modal show={this.props.show} onHide={this.props.onClose}>
                <ModalHeader closeButton>
                    <ModalTitle>Set Fields</ModalTitle>
                </ModalHeader>
                <ModalBody>
                    <p>Testing stuff</p>
                </ModalBody>
                <ModalFooter>
                    <Button onClick={this.props.onClose}>Close</Button>
                </ModalFooter>
            </Modal>
        );
    }
}