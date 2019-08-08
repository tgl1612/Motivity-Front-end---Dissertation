import React, {Component} from 'react';
import classes from './DeleteRoutine.css';
import Button from '../../Components/UI/Button/Button';
import {Link, Redirect} from 'react-router-dom';
import axios from '../../axios-instance';
import Spinner from '../../Components/UI/Spinner/Spinner';

//DeleteRoutine page to let users hide their routines from their routine list. 
//(This does not delete the assessment result from the system. It marks the routine generated from the result as hidden)

class DeleteRoutine extends Component{
    
    state = {
        assessmentId: this.props.match.params.id,
        authStatus: true,
        loaded: false,
        error: false,
        deleted: false
    }

    componentDidMount(){
        window.scrollTo(0, 0);
        axios.get('/routines/countroutine/' + localStorage.getItem('id') + '/' +  this.state.assessmentId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response=>{
            if(response.data.count ===0){
               this.setState({authStatus: false}) 
            }
           this.setState({
                loaded: true
           })

        }
           )
        .catch(err=>{
            this.setState({
                error: true
            })
        })
        
    }

    //method to handle routine delete request and send axios request
    deleteRoutineHandler = () => {
        axios.put('/routines/hideroutine/' + this.state.assessmentId, [], {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then((response =>{
            this.setState({
                deleted: true
            })
        }))
        .catch(error=>{
            this.setState({
                error: true
            })
        });
    }
  
    render(){

        const title = decodeURIComponent(this.props.match.params.title);

        if(!this.state.authStatus || this.state.error){
            return <Redirect to='/error' />
        }

        if(this.state.deleted){
            return <Redirect to='/myroutines' />
        }
    
        
        if(!this.state.loaded){
            return <Spinner />
        }
       
        return(
            <div className = {classes.Container}>
                <div className = {classes.InformationBox}>
                    <h3>Are you sure you want to delete {title} ?</h3> 
                    <h5>Removing a routine from your list is permanent.
                        All remaining routines will be renamed in order of most recent.</h5>
                    <div className = {classes.Buttons}>

                  <Link to='/myroutines'>
                    <Button btnType = 'Blue'>
                        No
                    </Button></Link>
                   <Button btnType = 'Delete2' clicked = {this.deleteRoutineHandler}>
                        Yes
                    </Button>           
                    </div>      
                </div>      
            </div>
        );
    }
}

export default DeleteRoutine;


