import React from 'react';
import classes from './DropdownMenuToggle.css'

const dropdownMenuToggle = (props) =>(
    <div onClick = {props.clicked} className={classes.DropdownMenuToggle}>
        
        <div></div>
        <div></div>
        <div></div>
    </div>

);


export default dropdownMenuToggle;