import React from 'react';
import classes from './Input.css';

//input component to be used where user has to input information

const input =(props)=>{

    let inputElement = null;
    const inputClasses = [classes.InputElement, classes.SelectElement];

    if(props.valid && props.needsValidation && props.touched){
        inputClasses.push(classes.Valid);
    }

    let maxInputLength = 16;
    if(props.elementConfig.type === 'email'){
        maxInputLength = 30;
    }
    if(props.elementConfig.type === 'password'){
        maxInputLength = 20;
    }


    switch(props.elementType){
        case('input'):
            inputElement = 
               <input 
               maxLength ={maxInputLength}
                className = {inputClasses.join(' ')}
                {...props.elementConfig}
                 value = {props.value}
                  onChange={props.inputted}/>
            
            break;
        case('select'):
            inputElement = (
              
                <select  
                className = {inputClasses.join(' ')}
                 value = {props.value}
                  onChange={props.inputted}
                 > 
                    {props.elementConfig.options.map(option=>(
                        <option key={option.value} value={option.value}>{option.displayValue}</option>
                    )
                    )}
                 </select>
                 
            )
            break;
        default:
            inputElement = <input  {...props.elementConfig}  value = {props.value} onChange={props.inputted}/>
    }

    return(
        <div className = {classes.Input}>
           <label>
                {props.label}
            </label>

            {inputElement}
        </div>
    );
}

export default input;