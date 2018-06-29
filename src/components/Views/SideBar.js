import React from 'react';
import Button from '../Button/Button';
import { Link } from 'react-router-dom';
import './SideBar.css'

const SideBar = (props) => {
    if (props.loggedin === false) props.history.push('/')
    return (
        <div className='sidebar'>
            <h3>Easy Notes</h3>
            <p>Welcome Back!</p>
            <Link to='/notes/create'><Button text='+' class='addNote' /></Link>
            <Button text='LogOut' class='logout' function={props.logout} />
        </div>
    );
};

export default SideBar;