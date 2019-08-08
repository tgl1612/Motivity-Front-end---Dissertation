import React from 'react';
import {Link} from 'react-router-dom';
import classes from './Footer.css';

//footer component to be used on index page 

const footer = () =>(
    <footer className ={classes.Footer}>
        <Link to='/contact'><p>Contact</p></Link>

    </footer>
);

export default footer;