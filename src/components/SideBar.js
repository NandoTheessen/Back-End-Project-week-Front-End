import React from 'react';
import Button from './Button';

const SideBar = (props) => {
    return (
        <div className='sidebar'>
            <h1>Easy Notes</h1>
            <p>Welcome Back!</p>
            <Button text='+' class='addNote' function={this.props.history.push('/createNote')} />
            <Button text='LogOut' function={props.logout} />
        </div>
    );
};

export default SideBar;