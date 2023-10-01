/* eslint-disable no-unused-vars */
import React from 'react';
import logo from '../assets/react-icon-small.png';

export default function Navbar() {
    return (
        <nav>
            <img src={logo} className='nav--logo' />
            <h2 className='nav--logo_text'>ReactFacts</h2>
            <h3 className='nav--title'>React Course - Part 1</h3>
        </nav>
    )
}
