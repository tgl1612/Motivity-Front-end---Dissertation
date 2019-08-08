import React from 'react';
import classes from './Spinner.css'


//spinner component to be displayed when content is loading

const spinner = () =>(

    <div className = {classes.Loader}>Loading...</div>
);

export default spinner;