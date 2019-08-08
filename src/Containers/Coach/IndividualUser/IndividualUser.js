import React, {Component} from 'react';
import classes from './IndividualUser.css';
import Button from '../../../Components/UI/Button/Button';
import {Link, Redirect} from 'react-router-dom';
import axios from '../../../axios-instance';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import Modal from '../../../Components/UI/Modal/Modal';

//IndividualUser page to let an admin view an individual user's information. The admin can also delete the user from this page. 

class IndividualUser extends Component{

    state={
        userId: this.props.match.params.id,
        user: [],
        lastAssessment: [],
        loading: true,
        count: 0,
        deleting: false,
        deleted: false,
        error: false
    }

    //axios request to get user details and assessment details
    componentDidMount(){
        window.scrollTo(0, 0);

        Promise.all([axios.get( '/user/' + this.state.userId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }), axios.get('/user/' + this.state.userId+ '/assessments', {
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

      //delete modal appear
     deletingHandler = () =>{
        this.setState({deleting: true})
    }

    //delete modal disappear
    closeDeleteModalHander =()=>{
        this.setState({deleting: false})
    }
    //method to delete user 
    deleteUserHandler = () =>{
        if(this.state.userId ===16){
            this.closeDeleteModalHander()
        }else{
        axios.delete('/user/delete/' +  this.state.userId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        } )
        .then(response=>{
           this.setState({
               deleted: true
           })
        })
        .catch(err=>{
            this.setState({
                error: true
            })
        });
    }
    }

    render(){
        const username = this.state.user.user;
        const name = this.state.user.firstName + ' ' + this.state.user.lastName;
        const email = this.state.user.emailAddress;
        const genderId = this.state.user.genderId;
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

        let gender;
        if( genderId=== 1){
            gender = <p><strong >Gender: </strong>Male</p>
        }else if(genderId === 2){
            gender = <p><strong >Gender: </strong>Female</p>
        }else if(genderId ===3){
            gender = <p><strong >Gender: </strong>Rather not say</p>
        }

        if(this.state.error){
                return <Redirect to='/error' />
        }

        if(this.state.loading){      
          return <Spinner />
        }

        if(this.state.deleted){
            return <Redirect to='/userstats'/>
        }
       
          return(
                <div className = {classes.Container}>
                    <Modal shown ={this.state.deleting} modalClosed ={this.closeDeleteModalHander}>
                            <div className = {classes.DeleteModal}>
                            <h3>Are you sure you want to do this? </h3>
                            <div>
                            <Button btnType = 'Blue' clicked = {this.closeDeleteModalHander}>No</Button>
                           <Button btnType = 'Delete2' clicked = {this.deleteUserHandler}>Yes</Button>
                           </div>
                           </div>
                        </Modal>
                            <div className = {classes.InformationBox}>
                                <div className = {classes.SubSection}>
                                    <div className ={classes.Title}>
                                        <h3>{username}</h3>
                                    </div>
                                    <div className ={classes.UserInfo}>
                                        <p><strong>Name: </strong> {name}</p>
                                        <p><strong>Email: </strong>{email}</p>
                                        {gender}
                                    </div>

                                <div className ={classes.UserInfo}>
                                    {userLevel}
                                    <p><strong>Completed Assessments: </strong>{assessmentCount}</p>
                                    <p><strong>Days since last Assessment: </strong>{daysSinceAssessment}</p>
                                    <div className ={classes.Buttons}>
                                        <Link to={'/results/' + this.state.user.id}><Button btnType = 'Blue'> Results</Button></Link>
                                        <Button btnType = 'Delete2' clicked ={this.deletingHandler}>Delete User</Button>                    
                                    </div>
                                </div>            
                                </div>
                            </div>           
                </div>
        );
    }
}

export default IndividualUser;