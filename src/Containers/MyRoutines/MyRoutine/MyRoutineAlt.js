import React, {Component} from 'react';
import classes from './MyRoutine.css';
import axios from '../../../axios-instance';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect, Link} from 'react-router-dom';
import Button from '../../../Components/UI/Button/Button';

//My RoutineAlt page to show individual CARs routines and the Assessment Routine

class MyRoutineAlt extends Component{
       
    state ={
        routine: {},
        loading: true,
        isAuth: true,
        loaded: false,
        error: false

    }
    componentDidMount(){
        window.scrollTo(0, 0);
        let id = this.props.match.params.id ;

        // to stop URL changing 
        if(id > 4){
            id = 1;
        }

        Promise.all([axios.get('/routines/generalroutines/' + id, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }),
        axios.get( '/user/' + localStorage.getItem('id'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        ])
        .then(response=>{

            if(response[1].data.user.assessments.length === 0){
                if(response[0].data.exercise.name !== 'Assessment Routine'){
                    this.setState({isAuth: false})
                }
            }else if( response[0].data.exercise.difficultyId>response[1].data.user.assessments[0].userLevelId  ){
                this.setState({isAuth: false})
            }

            this.setState({
                routine: response[0].data.exercise,
                loaded: true

            })

        })
        .catch(error=>{
            this.setState({
                error: true
            })
        })
        ;
    } 

    hideSpinner = () => {
        this.setState({
          loading: false
        });
      };
   
    render(){

        const exercise = this.state.routine; 
        if(!this.state.isAuth){
            return <Redirect to ='/error' />
        }

        if(this.state.error){
            return <Redirect to ='/error' />
        }           

        if(!this.state.loaded){
            return <Spinner />
        }
        
        return(
            <div className = {classes.Container}> 
            <div className={classes.InformationBox}>
                        
                        <div className ={classes.TextBox}>              
                            <div className = {classes.ExerciseText}>
                                <h4>{exercise.name}</h4>
                            </div>

                            <div className = {classes.ExerciseText}>

                            <h6>{exercise.description}</h6>
                            </div>
                        </div>

                        <div className ={classes.Video}>

                        {this.state.loading ? (
                            <Spinner
                            />
                            ) : null}
                             <div className ={this.state.loading ? classes.Empty : null}>
                             <iframe 
                                title = 'video'
                                min-height= '300px'
                                width="100%"
                                src= {exercise.videoPath}
                                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad ={this.hideSpinner}>
                             </iframe>
                             </div>
                        </div>
                     </div>
                     <div className = {classes.Button}>
                     {exercise.id === 1
                          ?<Link to='/assessment'><Button btnType ='Green'>Take assessment</Button></Link>
                          : null}
                         <Link to='/myroutines'><Button btnType = 'Blue'>Back</Button></Link>
                         
                    </div>

            </div>
        );
    }
}

export default MyRoutineAlt;


