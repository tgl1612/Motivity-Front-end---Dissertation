import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Index.css';
import ImageOne from '../../Components/UI/Images/gym1.jpg';
import ImageTwo from '../../Components/UI/Images/gym2.jpg';
import ImageThree from '../../Components/UI/Images/gym3.jpg';
import ImageFour from '../../Components/UI/Images/gym4.jpg';
import Button from '../../Components/UI/Button/Button';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import axios from '../../axios-instance';
import ChatbotButton from '../../Components/UI/ChatbotButton/ChatbotButton';
import Footer from '../../Components/Navigation/Footer/Footer'
import Spinner from '../../Components/UI/Spinner/Spinner'


//User Index page. If user is logged in, a welcome message will be displayed

export class Index extends Component{

    state = {
        imageStatus: 'loading',
        userLoaded: false,
        userFirstName: '',
        error: false
    }
      
    componentDidMount(){
        window.scrollTo(0, 0);
        if(localStorage.getItem('id')){
            axios.get( '/user/' + localStorage.getItem('id'), {
                headers: {
                    Authorization: 'Bearer ' + localStorage.getItem('token')
                }
            })
            .then(response =>{
                this.setState({
                    userLoaded:true,
                    userFirstName: response.data.user.firstName
                })
            })
            .catch(err=>{
                this.setState({
                    error: true
                })
            })
        }               
    }

    //method to set state of image status to loaded on load 
    ImageLoadedhandler() {
        this.setState({ imageStatus: "loaded" });
      }
    
      //method to handle error if image fails to load
      ImageErrorhandler() {
        this.setState({ imageStatus: "failed to load" });
      }

      //method to prevent page display until images are loaded
      loadPageHandler(){
          let containerClass = classes.Container;

          if(this.state.imageStatus !=='loaded'){
            containerClass = classes.Empty
          }
          return containerClass;
      }

      render() {
        let welcomeMessage;

        if(this.props.isAuthenticated){            
            welcomeMessage =
            <div>
            <h2>Welcome {this.state.userFirstName}</h2>
            <h4>Enjoy your session!</h4>
            <Link to='/myroutines'><Button btnType = 'Blue'>View Routines</Button></Link>
            <Link to='/assessment'><Button btnType ='Green'>Take assessment</Button></Link>
            <h3>What can we do for you?</h3>
            </div>
            
        }else{
            welcomeMessage =   <div>
            <h2>Welcome to Motivity!</h2>
            <h4>The power of movement</h4>
            <Link to='/register'><Button btnType = 'Blue'>Join Us</Button></Link>
            <Link to='/login'><Button btnType = 'Green'>Login</Button></Link>
            <h3>What can we do for you?</h3>
            </div>
        }
    
            if(this.state.error){
                return <Redirect to ='/error' />
            }
                  
        return (
            <Auxiliary>
                {this.props.isAuthenticated && !this.state.userLoaded 
                ? <Spinner />
                :           
            
                    <div>
                
                <div className = {this.loadPageHandler()}>
                    <div className ={classes.Box}>
                        <img 
                            src = {ImageOne} 
                            alt ='' 
                            onLoad={this.ImageLoadedhandler.bind(this)}
                            onError={this.ImageErrorhandler.bind(this)}/>
                      {welcomeMessage}
                    </div>
        
                    <div className = {classes.Section} >
                        <div className = {classes.SubSection}>
                            <h4>Strengthen your body</h4>
                            <ul>
                                <li>Improve your joint strength</li>
                                <li>Increase your range of motion</li>
                                <li>Reduce risk of injury</li>
                                <li>Take control of your body</li>
                            </ul>
                        </div>
                        <div className = {classes.SubSection}>
                             <img src = {ImageFour} alt ='' />
                        </div>
                    </div>

                    <div className = {classes.Section} >
                       
                        <div className = {classes.Left}>
                             <img src = {ImageTwo} alt ='' />
                        </div>
                        <div className = {classes.Right}>
                            <h4>Personalised Routines</h4>
                            <ul>
                                <li>Take weekly assessments</li>
                                <li>Target your problem areas</li>
                                <li>Monitor your progress</li>
                            </ul>
                        </div>
                    </div>

                    <div className = {classes.Section} >
                        <div className = {classes.SubSection}>
                            <h4>Physical Education</h4>
                            <ul>
                                <li>Learn from an FRC Specilist</li>
                                <li>Receive support and help from AI assistant</li>
                                <li>Increase your understanding of your body</li>
                            </ul>
                        </div>
                        <div className = {classes.SubSection}>
                             <img src = {ImageThree} alt ='' />
                        </div>
                    </div>
                    <div className ={classes.Information}>
                    <h3>Who we are</h3>
                    <p>Here at Motivity we're passionate about training the right way. This means staying mobile, looking
                        after our joints and taking a proactive approach to injury prevention. 
                        Aside from the different sports we play we all follow the system of Functional Range Conditioning (FRC).
                        FRC is a system of mobility and joint control training, which, unlike many current systems,
                         is based in scientific principals and research. Developed by Dr. Andreo A. Spina, FRC utilizes 
                         the latest advancements in scientific knowledge, combined with tried and tested training methods 
                         to increase ones active, useable ranges of motion by simultaneously improving articular mobility, 
                         strength/resilience, and neurological control. 
                     </p>
                   

                    </div>


                </div>

                {this.props.isAuthenticated ? <ChatbotButton /> : null}
                
                {this.state.imageStatus === 'loaded' ? <Footer /> : null}
                </div>
                }

            </Auxiliary>
        );
    }
};

const mapStateToProps = state =>{
    return{
        isAuthenticated: state.token !== null
    };
};

export default connect(mapStateToProps, null)(Index);