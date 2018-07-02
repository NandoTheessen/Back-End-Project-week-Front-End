import React, { Component } from 'react';
import {
    Card, CardText, CardBody
} from 'reactstrap';
import './NoteList.css'


class NoteList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            searchterm: ''
        }
    }

    render() {
        const filteredNotes = this.props.notes.filter(e => {
            if (e.title.includes(this.state.searchterm) || e.body.includes(this.state.searchterm)) return e
        })
        return (
            <div className='notes-wrapper'>
                <input id='searchbox' type="text" placeholder='Looking for something?' value={this.state.searchterm} onChange={this.onChange} />
                {filteredNotes.map(e => {
                    return (
                        <Card key={e._id} onClick={() => {
                            this.props.choseNote(e._id)
                            this.props.history.push(`/notes/${e._id}`)
                        }}>
                            <CardBody>
                                <h6 className='card-title'>{e.title}</h6>
                                <CardText>{e.body}</CardText>
                            </CardBody>
                        </Card>
                    );
                })}
            </div>
        );
    }

    onChange = (e) => {
        this.setState({ searchterm: e.target.value })
    }
}

export default NoteList;