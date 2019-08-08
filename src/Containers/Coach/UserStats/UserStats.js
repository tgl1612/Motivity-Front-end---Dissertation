import React, {Component} from 'react';
import classes from './UserStats.css';
import axios from '../../../axios-instance';
import Button from '../../../Components/UI/Button/Button';
import {Link, Redirect} from 'react-router-dom';
import Spinner from '../../../Components/UI/Spinner/Spinner';

//UserStats page so the admin can all users of the app and click on individual users to view more details 

class UserStats extends Component{
    
    state ={
        users:[],
        loading: true,
        error: false
    }

    componentDidMount(){
         window.scrollTo(0, 0)

        axios.get('/admin/users', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response =>{

            this.setState({
                users: response.data.users,
                loading: false
            })
        })
        .catch(error=>{
            this.setState({
                error: true
            })
        });
    }

    render(){


        if(this.state.error){
                return <Redirect to='/error' />        
        }
      
        const users = this.state.users.map(user =>{
            let userLevel;
        if(user.assessments.length < 1){
            userLevel = <h5 style={{color: 'green'}}><strong style = {{color: '#033875'}}>Level: </strong>Novice</h5>
        }else{
            if(user.assessments[0].userLevelId ===1){
                userLevel = <h5 style={{color: 'green'}}><strong style = {{color: '#033875'}}>Level: </strong>Novice</h5>
           }else if(user.assessments[0].userLevelId ===2){
               userLevel = <h5 style={{color: 'orange'}}><strong style = {{color: '#033875'}}>Level: </strong>Intermediate</h5>
           }else if(user.assessments[0].userLevelId ===3){
               userLevel = <h5 style={{color: 'red'}}><strong style = {{color: '#033875'}}>Level: </strong>Advanced</h5>
           }else{
               userLevel = <h5 style={{color: 'green'}}><strong style = {{color: '#033875'}}>Level: </strong>Novice</h5>
           }
        }
            return <div className = {classes.Users} key = {user.id}>
            <h4>{user.user}</h4>
            <div className ={classes.UserInfo}>
            <div className ={classes.SubSection}>
                 <div className ={classes.SubSub}>
                      {userLevel}
                 </div>
                <div className={classes.SubSub}>
                    <h5><strong>Gender: </strong> {user.gender.genderType}</h5>  
                </div>  
            </div>
            <div>
                
                <div className ={classes.SubSub}>
                   <Link to={
                       '/user/' + user.id
                        
                   }><Button btnType = 'Blue'>Details</Button></Link> 
                </div>
            </div>
            </div>            
        </div>                  
        });
      return(
          
                <div className = {classes.Container}>
                  {!this.state.loading ? <div> 
                <div className = {classes.Title}>
                        <h3>All Users</h3>
                    </div>
                    {users}                    
                    </div> : <Spinner /> }
                
                </div>
      );
    }
}
export default UserStats;
