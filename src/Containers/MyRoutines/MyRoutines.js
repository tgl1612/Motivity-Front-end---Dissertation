import React, {Component} from 'react';
import classes from './MyRoutines.css';
import axios from '../../axios-instance';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Routines from '../../Components/Routines/Routines';
import CarsRoutines from '../../Components/Routines/CarsRoutines';
import ChatbotButton from '../../Components/UI/ChatbotButton/ChatbotButton';
import {Redirect} from 'react-router-dom'

//My Routines page containing individual routine components that user can click to view

class MyRoutines extends Component{

    //set initial state 
    state ={
        preAssessment: {},
        cars: [],
        myRoutines: [],
        loading: true,
        hasRoutines: false,
        error: false
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        axios.get('/user/' + localStorage.getItem('id'),{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response=>{
            if(response.data.user.assessments.length === 0){
             return true;
            }else{
                return false
            }
        })
        .then(response =>{
            if(response){
                axios.get('/routines/preroutine', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })
                .then(response=>{
                        this.setState({
                            preAssessment: response.data.preRoutine,
                            loading: false
                        })                    
                })
                .catch(error=>{
                    this.setState({
                        error: true
                    })
                });
            }else{
                this.setState({hasRoutines: true})
                
                Promise.all([axios.get('/routines/preroutine', {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                }),
                 axios.get('/routines/myroutines/' + localStorage.getItem('id'), {
                    headers: {
                        Authorization: 'Bearer ' + localStorage.getItem('token')
                    }
                })])
                .then(response =>{
                    this.setState({
                        preAssessment: response[0].data.preRoutine,
                        myRoutines: response[1].data.assessment,
                        loading: false
                    })
                    if(this.state.myRoutines){
                        return axios.get('/routines/routines/' + localStorage.getItem('id'), {
                            headers: {
                                Authorization: 'Bearer ' + localStorage.getItem('token')
                            }
                        })
                    }
                    else{
                        return 0
                    }
                
                })
                .then(response=>{
                    this.setState({
                        cars: response.data.cars,
                    })  
                
                })
                .catch(error=>{
                    this.setState({
                        error: true
                    })
                });
            }
        })
        .catch(error=>{
            this.setState({
                error: true
            })
        });
    }

    render(){

        const cars = this.state.cars.map(car =>{
            return <CarsRoutines 
                    key = {car.name}
                    id = {car.id}

                    title = {car.name}
                    level = {car.difficultyId}
                    
                    />
        });

        const myRoutines = this.state.myRoutines.map(myRoutine =>{
            return <Routines 
                        key = {myRoutine.id}
                        id = {myRoutine.id}
                        title = {'Routine ' + myRoutine.rank}
                        level = {myRoutine.userLevelId}
                    />;
        });

        let myRoutinesStatus;
      
         myRoutinesStatus=
         <div>
                <div className = {classes.Title}>
                    <h3>My Routines</h3>
                </div>
                {/* pre routine */}
                <CarsRoutines 
                    title = {this.state.preAssessment.name}
                    id = {1}
                    level =  {1}
                />
               {this.state.hasRoutines ? <div><div className= {classes.SubHeading}><h4><strong>Daily Routines</strong></h4></div>
                {/*cars routines */}
                {cars}
                <div className= {classes.SubHeading}><h4><strong>Personalised Routines</strong></h4></div>
                {/* personalised routines */}   
                 {myRoutines}
                 
                </div>
                 : null}
                 </div>
       
       if(this.state.error){
        return <Redirect to='/error' />
        }

        if(this.state.loading){
            return <Spinner />
        }
        return(

            <div className = {classes.Container}> 
                {myRoutinesStatus}
                
                <ChatbotButton />

            </div>
        );
    }
}
export default MyRoutines;