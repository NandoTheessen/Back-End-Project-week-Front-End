import React, { Component } from 'react';
import { withRouter } from 'react-router';
import Button from '../Button/Button';
import './CreateNote.css';

class CreateNote extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: '',
            body: ''
        }
    }

    render() {
        if (this.props.note) {
            console.log("note", this.props.note);
            var id = this.props.note._id
        }
        return (
            <div className='create-note'>

                <input onChange={this.onChange} placeholder="Note Title" type="text" id="note-title" value={this.state.title} name="title" />
                <textarea onChange={this.onChange} placeholder="Note Content" type="text" id="note-body" value={this.state.body} name="body" />
                {this.props.page === 'update' ?
                    (<Button text='Update Note' class='createNote' function={() => this.props.function({ title: this.state.title, body: this.state.body, id: id })} />) :
                    (<Button text='Create Note' class='createNote' function={() => this.props.function({ title: this.state.title, body: this.state.body })} />)
                }

            </div>
        );
    }

    componentDidMount = () => {
        if (this.props.note) this.setState(() => { return { title: this.props.note.title, body: this.props.note.body } })
    }

    onChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }
}

export default withRouter(CreateNote);