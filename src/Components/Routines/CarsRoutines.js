import React from 'react';
import classes from './Routines.css';
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom';


//component for Cars and Pre-assessment Routine boxes on myroutines page. 
const carsRoutines = (props) =>{

    let carsId = props.id;

    let difficulty = '';
    const difficultyLevel = props.level;

        
    if(difficultyLevel === 1){
        difficulty = <h5 style={{color: 'green'}}><strong>Level: </strong>Novice</h5>
    }else if(difficultyLevel === 2){
        difficulty = <h5 style={{color: 'orange'}}><strong>Level: </strong>Intermediate</h5>
    }else if(difficultyLevel ===3){
        difficulty = <h5 style={{color: 'red'}}><strong>Level: </strong>Advanced</h5>
    }

    
    return(<div className = {classes.Routines}>
    <div className ={classes.SubSection}>
    <div className ={classes.SubSub}>
       
        
       <h5><strong>{props.title}</strong></h5>
       </div>

       <div className={classes.SubSub}>
          <Link to={
          '/myroutinealt/' + carsId
           
          
        }
          
          ><Button btnType ='ViewRoutine'>View Routine</Button></Link> 
       </div>                    </div>
    <div className={classes.SubSectionCars}>
        
    
            {difficulty}
        </div>
</div>
)};

export default carsRoutines;
