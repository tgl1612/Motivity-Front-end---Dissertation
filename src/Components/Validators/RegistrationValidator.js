import React from 'react';
import {Link} from 'react-router-dom';
import Button from '../UI/Button/Button';
import Spinner from '../UI/Spinner/Spinner';
import classes from './RegistrationValidator.css';

//registrationValidator component to display message to user on registration.

const registrationValidator =(props) =>{

        
    
    

    let registrationResult = null;

    if(!props.errorStatus && props.registeringStatus){
        registrationResult = 
        <div className = {classes.RegSuccess}>
        <h1>&#10004;</h1>
        <h4>You have been registered!</h4>
        <p>To access your account please log in.</p>
        <p>Make sure to try out the Assessment Routine before completing your first assessment!</p>

        <Link to='/login'><Button btnType='Blue'>Log In</Button></Link>
        </div>
    }

    if(props.loadingStatus){
        
        registrationResult =
           
                    <Spinner />
    }
    
    if(props.errorStatus){

        const newErrorMessages = props.passedErrorMessages.map(errorMessage =>{
            return <li key = {errorMessage.param}>{errorMessage.msg}</li>
        });
        
        registrationResult =
         <div>
                    <h4>Validation Error!</h4>
                    <ul>{newErrorMessages}</ul>
                    <h5>Please try again</h5></div>

    }
        return registrationResult;

}

export default registrationValidator;