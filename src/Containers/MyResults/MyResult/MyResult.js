import React, {Component} from 'react';
import classes from './MyResult.css';
import axios from '../../../axios-instance';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect, Link} from 'react-router-dom';
import Button from '../../../Components/UI/Button/Button';

//MyResult page to show an individual user's result for a particular assessment

class MyResult extends Component{
    
    state ={
        assessmentId: this.props.match.params.id,
        title: decodeURIComponent(this.props.match.params.title),
        neckScore: '',
        spineScore: '',
        scapScore: '',
        shoulderScore: '',
        elbowScore: '',
        wristScore: '',
        hipScore: '',
        kneeScore: '',
        ankleScore: '',
        loading: true,
        matchStatus: false,
        resultStatus: true,
        overallScore: '',
        error: false
    }

    componentDidMount(){
        window.scrollTo(0, 0);

        Promise.all([axios.get('/routines/countroutine/' + localStorage.getItem('id') + '/' +  this.state.assessmentId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
         }),
         axios.get('/user/result/' + this.state.assessmentId, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }),       
        ])
        .then(response =>{
            const titleCheck = this.state.title.split(' ');
          
            if(titleCheck[0] !== 'Assessment' || isNaN(titleCheck[1])){
                this.setState({resultStatus:false})
            }
            if(response[0].data.count >0){
                return response[1]              
            }
            else{              
               return Promise.reject('These results do not belong to you!.')              
            }
        })
        .then(response =>{
            this.setState({
                neckScore: response.data.result[0].mobilityLevel.level,
                spineScore: response.data.result[1].mobilityLevel.level,
                scapScore: response.data.result[2].mobilityLevel.level,
                shoulderScore: response.data.result[3].mobilityLevel.level,
                elbowScore: response.data.result[4].mobilityLevel.level,
                wristScore: response.data.result[5].mobilityLevel.level,
                hipScore: response.data.result[6].mobilityLevel.level,
                kneeScore: response.data.result[7].mobilityLevel.level,
                ankleScore: response.data.result[8].mobilityLevel.level,
                loading: false,
                matchStatus: true,
                overallScore: response.data.result[0].assessment.userLevelId

            })
        })
        .catch(error=>{
            this.setState({
                error: true
            })
        });
    }

    render(){
        //vars
        let neckScore;
        let spineScore;
        let scapScore;
        let shoulderScore;
        let elbowScore;
        let wristScore;
        let hipScore;
        let kneeScore;
        let ankleScore;
        let overallScore;

        //neckscore color
        if(this.state.neckScore === 'Novice'){
            neckScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Neck: </strong> {this.state.neckScore}</h5>
        } else if(this.state.neckScore === 'Intermediate'){
            neckScore =<h5 style = {{color: 'Orange'}}><strong style = {{color: '#033875'}} >Neck: </strong> {this.state.neckScore}</h5>
        }else if(this.state.neckScore === 'Advanced'){
            neckScore =<h5 style = {{color: 'red'}}><strong style = {{color: '#033875'}} >Neck: </strong> {this.state.neckScore}</h5>
        }else{
            neckScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Neck: </strong> Novice</h5>
        }
        // //spine color
        if(this.state.spineScore === 'Novice'){
            spineScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Spine: </strong> {this.state.spineScore}</h5>
        } else if(this.state.spineScore === 'Intermediate'){
            spineScore =<h5 style = {{color: 'Orange'}}><strong style = {{color: '#033875'}} >Spine: </strong> {this.state.spineScore}</h5>
        }else if(this.state.spineScore === 'Advanced'){
            spineScore =<h5 style = {{color: 'Red'}}><strong style = {{color: '#033875'}} >Spine: </strong> {this.state.spineScore}</h5>
        }else{
            spineScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Spine: </strong> Novice</h5>
        }
        // //scap color
        if(this.state.scapScore === 'Novice'){
            scapScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Scapulas: </strong> {this.state.scapScore}</h5>
        } else if(this.state.scapScore === 'Intermediate'){
            scapScore =<h5 style = {{color: 'Orange'}}><strong style = {{color: '#033875'}} >Scapulas: </strong> {this.state.scapScore}</h5>
        }else if(this.state.scapScore === 'Advanced'){
            scapScore =<h5 style = {{color: 'Red'}}><strong style = {{color: '#033875'}} >Scapulas: </strong> {this.state.scapScore}</h5>
        }else{
            scapScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Scapulas: </strong> Novice</h5>
        }
        // //shoulder color
        if(this.state.shoulderScore === 'Novice'){
            shoulderScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Shoulders: </strong> {this.state.shoulderScore}</h5>
        } else if(this.state.shoulderScore === 'Intermediate'){
            shoulderScore =<h5 style = {{color: 'Orange'}}><strong style = {{color: '#033875'}} >Shoulders: </strong> {this.state.shoulderScore}</h5>
        }else if(this.state.shoulderScore === 'Advanced'){
            shoulderScore =<h5 style = {{color: 'Red'}}><strong style = {{color: '#033875'}} >Shoulders: </strong> {this.state.shoulderScore}</h5>
        }else{
            shoulderScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Shoulders: </strong> Novice</h5>   
        }
        // //elbow color
        if(this.state.elbowScore === 'Novice'){
            elbowScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Elbow: </strong> {this.state.elbowScore}</h5>
        } else if(this.state.elbowScore === 'Intermediate'){
            elbowScore =<h5 style = {{color: 'Orange'}}><strong style = {{color: '#033875'}} >Elbow: </strong> {this.state.elbowScore}</h5>
        }else if(this.state.elbowScore === 'Advanced'){
            elbowScore =<h5 style = {{color: 'Red'}}><strong style = {{color: '#033875'}} >Elbow: </strong> {this.state.elbowScore}</h5>
        }else{ 
            elbowScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Elbow: </strong> Novice</h5>
        }
        // //wrist color
        if(this.state.wristScore === 'Novice'){
            wristScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Wrist: </strong> {this.state.wristScore}</h5>
        } else if(this.state.wristScore === 'Intermediate'){
            wristScore =<h5 style = {{color: 'Orange'}}><strong style = {{color: '#033875'}} >Wrist: </strong> {this.state.wristScore}</h5>
        }else if(this.state.wristScore === 'Advanced'){
            wristScore =<h5 style = {{color: 'Red'}}><strong style = {{color: '#033875'}} >Wrist: </strong> {this.state.wristScore}</h5>
        }else{
            wristScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Wrist: </strong> Novice</h5>
        }
        // //hip color
        if(this.state.hipScore === 'Novice'){
            hipScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Hip: </strong> {this.state.hipScore}</h5>
        } else if(this.state.hipScore === 'Intermediate'){
            hipScore =<h5 style = {{color: 'Orange'}}><strong style = {{color: '#033875'}} >Hip: </strong> {this.state.hipScore}</h5>
        }else if(this.state.hipScore === 'Advanced'){
            hipScore =<h5 style = {{color: 'Red'}}><strong style = {{color: '#033875'}} >Hip: </strong> {this.state.hipScore}</h5>
        }else{
            hipScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Hip: </strong> Novice</h5>
        }
        // //knee color
        if(this.state.kneeScore === 'Novice'){
            kneeScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Knees: </strong> {this.state.kneeScore}</h5>
        } else if(this.state.kneeScore === 'Intermediate'){
            kneeScore =<h5 style = {{color: 'Orange'}}><strong style = {{color: '#033875'}} >Knees: </strong> {this.state.kneeScore}</h5>
        }else if(this.state.kneeScore === 'Advanced'){
            kneeScore =<h5 style = {{color: 'Red'}}><strong style = {{color: '#033875'}} >Knees: </strong> {this.state.kneeScore}</h5>
        }else{
            kneeScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Knees: </strong> Novice</h5>
        }
        // //ankle color
        if(this.state.ankleScore === 'Novice'){
            ankleScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Ankles: </strong> {this.state.ankleScore}</h5>
        } else if(this.state.ankleScore === 'Intermediate'){
            ankleScore =<h5 style = {{color: 'Orange'}}><strong style = {{color: '#033875'}} >Ankles: </strong> {this.state.ankleScore}</h5>
        }else if(this.state.ankleScore === 'Advanced'){
            ankleScore =<h5 style = {{color: 'Red'}}><strong style = {{color: '#033875'}} >Ankles: </strong> {this.state.ankleScore}</h5>
        }else{
            ankleScore =<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Ankles: </strong> Novice</h5>
        }

        //overall score 
        if(this.state.overallScore ===1){
            overallScore =  <strong style={{color: 'green'}}>a Novice</strong>
        }else if(this.state.overallScore ===2){
            overallScore = <strong style={{color: 'orange'}}>an Intermediate</strong>
        }else if(this.state.overallScore ===3){
            overallScore = <strong style={{color: 'red'}}>an Advanced</strong>
        }else{
            overallScore =  <strong style={{color: 'green'}}>a Novice</strong>
        }


        if(this.state.error){
            return <Redirect to='/error' />
         }

        if(this.state.loading){
            return <Spinner />
        }


        //check if user has access to routine
        if(!this.state.matchStatus || !this.state.resultStatus){
            return <Redirect to='/error' />
        }else{

      return(
          
                <div className = {classes.Container}>
                   
                           <div className = {classes.Title}>
                        <h3>{this.state.title}</h3>
                    </div>
                    <div className = {classes.Results}>

                        <h6>Overall you scored a {this.state.overallScore} out of 3 in this assessment, making you {overallScore} user!
                           Below are your individual results for each body area.</h6>

                        {neckScore}
                        {spineScore}
                        {scapScore}
                        {shoulderScore}
                        {elbowScore}
                        {wristScore}
                        {hipScore}
                        {kneeScore}
                        {ankleScore}
                    </div> 
                    <Link to='/myresults'><Button btnType = 'Blue'>Back</Button></Link>    
                </div>
            );
        }
                
    }
}
export default MyResult;

  