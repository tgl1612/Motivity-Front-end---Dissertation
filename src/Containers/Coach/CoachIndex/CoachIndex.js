import React, {Component} from 'react';
import classes from './CoachIndex.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import {Link} from 'react-router-dom';
import Button from '../../../Components/UI/Button/Button';
import ImageOne from '../../../Components/UI/Images/gym1.jpg';

//CoachIndex page for the admin 

class CoachIndex extends Component{

    state={
     
        imageStatus: false,
    }

    componentDidMount(){
        window.scrollTo(0, 0);      
    }

    ImageLoadedhandler() {
        this.setState({ imageStatus: true });
      }
    
      ImageErrorhandler() {
        this.setState({ imageStatus: false});
      }

      loadPageHandler(){
          let containerClass = classes.Container;

          if(!this.state.imageStatus){
            containerClass = classes.Empty
          }
          return containerClass;
      }

    render(){
            
        return(
            <Auxiliary>
                <div className={this.loadPageHandler()}>

                <div className ={classes.Box}>
                    <img 
                        src = {ImageOne} 
                        alt ='' 
                        onLoad={this.ImageLoadedhandler.bind(this)}
                        onError={this.ImageErrorhandler.bind(this)}
                    />
                <h2>Welcome back Coach Davey!</h2>
                    <h4>What would you like to do today?</h4>
                    <Link to='/userstats'><Button btnType = 'Blue'>User Stats</Button></Link>
                    <Link to='/generalstats'><Button btnType ='Blue'>General Stats</Button></Link>
                    <Link to='/updateinfo'><Button btnType ='Green'>Update Info</Button></Link>
                </div>             
                </div>
            </Auxiliary>
        );
    }
}

export default CoachIndex;