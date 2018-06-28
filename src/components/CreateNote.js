import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from './Button';

class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }

    onChange = (e) => {
        this.setState(prevState => {
            return {
                [e.target.name]: e.target.value
            }
        })
    }
    render() {
        var { id } = this.props.match.params
        return (
            <div>
                <input onChange={this.onChange} placeholder="Note Title" type="text" id="note-title" value={this.state.title} name="title" />
                <textarea onChange={this.onChange} placeholder="Note Content" type="text" id="note-text" value={this.state.body} name="body" />
                {this.props.page === edit ?
                    <Button text='Update Note' class='createNote' onClick={} /> :
                    <Button text='Create Note' class='createNote' onClick={} />
                }
            </div>
        );
    }
}

export default withRouter(CreateNote);