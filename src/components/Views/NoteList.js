import React from 'react';
import {
    Card, CardText, CardBody
} from 'reactstrap';
import './NoteList.css'

const NoteList = (props) => {
    console.log("notelist props", props);
    return (
        <div className='notes-wrapper'>
            {props.notes.map(e => {
                return (
                    <Card key={e._id} onClick={() => {
                        props.choseNote(e._id)
                        props.history.push(`/notes/${e._id}`)
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
};

export default NoteList;