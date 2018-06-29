import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Modal, ModalBody, ModalFooter } from 'reactstrap';
import Button from '../Button/Button'
import './Note.css'

class Note extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modal: false
        };
        this.toggle = this.toggle.bind(this);
    }
    toggle() {
        this.setState({
            modal: !this.state.modal
        });
    }

    render() {
        return (
            <div className="note-view">
                <Button text='delete' class='delete' function={() => this.toggle()} />

                <h4>{this.props.note.title}</h4>
                <div className="note-body">{this.props.note.body}</div>
                <Button text='edit' class='edit' function={() => this.props.history.push('/note/edit')} />
                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                    <ModalBody>
                        <h6>Are you sure you want to delete this?</h6>
                    </ModalBody>
                    <ModalFooter>
                        <Link to="/notes"><Button text="Delete" class="delete-modal" function={() => this.props.delete(this.props.note.id)} /></Link>
                        <Button text="No" class="no" function={this.toggle} />
                    </ModalFooter>
                </Modal>
            </div>
        );
    }
}

export default Note;