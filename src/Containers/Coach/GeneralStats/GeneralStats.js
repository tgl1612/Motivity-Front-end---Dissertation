import React, {Component} from 'react';
import classes from './GeneralStats.css';
import axios from '../../../axios-instance';
import Spinner from '../../../Components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

//GeneralStats page to let admin view general stats about app usage including the gender ratio.

class GeneralStats extends Component{

    state ={
        userCount: '',
        assessmentCount: '',
        genderRatio: [],
        topUsers:[],
        loading: true,
        error: false
    }

    componentDidMount(){
        window.scrollTo(0, 0);

        Promise.all([axios.get( '/admin/countusers', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }), axios.get('/admin/countassessments', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }), axios.get('/admin/genderratio', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        }), axios.get('/admin/topusers', {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        
        ])
        .then(response =>{
            
            this.setState({
                loading:false,
                userCount: response[0].data.userCount[0].userCount,
                assessmentCount: response[1].data.assessmentCount[0].assessmentCount,
                genderRatio: response[2].data.genderCount,
                topUsers: response[3].data.assessmentCount
                 })  
        })
        .catch(error=>{
            this.setState({
                error: true
            })
        });
    }    


    render(){

        const topUsers = this.state.topUsers.map(topUser=>{
            return<div className = {classes.Table} key = {topUser.userId}>
                <div className = {classes.Row}>
                    <div className = {classes.Column}> 
                        <h5>{topUser.user.user}</h5>
                    </div>
                    <div className = {classes.Column}>
                        <h5>{topUser.assessmentCount}</h5>
                    </div>
                </div>                   
            </div>
        })

        if(this.state.error){
            return <Redirect to='/error' />
        }

        if(this.state.loading){
            return <Spinner />
        }

        return( 

            <div className ={classes.Container}>
                <div className = {classes.Title}><h4>General Stats</h4></div>
                
                <div className = {classes.InformationBox}>
                    <div><h5>Number of users: </h5><strong>{this.state.userCount}</strong></div>
                </div>
                <div className = {classes.InformationBox}>
                    <div><h5>Number of assessments taken: </h5><strong>{this.state.assessmentCount}</strong></div>
                </div>
                <div className = {classes.InformationBox}>

                    <div><h5>Gender Ratio: </h5></div>
                    <div className = {classes.GenderBox}>
                        <div>Male: <strong>{this.state.genderRatio[0].genderCount}</strong> </div>
                        <div>Female: <strong>{this.state.genderRatio[1].genderCount}</strong></div>
                        <div>Didn't Say: <strong>{this.state.genderRatio[2].genderCount}</strong></div>
                    </div>
                </div>
                <div className = {classes.Table}>
                <div className = {classes.TableTitle}>
                    <h4>Top Users</h4> 
                </div>
                </div>
                <div className = {classes.Table}>
                <div className = {classes.RowSub}>
                    <div className = {classes.ColumnSub}> 
                        <h5>Username</h5>
                    </div>
                    <div className = {classes.ColumnSub}>
                        <h5>Assessments</h5>
                    </div>
                </div>
                </div>
                {topUsers}
                
            </div>
        );
    }

};

export default GeneralStats;