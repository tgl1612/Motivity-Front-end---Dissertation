import React from 'react';
import classes from './Routines.css';
import Button from '../UI/Button/Button';
import {Link} from 'react-router-dom';

//routines component for routine boxes to be used in the MyRoutines page for users

const routines = (props) =>{

    let assessmentId = props.id;
    const title = props.title
    let difficulty = '';
    const difficultyLevel = props.level;

        
        if(difficultyLevel === 1){
            difficulty = <h5 style={{color: 'green'}}><strong>Level: </strong>Novice</h5>
        }else if(difficultyLevel === 2){
            difficulty = <h5 style={{color: 'orange'}}><strong>Level: </strong>Intermediate</h5>
        }
            
    return(
    <div className = {difficultyLevel !== 3 ? classes.Routines : classes.Invisible}>
    <div className ={classes.SubSection}>
    <div className ={classes.SubSub}>
       
        
       <h5><strong>{title}</strong></h5>
       </div>

       <div className={classes.SubSub}>
          <Link to=
     
        {
          '/myroutine/' + assessmentId +'/'+ encodeURIComponent(title) 
        }
          
          > <Button btnType ='ViewRoutine'>View Routine</Button></Link>
       </div>                    </div>
    <div className={classes.SubSection}>
        <div className ={classes.SubSub}>     
            {difficulty}
        </div>

        <div className ={classes.SubSub}>
        <Link to={
          '/deleteroutine/' + assessmentId +'/'+ encodeURIComponent(title)
        } 
          >
            <Button btnType ='Delete'>Delete Routine</Button>
            </Link>
        </div>
    </div>
</div>
)};

export default routines;