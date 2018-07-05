import React from 'react';
import NoteList from "./Views/NoteList";
import Sidebar from './Views/SideBar';
import CreateNote from './Input/CreateNote';
import Note from './Views/Note';
import { Route } from 'react-router';

const Content = (props) => {
    return (
        <div className='content'>
            <Route path='/notes' render={(x) => <Sidebar {...x} loggedin={props.loggedin} logout={props.logout} />} />
            <Route exact path='/notes' render={(x) => <NoteList {...x} delete={props.deleteNote} notes={props.notes} choseNote={props.choseNote} />} />
            <Route exact path='/notes/:id' render={x => <Note {...x} note={props.note} update={props.updateNote} delete={props.deleteNote} clone={props.cloneNote} />} />
            <Route path='/note' render={x => <Sidebar {...x} loggedin={props.loggedin} logout={props.logout} />} />
            <Route exact path='/note/create' render={x => <CreateNote {...x} page='create' function={props.saveNote} />} />
            <Route exact path='/note/edit' render={x => <CreateNote {...x} page='update' note={props.note} function={this.updateNote} />} />
            <button className='addNote-below750' onClick={() => props.history.push('/note/create')}>+</button>
            <button className='logout-below750' onClick={props.logout} ><i className="fas fa-door-open"></i></button>
        </div>
    );
};

export default Content;