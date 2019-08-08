import React from 'react';
import classes from './Backdrop.css';

//backdrop component to be used with dropdown menu and modal

const backdrop = (props) =>(
    props.show ? <div className ={classes.Backdrop} onClick={props.clicked}></div> : null
);

export default backdrop;