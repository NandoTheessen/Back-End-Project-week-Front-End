import React from 'react';
import Button from './Button';
import { Link } from 'react-router-dom';

const SideBar = (props) => {
    if (props.loggedin === false) props.history.push('/')
    return (
        <div className='sidebar'>
            <h1>Easy Notes</h1>
            <p>Welcome Back!</p>
            <Link to='/notes/create'><Button text='+' class='addNote' /></Link>
            <Button text='LogOut' function={props.logout} />
        </div>
    );
};

export default SideBar;