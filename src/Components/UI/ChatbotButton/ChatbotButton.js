import React, {Component} from 'react';
import classes from './ChatbotButton.css';
import Avatar from '../Images/Coachdavey.PNG';
import {Link} from 'react-router-dom';

//ChatbotButton component to be displayed on certain pages so the user can access the general information Chatbot

class ChatbotButton extends Component {

  state={
    imageLoaded:false
  }


  //method to set state of imageloaded to true on image load
  ImageLoadedhandler() {
    this.setState({ imageLoaded: true });
  }
  // method to handle if image fails to load
  ImageErrorhandler() {
    this.setState({ imageLoaded: false});
  }

  render(){
    return(
      <Link to='/chatbot'>
        <div className={this.state.imageLoaded ? classes.Container : classes.Invisible}>
          <div className={classes.AvatarCropper}>
                <img 
                  src={Avatar} 
                  className={classes.Avatar} 
                  alt='chatbotButton' 
                  onLoad={this.ImageLoadedhandler.bind(this)}
                  onError={this.ImageErrorhandler.bind(this)}
                />
                <div className = {classes.Chat}>
                  Chat
                </div>
            </div>
            
        </div>
        
      </Link>  
    );
  }
}

export default ChatbotButton;