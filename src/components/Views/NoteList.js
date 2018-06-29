import React from 'react';
import {
    Card, CardText, CardBody,
    CardTitle
} from 'reactstrap';
import './NoteList.css'
import Button from '../Button/Button';

const NoteList = (props) => {
    return (
        <div className='notes-wrapper'>
            {props.notes.map(e => {
                console.log(e);
                return (
                    <Card key={e._id}>
                        <Button text='X' function={() => props.delete(e._id)} class='delete-button' />
                        <CardBody>
                            <CardTitle>{e.title}</CardTitle>
                            <CardText>{e.body}</CardText>
                        </CardBody>
                    </Card>
                );
            })}
        </div>
    );
};

export default NoteList;