import React, {Component} from 'react';
import classes from './UserResults.css';
import axios from '../../../axios-instance';
import Button from '../../../Components/UI/Button/Button';
import {Link, Redirect} from 'react-router-dom';
import Spinner from '../../../Components/UI/Spinner/Spinner';

//UserResults page to let the admin view all of a user's assessment results. The admin can click on the results to view more details

class UserResults extends Component{
    
    state ={
        userId: this.props.match.params.id,
        myAssessments:[],
        loading: true,
        error: false
    }

    componentDidMount(){
         window.scrollTo(0, 0)
         axios.get('/routines/myroutines/' + this.state.userId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        
        .then(response =>{

            this.setState({
                myAssessments: response.data.assessment,
                loading:false
            })
        })
        .catch(error=>{
            this.setState({
                error: true
            })
        });
    }

    render(){
        const myAssessments = this.state.myAssessments.map(assessment =>{
           let userLevel;
        if(assessment.userLevelId ===1){
            userLevel = <h5 style={{color: 'green'}}>Novice</h5>
        }else if(assessment.userLevelId ===2){
           userLevel = <h5 style={{color: 'orange'}}>Intermediate</h5>
        }else if(assessment.userLevelId ===3){
            userLevel = <h5 style={{color: 'red'}}>Advanced</h5>
        }else{
            userLevel = <h5 style={{color: 'green'}}>Novice</h5>
        }

        let date = new Date(assessment.startDate);
               let year = date.getFullYear();
               let month = date.getMonth()+1;
               let  dt = date.getDate();

                if (dt < 10) {
                dt = '0' + dt;
                }
                if (month < 10) {
                month = '0' + month;
                }

                date = (dt+'-'+month+'-'+year);

            const title ='Assessment ' + assessment.rank
            const assessmentId = assessment.id

            return <div className = {classes.Results} key = {assessment.id}>
            <div className ={classes.SubSection}>
                 <div className ={classes.SubSub}>
                    <h5>{title}</h5>
                 </div>
                <div className={classes.SubSub}>
                    <h5>Date: {date}</h5>  
                </div>  
            </div>
            <div className={classes.SubSection}>
                <div className ={classes.SubSub}>
                    {userLevel}
                </div>
                <div className ={classes.SubSub}>
                   <Link to={
                       '/result/' + this.state.userId + '/' + assessmentId + '/' + encodeURIComponent(title)         
                   }><Button btnType = 'Blue'>Details</Button></Link> 
                </div>
            </div>
        </div>
                  
        });
    
    if(this.state.error){
        return <Redirect to='/error' />
    }

    if(this.state.loading){
        return <Spinner/>
    }
    

      return(
                
                <div className = {classes.Container}>
                    <div className = {classes.Title}>
                        <h3>Results</h3>
                    </div>

                        {myAssessments}      

                        <div className ={classes.BackButton}>
                           <Link to ={'/user/'+ this.state.userId}><Button btnType='Blue'>Back</Button></Link> 
                       </div>          
                </div>
      );
    }
}
export default UserResults;

  