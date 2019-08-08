import React from 'react';
import classes from './NotFound.css';

//not found page to redirect users to in case of error 

const notFound = ()=>{

    return (
        <div className ={classes.NotFound}>
            <div className ={classes.InformationBox}>
                <h3>Sorry!!</h3>
                <h3>There was a problem there. Please try again</h3>         
            </div>
        </div>
    );
};

export default notFound;

