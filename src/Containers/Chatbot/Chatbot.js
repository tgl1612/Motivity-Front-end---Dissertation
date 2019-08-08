import React, {Component} from 'react';
import classes from './Chatbot.css';
import Button from '../../Components/UI/Button/Button';
import axios from '../../axios-instance';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Avatar from '../../Components/UI/Images/Coachdavey.PNG'
import {Redirect} from 'react-router-dom';

//MyChatbot page for users to get general help from chatbot

class MyChatbot extends Component{

  state ={
    messages:[],
  loading: true,
  typing: false,
  user: '',
  imageLoaded: false,
  firstName: '',
  error: false
}

    componentDidMount(){
        window.scrollTo(0, 0);
        axios.get('/user/' + localStorage.getItem('id'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response=>{
            this.setState({
                messages:[
                    {
                      message: {
                        value:"Hey " + response.data.user.firstName + "! How's it going?",
                        user: 'robot',
                        id: Math.random(),
                        options:[
                          {option: 'Good'},
                          {option: 'Not great'}
                        ]
                      }}
                  ],
                loading: false,
                user: response.data.user.user,
                firstName: response.data.user.firstName
            })
        })
        .catch(err=>{
          this.setState({
            error: true
          })
        })

    }

    componentWillUnmount(){
      clearInterval(this.timeout)
    }

    timeoutHandler = (message, time) =>{
     this.timeout = setTimeout(() => {
        this.updateRobotMessageHandler(message)
     }, time);
    }


    //function to add user messages to message array, then call updateRobotHandler to get robot response
  updateMessageHandler = (value) =>{
    this.setState({
    messages: [...this.state.messages, {message:{value: value, user: this.state.user , id: Math.random()}}],
         })
         this.timeoutHandler(value, 1500)
  
        setTimeout(()=>{
          this.setState({
            typing:true
          })
        },400)
        this.disableButtons()
        }

     //function to add robot messages to messages array    
    updateRobotMessageHandler = (value)=>{
        //introductions
      if(value === 'Good'){
        this.setState({
          messages: [...this.state.messages,
             {message:{
               value: "Excellent! I'm glad to hear!",
                user: 'robot',
                 id: Math.random(),
               options:[
               ] }}]
        })
        this.timeoutHandler('Help', 2000)  
         }
         if(value === 'Not great'){
            this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Ah I'm sorry to hear. Well done for keeping up with your routines!",
                    user: 'robot',
                     id: Math.random(),
                   options:[
                  ] }}]
            })
            this.timeoutHandler('Help', 2000)
          }
      if(value === 'Help'){
        this.setState({
          messages: [...this.state.messages,
             {message:{
               value: "What can I help you with today?",
                user: 'robot',
                 id: Math.random(),
               options:[
                { option: 'Learn more about FRC'},
                { option: 'My Routines'},
                { option: 'Help and Motivation'},
                { option: "I'm new, how do I use the app?"},
                { option: "I clicked by mistake!"}
               ] }}],
               typing: false

        })
      }
      //end of introductions

      //Section 1 Learn more about FRC (1/4)
            if(value ==='Learn more about FRC'){
              this.setState({
                messages: [...this.state.messages,
                  {message:{
                    value: "Brilliant! I'm always glad to talk about FRC!",
                      user: 'robot',
                      id: Math.random(),
                    options:[
                    ] }}],
                    })
                    this.timeoutHandler('FRC', 3000)
            }
            if(value ==='FRC'){
              
                this.setState({
                  messages: [...this.state.messages,
                     {message:{
                       value: "FRC stands for Functional Range Conditioning.",
                        user: 'robot',
                         id: Math.random(),
                       options:[
                       ] }}],
                      })
                      this.timeoutHandler('FRC1', 3000)
                  }
                  if(value ==='FRC1'){
              
                    this.setState({
                      messages: [...this.state.messages,
                         {message:{
                           value: "It's a trademarked system of mobility and joint control training, which, unlike many current systems, is based in scientific principles and research. ",
                            user: 'robot',
                             id: Math.random(),
                           options:[
                           ] }}],
                          })
                          this.timeoutHandler('FRC2', 6000)
                  }
                  if(value ==='FRC2'){
                      this.setState({
                        messages: [...this.state.messages,
                           {message:{
                             value: "There are 3 main goals when training using the FRC system and all are closely interrelated, and acquired simultaneously",
                              user: 'robot',
                               id: Math.random(),
                             options:[
                             ] }}],
                            })
                            this.timeoutHandler('FRC3', 4500)
                  }
                  if(value ==='FRC3'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "The first is mobiility development. Mobility refers to the amount of active, usable motion that one possesses.",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              ] }}],
                            })

                            this.timeoutHandler('FRC4', 5000)
                  }
                  if(value ==='FRC4'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "The more mobile a person is, the more they are able to maximize their movement potential safely, efficiently, and effectively.",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('FRC5', 5000)
                }
                if(value ==='FRC5'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "The second goal is joint strength! While improving mobility and movement potential, the FRC system also acts to safe-guard your joints so that movement can be executed safely.",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('FRC6', 7000)
                      }
                      if(value ==='FRC6'){
                          this.setState({
                            messages: [...this.state.messages,
                                {message:{
                                  value: "The final goal is body control. Training with FRC improves the function of your nervous system.",
                                  user: 'robot',
                                    id: Math.random(),
                                  options:[
                                  ] }}],
                                })
                                this.timeoutHandler('FRC7', 5000)
                      }
                      if(value ==='FRC7'){
                        this.setState({
                          messages: [...this.state.messages,
                              {message:{
                                value: "This leads to a reduction of pain and injury, joint health and longevity, as well as an increased ability to move freely and easily.",
                                user: 'robot',
                                  id: Math.random(),
                                options:[
                                ] }}],
                              })
                              this.timeoutHandler('FRC8', 6500)
                    }
                    if(value ==='FRC8'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "Would you like to know more?",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              { option: 'Yea, sure!'},
                              { option: 'No thanks'},
                              ] }}],
                              typing: false
                            })
                    }
                    if(value ==='Yea, sure!'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "Great " + this.state.firstName+ "! I'll keep going then!",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              ] }}],
                            })
                            this.timeoutHandler('FRC9', 5000)
                    }
                    if(value ==='No thanks'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "No problem " + this.state.firstName + "! I hope I wasn't boring you haha. Is there anything else I can help with? ",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              { option: 'My Routines'},
                              { option: 'Help and Motivation'},
                              { option: "I'm new, how do I use the app?"},
                              { option: "No thanks, I'm done"}
                              ] }}],
                            })
                    }
                    if(value ==='FRC9'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "FRC was developed by world-renowned musculoskeletal, and human movement expert Dr. Andreo Spina.",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              ] }}],
                            })
                            this.timeoutHandler('FRC10', 5000)
                    }
                    if(value ==='FRC10'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "It works by systematically expanding the body’s ranges of motion, while simultaneously teaching the nervous system how to control the newly acquired ranges.",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              ] }}],
                            })
                            this.timeoutHandler('FRC11', 7000)
                    }
                    if(value ==='FRC11'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "As our ability to generate force across the joint lessens, we lose the ability to actively control the range of motion. ",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              ] }}],
                            })
                            this.timeoutHandler('FRC12', 6500)
                    }
                    if(value ==='FRC12'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "These long, and short ranges are only accessible to us via passive means and are therefore essentially useless from a movement, functional perspective.",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              ] }}],
                            })
                            this.timeoutHandler('FRC13', 8000)
                    }
                    if(value ==='FRC13'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "Because the longer and shorter ranges are not utilized, the joints tissues never develop the ability to absorb loads at those ranges leaving them susceptible to injury.",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              ] }}],
                            })
                            this.timeoutHandler('FRC14', 8500)
                    }
                    if(value ==='FRC14'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "Through specific, and safe training methods we are able to ‘capture’ passive ranges of motion and convert them into usable, active ranges.",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              ] }}],
                            })
                            this.timeoutHandler('FRC15', 7000)
                    }
                    if(value ==='FRC15'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "During the development of improved mobility, the system ensures the simultaneous development of tissue strength and resilience in the newly acquired ranges.",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              ] }}],
                            })
                            this.timeoutHandler('FRC16', 6500)
                    }
                    if(value ==='FRC16'){
                      this.setState({
                        messages: [...this.state.messages,
                            {message:{
                              value: "Anyway " + this.state.firstName + "! I hope I wasn't boring you haha. Is there anything else I can help with? ",
                              user: 'robot',
                                id: Math.random(),
                              options:[
                              { option: 'My Routines'},
                              { option: 'Help and Motivation'},   
                              { option: "I'm new, how do I use the app?"},
                              { option: "No thanks, I'm done"}
                              ] }}],
                              typing:false
                            })
                    }
                  //end of section on FRC (1/4)
                    
                  //section 2 - My Routines (2/4)
                  if(value ==='My Routines'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Ok, no problem. What do you want to know about your routines?",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            { option: 'How are my routines designed?'},
                            { option: 'What are the CARs routines?'},   
                            { option: 'Important things to remember'},
                            { option: 'How often should I do my routines?'}, 
                            ] }}],
                            typing:false
                          })
                  }
                  //Routine Design - Section 2.1
                  //end of Section 2.1 - Routine Design
                  if(value ==='How are my routines designed?'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "So each routine is designed specifically to help you improve your weakest areas.",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('routineDesign1', 3000)
                  }
                  if(value ==='routineDesign1'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "When you complete an assessment with me I take your results and design a routine just for you",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('routineDesign2', 4000)
                  }
                  if(value ==='routineDesign2'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "The individual exercises are designed by the real Coach Davey, he's an FRC Movement Specialist.",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('routineDesign3', 4000)
                  }
                  if(value ==='routineDesign3'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "If you follow the exercises in your personalised routines it will help you to improve your joint strength and range of motion!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpRD', 5000)
                  }
                  if(value ==='anymoreHelpRD'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Sounds good right! Is there anything else I can help you with " +this.state.firstName+ "?",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                              { option: 'What are the CARs routines?'},   
                              { option: 'Important things to remember'},
                              { option: 'How often should I do my routines?'}, 
                              { option: 'Learn more about FRC'},
                              { option: 'Help and Motivation'},
                              { option: "I'm new, how do I use the app?"},
                              { option: "No thanks, I'm done"}
                            ] }}],
                            typing:false
                          })
                  }
                  //CARS Design - Section 2.2
                  if(value ==='What are the CARs routines?'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "CARS stands for Controlled Articular Rotations. Its a joint mobility routine that you should try to practice every day",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('CARS1', 4000)
                  }
                  if(value ==='CARS1'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "It's often called the morning routine as its a great way to start the day!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('CARS2', 3500)
                  }
                  if(value ==='CARS2'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "In the app there are three different levels of CARS routines. While the exercises are very similiar there is a different focus in each routine.",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('CARS3', 6000)
                  }
                  if(value ==='CARS3'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Make sure to check them out in the My Routines section of the app! You'll unlock the more difficult routines as you progress!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpCARs', 5000)
                  }
                  if(value ==='anymoreHelpCARs'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "I hope that was helpful " + this.state.firstName + "! Do you need me for anything else?",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                              { option: 'How are my routines designed?'},
                              { option: 'Important things to remember'},
                              { option: 'How often should I do my routines?'}, 
                              { option: 'Learn more about FRC'},
                              { option: 'Help and Motivation'},
                              { option: "I'm new, how do I use the app?"},
                              { option: "No thanks, I'm done"}
                            ] }}],
                            typing: false
                          })
                  }
                  //end of Section 2.2 - CARS Design
                  //Important things to remember - Section 2.3
                  if(value ==='Important things to remember'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Alright, so when you're doing the routines theres a few important things to remember!",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('importantPoints1', 3500)
                  }
                  if(value ==='importantPoints1'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Breathing is important in the routines. Follow the instructions carefully in each video and monitor your breathing.",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('importantPoints2', 5500)
                  }
                  if(value ==='importantPoints2'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Body control is also really important when performing the routines! Stabilise your body and focus on only moving one body area at a time!",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('importantPoints3', 6500)
                  }
                  if(value ==='importantPoints3'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "If you get clicks and cracks when doing the exercises its a sign that the joint requires more motion and neurological drive to restore lost ranges of motion and maintain the health of the joint. So keep at it!",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpIP', 9000)
                  }
                  if(value ==='anymoreHelpIP'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Well " +this.state.firstName + ", I hope that was useful! Is there anything else you want to know about?",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                              { option: 'How are my routines designed?'},
                              { option: 'What are the CARs routines?'},   
                              { option: 'How often should I do my routines?'},
                              { option: 'Learn more about FRC'},
                              { option: 'Help and Motivation'},
                              { option: "I'm new, how do I use the app?"},
                              { option: "No thanks, I'm done"}
                            ] }}],
                            typing: false
                          })
                  }
                  //end of Section 2.3 - Important things to remember
                  //How often - Section 2.4
                  if(value ==='How often should I do my routines?'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "So you only need to do the assessment routine before your first assessment, or if you forget how the assessment process works",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('howOften1', 4500)
                  }
                  if(value ==='howOften1'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "With the CARs routines, you should try to do them every morning! its a great way to get your body loosened up from the get go!",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('howOften2', 4500)
                  }
                  if(value ==='howOften2'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "With your personalised routines try to do them at least every other day! if you feel you can do them every day then go for it!",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpHO', 4500)
                  }
                  if(value ==='anymoreHelpHO'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Hope that helped " +this.state.firstName+ "! Can I help you with anything else?",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            { option: 'How are my routines designed?'},
                            { option: 'What are the CARs routines?'},   
                            { option: 'Important things to remember'},
                            { option: 'Learn more about FRC'},
                            { option: 'Help and Motivation'},
                            { option: "I'm new, how do I use the app?"},
                            { option: "No thanks, I'm done"}
                            ] }}],
                            typing:false
                          })
                  }
                  //end of Section 2.4 - how often
                  //end of section on My Routines (2/4)
                  //section 3 - Help and Motivation (3/4)
                  //Pain - Section 3.1
                  if(value ==='Help and Motivation'){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "No worries! That's what I'm here for! What do you need help with?",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            { option: "I feel pain doing the routines"},
                            { option: "I'm struggling to find time!"},   
                            { option: 'I need to build better habits'},
                            { option: "I can't get motivated"}, 
                            { option: 'The routines are too hard'},
                            ] }}],
                            typing:false
                          })
                  }
                  if(value ==="I feel pain doing the routines"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Ok. How would you describe the pain? ",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            { option: "Sharp"},
                            { option: "Mild"},   
                            ] }}],
                            typing:false
                          })
                  }
                  if(value ==="Sharp"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Right, if it's a sharp pain I wouldn't continue doing the routines until I'd spoken to a medical professional",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('painSharp1', 4000)
                  }
                  if(value ==="painSharp1"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "The team and I can help with injury recovery but you may need to take a break before trying the Motivity routines",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('howLong', 4000)
                  }
                  if(value ==="howLong"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Have you been feeling the pain for a long time?",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            { option: "Yea I've felt it for a while"},
                            { option: "No, not too long"},  
                            ] }}],
                            typing: false
                          })
                  }
                  if(value ==="Mild"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "OK if it's only a mild pain it may just be some tightness in your joints",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('painMild1', 3000)
                  }
                  if(value ==="painMild1"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Perform the routines to the best of your ability and if the pain continues I would speak to a doctor",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('howLong', 4000)
                  }
                  if(value ==="Yea I've felt it for a while"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "If it's a persistent pain and you haven't spoken to anyone yet I would contact your doctor or local physio! ",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpPain', 4000)
                  }
                  if(value ==="No, not too long"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Ok keep an eye on it over the next couple of days and if it doesn't go away get it checked out!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpPain', 4000)
                  }
                  if(value ==="anymoreHelpPain"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Hope that was helpful " + this.state.firstName + "! Can I help you with anything else?",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            
                            { option: "I'm struggling to find time!"},   
                            { option: 'I need to build better habits'},
                            { option: "I can't get motivated"}, 
                            { option: 'The routines are too hard'},
                            { option: 'Learn more about FRC'},
                            { option: 'My Routines'},
                            { option: "I'm new, how do I use the app?"},
                            { option: "No thanks, I'm done"}
                            ] }}],
                            typing: false
                          })
                  }
                  //end of Section 3.1 - Pain
                  //Section 3.2 - Time 
                  if(value ==="I'm struggling to find time!"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "I completely understand! It's difficult to make time everyday to look after your joints",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('time1', 3500)
                  }
                  if(value ==="time1"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Especially if you have work and other responsibilites!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('time2', 3000)
                  }
                  if(value ==="time2"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Just remember that we're here for a long time " +this.state.firstName+ "! Taking 20 -30 minutes out of your day to practice our routines will mean a lifetime of better mobility",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('time3', 7000)
                  }
                  if(value ==="time3"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "It may seem difficult at first but set a little time aside each day or every other day and soon you'll get into your rhythm ",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpTime', 5000)
                  }
                  if(value ==="anymoreHelpTime"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "I hope that was useful too you " + this.state.firstName + ". Is there anything else you want help with?",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            { option: "I feel pain doing the routines"},
                            { option: 'I need to build better habits'},
                            { option: "I can't get motivated"}, 
                            { option: 'The routines are too hard'},
                            { option: 'Learn more about FRC'},
                            { option: 'My Routines'},
                            { option: "I'm new, how do I use the app?"},
                            { option: "No thanks, I'm done"}
                            ] }}],
                            typing: false
                          })
                  }
                  //end of Section 3.2 - Time 
                  //Section 3.3 - Habits
                  if(value ==="I need to build better habits"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Building good habits can be hard! Do you find it hard to learn new things in general?",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            { option: "I'm not great at it"},
                            { option: "I'm normally good at it"},
                            ] }}],
                            typing: false
                          })
                  }
                  if(value ==="I'm not great at it"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "OK so for me, I have a few simple rules for starting something new",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('notGreat', 3000)
                  }
                  if(value ==="notGreat"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "First of all, I remind myself that the more I practice, the easier it gets. That means if you practice every day it gets easier every day!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('notGreat2', 5500)
                  }
                  if(value ==="notGreat2"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Secondly, I believe that the brain can be trained to do anything. The secret is repetition. Put a little time aside each day to practice and you'll reap the rewards in no time!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('notGreat3', 6500)
                  }
                  if(value ==="notGreat3"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "You can do it if you put in the time and effort. Monitor your progress in the app and focus in on improving your weaker areas. ",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpHabits', 5000)
                  }
                  if(value ==="I'm normally good at it"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Ok good! So just like with anything you learn for the first time, you have to put in the time early on.",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('goodAtLearning', 5000)
                  }
                  if(value ==="goodAtLearning1"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Repeat the routines each day or every other day and monitor your progress in the app. Focus on building the right habits to help you improve.",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpHabits', 6000)
                  }
                  if(value ==="anymoreHelpHabits"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Well " + this.state.firstName + " I hope that was helpful! Can I help you with anything else?",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            { option: "I feel pain doing the routines"},
                            { option: "I'm struggling to find time!"},   
                            { option: "I can't get motivated"}, 
                            { option: 'The routines are too hard'},
                            { option: 'Learn more about FRC'},
                            { option: 'My Routines'},
                            { option: "I'm new, how do I use the app?"},
                            { option: "No thanks, I'm done"}
                            ] }}],
                            typing:false
                          })
                  }
                  //end of Section 3.3 - Habits
                  //Section 3.4 - Motivation
                  if(value ==="I can't get motivated"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Tell me about it haha! Everybody struggles to keep focused sometimes.",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('Motivated1', 3000)
                  }
                  if(value ==="Motivated1"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "What would you say is the reason you lose focus? ",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                              { option: 'I get bored'},
                              { option: "I'm not making any progress"},
                              { option: "I don't have enough energy after work"},
                            ] }}],
                            typing:false
                          })
                  }
                  if(value ==="I get bored"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Haha yea I understand! Sometimes exercise can feel a bit repetitive",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('bored1', 3000)
                  }
                  if(value ==="bored1"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Monitor your progress in the app to help stay focused! And if you're bored of the gym get outside and and exercise in the fresh air! It always helps me ",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpMotivation', 6000)
                  }
                  if(value ==="I'm not making any progress"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "I understand how you feel but remember It can be difficult to see changes early on when working on your joints.",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('progress1', 5000)
                  }
                  if(value ==="progress1"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Don't worry if you're not seeing any in app progress just yet, it can take time to loosen up the joints and improve your range of motion",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('progress2', 6000)
                  }
                  if(value ==="progress2"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Motivity is about creating a proactive approach to injury prevention. As the creator of FRC Dr. Spina says, you will always regret not training the range of motion you got injured in. ",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('progress3', 7000)
                  }
                  if(value ==="progress3"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Focus on this goal and don't worry to much about the numbers and results!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpMotivation', 3500)
                  }
                  if(value ==="I don't have enough energy after work"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "I know the feeling! I think the best thing to do is play around with the time you do your routines",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('energy1', 4000)
                  }
                  if(value ==="energy1"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Try doing your exercises in the morning, or straight away when you come in after work",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpMotivation', 4000)
                  }
                  if(value ==="anymoreHelpMotivation"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "I hope that was good advice " + this.state.firstName + "! Can I help you with anything else?",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            { option: "I feel pain doing the routines"},
                            { option: "I'm struggling to find time!"},   
                            { option: "I need to build better habits"}, 
                            { option: 'The routines are too hard'},
                            { option: 'Learn more about FRC'},
                            { option: 'My Routines'},
                            { option: "I'm new, how do I use the app?"},
                            { option: "No thanks, I'm done"}
                            ] }}],
                            typing:false
                          })
                  }
                  //end of Section 3.4 - Motivation
                  //Section 3.5 - Difficult
                  if(value ==="The routines are too hard"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Alright, if you're struggling with the routines take things slower",
                            user: 'robot',
                              id: Math.random(),
                            options:[ 
                            ] }}],
                          })
                          this.timeoutHandler('tooHard1', 3000)
                  }
                  if(value ==="tooHard1"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "If you reach a point in an exercise where you feel pain and you're not recovering from an injury you may be over-extending.",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('tooHard2', 5500)
                  }
                  if(value ==="tooHard2"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Decrease your range of motion when doing an exercise if you find it too difficult at first. Your range will improve the more you practice!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('anymoreHelpDifficulty', 6000)
                          
                  }
                  if(value ==="anymoreHelpDifficulty"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Well " + this.state.firstName + ", I hope that helped! Is there anything else I can do for you??",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            { option: "I feel pain doing the routines"},
                            { option: "I'm struggling to find time!"},   
                            { option: "I need to build better habits"}, 
                            { option: "I can't get motivated"},
                            { option: 'Learn more about FRC'},
                            { option: 'My Routines'},
                            { option: "I'm new, how do I use the app?"},
                            { option: "No thanks, I'm done"}
                            ] }}],
                            typing:false
                          })
                  }
                  //end of Section 3.5 - Difficult
                  //end of section on Help and Motivation (3/4)
                  //Section 4 - How to use the app (4/4)
                  if(value ==="I'm new, how do I use the app?"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "First of all, welcome from the whole team at Motivity!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('newToApp1', 4000)
                  }
                  if(value ==="newToApp1"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "So seeing as your new to the app, the first thing you should do is check out the Assessment Routine on the My Routines page",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('newToApp2', 6500)
                  }
                  if(value ==="newToApp2"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "After watching the video, take your first assessment with me!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('newToApp3', 4000)
                  }
                  if(value ==="newToApp3"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Once you've done an assessment you'll get your own personalised routine to help improve your weakest areas.",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('newToApp4', 5000)
                  }
                  if(value ==="newToApp4"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "You'll also get a CARs routine that you should try to practice every day",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('newToApp5', 4000)
                  }
                  if(value ==="newToApp5"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "Once you've completed a week of the routines you should come back to me to take another assessment!",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                            ] }}],
                          })
                          this.timeoutHandler('newToApp6', 5000)
                  }         
                  if(value ==="newToApp6"){
                    this.setState({
                      messages: [...this.state.messages,
                          {message:{
                            value: "I hope that was helpful " + this.state.firstName + ". Is there anything else I can help with?",
                            user: 'robot',
                              id: Math.random(),
                            options:[
                              { option: 'Learn more about FRC'},
                              { option: 'My Routines'},
                              { option: 'Help and Motivation'},
                              { option: "No thanks, I'm done"}
                            ] }}],
                            typing: false
                          })
                  }                
                  //end of Section 4 on How to use the app (4/4)

                  //exit chatbot 
                  if(value === "No thanks, I'm done" || value === 'I clicked by mistake!'){
                    this.setState({
                      messages: [...this.state.messages,
                         {message:{
                           value: "No problem, have a good day! ",
                            user: 'robot',
                             id: Math.random(),
                           options:[
                          ] }}],
                          typing: false
                    })
                    setTimeout(() => {
                        this.redirectMyAccount()
                    }, 3000);
                  }  
    }

    //redirect to my account if do assessment = no
    redirectMyAccount=() => {
      this.props.history.push("/myaccount");
      }  

    //disable a button group after click or hide. disable = elems[i].disabled, hide = elems[i].hidden
    disableButtons = ()=>{
      var elems = document.querySelectorAll('[id^="one"]');
      for (var i = 0; i < elems.length; i++) {
          elems[i].hidden = true;
      }
    }

    //keep scroll at the bottom
    componentDidUpdate() {
      if(!this.state.loading){
        const objDiv = document.getElementById('out');
        objDiv.scrollTop = objDiv.scrollHeight;
      }
   
  }

  ImageLoadedhandler() {
    this.setState({ imageLoaded: true });
  }

  ImageErrorhandler() {
    this.setState({ imageLoaded: false});
  }

