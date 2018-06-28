import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from './Button';
import './CreateNote.css';

class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
        var { id } = this.props.match.params
        return (
            <div className='create-note'>

                <input onChange={this.onChange} placeholder="Note Title" type="text" id="note-title" value={this.state.title} name="title" />
                <textarea onChange={this.onChange} placeholder="Note Content" type="text" id="note-body" value={this.state.body} name="body" />
                {this.props.page === 'update' ?
                    <Button text='Update Note' class='createNote' function={() => this.props.function()} /> :
                    <Button text='Create Note' class='createNote' function={() => this.props.function({ title: this.state.title, body: this.state.body })} />
                }

            </div>
        );
    }
}

export default withRouter(CreateNote);