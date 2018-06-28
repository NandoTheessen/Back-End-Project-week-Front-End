import React from 'react';
import Button from './Button';

const SideBar = () => {
    return (
        <div className='sidebar'>
            <h1>Easy Notes</h1>
            <p>Welcome Back!</p>
            <Button text='LogOut' />
        </div>
    );
};

export default SideBar;