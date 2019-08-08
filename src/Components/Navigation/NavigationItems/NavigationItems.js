import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from './NavigationItem/NavigationItem';

//navigationItems component - changes depending on if logged in and if admin 

const navigationItems = (props) =>{

    let navItem1;
    let navItem2;
    let navItem3;
    let navItem4;
    //nav item 1
    if(props.isAuthenticated){
        if(localStorage.getItem('id')==='16'){
            navItem1 = 
            <NavigationItem link='/userstats'>
               User Stats
            </NavigationItem>
        }else{
            navItem1 =
            <NavigationItem link='/myaccount'>
                My Account
            </NavigationItem>
        }   
    }else{
        navItem1 =
        <NavigationItem link='/login'>
            Log In
        </NavigationItem>
    }
    //nav item 2
    if(props.isAuthenticated){
        if(localStorage.getItem('id')==='16'){
            navItem2 = 
            <NavigationItem link='/generalstats'>
               General Stats
            </NavigationItem>
        }else{
            navItem2 =
            <NavigationItem link='/myroutines'>
                My Routines
            </NavigationItem>
        }   
    }else{
        navItem2 = null
    }
    //nav item 3
    if(props.isAuthenticated){
        if(localStorage.getItem('id')==='16'){
            navItem3 = 
            <NavigationItem link='/updateinfo'>
               Update Info
            </NavigationItem>
        }else{
            navItem3 =
            <NavigationItem link='/logout'>
                Log Out
            </NavigationItem>
        }   
    }else{
        navItem3 =
        <NavigationItem link='/register'>
            Join Us
        </NavigationItem>
    }
    //nav item 4
    if(props.isAuthenticated && localStorage.getItem('id')==='16'){
        navItem4 = 
        <NavigationItem link='/logout'>
            Log Out
        </NavigationItem>
    }

    return(
<ul className={classes.NavigationItems}>

{navItem1}
{navItem2}
{navItem3}
{navItem4}
</ul>
    );
  
};

export default navigationItems;