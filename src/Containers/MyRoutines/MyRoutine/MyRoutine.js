import React, {Component} from 'react';
import classes from './MyRoutine.css';
import axios from '../../../axios-instance';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect, Link} from 'react-router-dom';
import Button from '../../../Components/UI/Button/Button';

//MyRoutine page to display individual personalised routines 

class MyRoutine extends Component{
       
    state ={
        assessmentId: this.props.match.params.id,
        routine: [],
        loading: true,
        title: decodeURIComponent(this.props.match.params.title),
        routineStatus: true,
        loading2: true
    }

    componentDidMount(){
        window.scrollTo(0, 0);

        Promise.all([

            axios.get('/routines/routine/' + this.state.assessmentId,{
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            } ),axios.get('/routines/countroutine/' + localStorage.getItem('id') + '/' +  this.state.assessmentId, {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })])
         .then(response=>{
            this.setState({
                routine: response[0].data.routine,
                loading2: false
            })    
            if(this.state.routine.length===0  || response[1].data.count ===0){
               this.setState({routineStatus: false}) 
            }
            
            const titleCheck = this.state.title.split(' ');
            if(titleCheck[0] !== 'Routine' || isNaN(titleCheck[1])){
                this.setState({routineStatus:false})
            }

        })
        .catch(error=>{
            this.setState({
                routineStatus: false
            })
        });
    } 

    hideSpinner = () => {
        this.setState({
          loading: false
        });
      };

    render(){

        if(!this.state.routineStatus ){
           return <Redirect to='/error' />
        }

        let exerciseNo = 1;   

        let positions = this.state.routine.map(routine =>{
              return  <div key ={routine.name}>

                  <div className={classes.InformationBox} >
                        
                        <div className ={classes.TextBox}>              
                            <div className = {classes.ExerciseText}>
                                <h4>Exercise {exerciseNo++}: {routine.name}</h4>
                            </div>

                            <div className = {classes.ExerciseText}>

                            <h6>{routine.description}</h6>
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
                                min-height= '100%'
                                width="100%"
                                src= {routine.videoPath}
                                frameBorder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                                onLoad ={this.hideSpinner}>
                             </iframe>
                             </div>
                        </div>
                     </div>
                     </div>
        });

           
        
            return(
                <div className = {classes.Container}> 
                    <h3>{this.state.title}</h3>

                    {positions}

                    {this.state.loading2 ? 
                        null
                        : <div className = {classes.Button}><Link to='/myroutines'><Button btnType = 'Blue'>Back</Button></Link></div> }   
                </div>
         );
        }  
    }

export default MyRoutine;