render(){

  if(this.state.error){
    return <Redirect to= '/error' />
  }

  const messages = this.state.messages.map(message=>{

      return message.message.options ?
      
      <div key={message.message.id} className = {classes.Robot}>
        <div className={this.state.imageLoaded ? classes.PhotoText : classes.Invisible}>
         <div className={classes.AvatarCropper}>
        <img 
            src={Avatar} 
            className={classes.Avatar} 
            alt='avatar' 
            onLoad={this.ImageLoadedhandler.bind(this)}
            onError={this.ImageErrorhandler.bind(this)}
         /></div>
  
        
      <div className ={this.state.imageLoaded ? classes.SpeechBubbleRobot : classes.Invisible}>    
            <p>{message.message.value}</p>
      </div>
      </div>
      <div id = 'one' className ={classes.RobotButtons}>
      {message.message.options.map((option =>{
      return  <Button  btnType ='Conversation' key = {Math.random()} clicked = {() => this.updateMessageHandler(option.option)}>{option.option}</Button>

      }))}
      </div>

      </div> :
     <div key={message.message.id}  className = {classes.User}>
         <div className={classes.SpeechBubbleUser}><div className= {classes.AlignRight}><p>{message.message.value}</p></div>
    </div>
     </div>


})
  return(

   <div className = {classes.Container}>
   <div className = {classes.Header}>
   <div className = {classes.HeaderText}>
     <span className={classes.Dot}></span>
      <h3>Coach Davey Bot</h3>
     </div>
               
   </div>
   {this.state.loading ? <Spinner /> :
    <div id ='out' className = {classes.Body}>
    {messages}
    
   </div>}
   <div className = {classes.Input}>
   <div className={this.state.typing ? classes.IsWriting : classes.Invisible}>
        <p>DaveyBot is typing...</p>
    </div>
    
   </div>
  </div>
  )
}
}
export default MyChatbot;