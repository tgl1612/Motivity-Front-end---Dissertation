import React, {Component} from 'react';
import classes from './MyAccount.css';
import Button from '../../Components/UI/Button/Button';
import {Link, Redirect} from 'react-router-dom';
import axios from '../../axios-instance';
import Spinner from '../../Components/UI/Spinner/Spinner';
import ChatbotButton from '../../Components/UI/ChatbotButton/ChatbotButton';

//MyAccount page to show user details. 

class MyAccount extends Component{

    state={
         user: [],
        lastAssessment: [],
        loading: true,
        count: 0,
        error: false
    }

    //axios request to get user details and assessment details
    componentDidMount(){
        window.scrollTo(0, 0);
        
        Promise.all([axios.get( '/user/' + localStorage.getItem('id'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }), axios.get('/user/' + localStorage.getItem('id')+ '/assessments', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }

        })])
        .then(response =>{
                this.setState({
                    user: response[0].data.user, 
                    lastAssessment: response[0].data.user.assessments[0], 
                    count: response[1].data.count,
                    loading:false,
                     })
        })
        .catch(error=>{
            this.setState({
                error: true
            })
        });
    }

    //function to work out the days since last assessment
    daysBetween = ()=>{
        const dateToday = new Date(Date.now()).toISOString();

        const lastAssessmentDate = this.state.lastAssessment.startDate;

        var d1 = new Date(lastAssessmentDate);
        var d2 = new Date(dateToday);
        return (d2-d1)/(1000*3600*24);
      }     

    render(){

        const username = this.state.user.user;
        const name = this.state.user.firstName + ' ' + this.state.user.lastName;
        const email = this.state.user.emailAddress;
        let userLevelId;
        let assessmentCount;
        let daysSinceAssessment;

        if(!this.state.lastAssessment){
            userLevelId = 1;
            assessmentCount = 0;
            daysSinceAssessment = 0;
        }else{
            userLevelId = this.state.lastAssessment.userLevelId;
            assessmentCount = this.state.count;
            daysSinceAssessment = Math.floor(this.daysBetween());
            if(daysSinceAssessment < 0){
                daysSinceAssessment = 0
              };
        };
       
        let userLevel;
        if(userLevelId === 1){
            userLevel = <p style={{color:'green'}}><strong >User Level: </strong>Novice</p>
        }else if(userLevelId === 2){
            userLevel = <p style={{color:'orange'}}><strong >User Level: </strong>Intermediate</p>
        }else if(userLevelId ===3){
            userLevel = <p style={{color:'red'}}><strong >User Level: </strong>Advanced</p>
        }

        if(this.state.error){
            return <Redirect to='/error' />
         }

        if(this.state.loading){            
            return <Spinner />
        }

          return(
                <div className = {classes.Container}>
                    <div className = {classes.InformationBox}>

                    <div className = {classes.SubSection}>
                        <div className ={classes.Title}>
                            <h3>{username}</h3>
                        </div>
                        <div className ={classes.UserInfo}>
                            <p><strong>Name: </strong> {name}</p>
                            <p><strong>Email: </strong>{email}</p>
                        </div>
                        <div className = {classes.Buttons}>
                            <Link to= "/updateinfo"><Button btnType = 'Blue'>Edit Information</Button></Link>                    
                            <Link to='/assessment'><Button btnType ='Green'>Take assessment</Button></Link>
                        </div>
                    </div>

                    <div className = {classes.SubSection}>

                    <div className ={classes.Title}>
                        <h3>My Progress</h3>
                    </div>
                    <div className ={classes.UserInfo}>
                        {userLevel}
                        <p><strong>Completed Assessments: </strong>{assessmentCount}</p>
                        <p><strong>Days since last Assessment: </strong>{daysSinceAssessment}</p>
                        <div className ={classes.Buttons2}>
                            <Link to='/myresults'><Button btnType = 'Blue'> My results</Button></Link>
                        </div>
                    </div>

                    </div>

                    </div>
                    <ChatbotButton />
                    
                </div>
        );
    }
}

export default MyAccount;