import React from 'react';
import NavigationItems from '../NavigationItems/NavigationItems';
import classes from './DropdownMenu.css'
import Backdrop from '../../UI/Backdrop/Backdrop';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';

//dropdownMenu component for drop down menu in nav bar when in mobile

const dropdownMenu =(props) =>{

    let dropdownMenuClasses = [classes.DropdownMenu, classes.Close];
    if(props.opened){
        dropdownMenuClasses = [classes.DropdownMenu, classes.Open];
    }
    
    return(
        <Auxiliary>
        <Backdrop show ={props.opened} clicked={props.closed}/>
        <div className = {dropdownMenuClasses.join(' ')} onClick ={props.closed}>
            <nav>
                <NavigationItems isAuthenticated = {props.isAuth}/>
            </nav>
        </div>
        </Auxiliary>
    );
};

export default dropdownMenu;