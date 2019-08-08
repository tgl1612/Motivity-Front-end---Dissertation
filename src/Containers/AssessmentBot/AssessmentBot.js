import React, {Component} from 'react';
import classes from './AssessmentBot.css';
import Button from '../../Components/UI/Button/Button';
import axios from '../../axios-instance';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Avatar from '../../Components/UI/Images/Coachdavey.PNG';
import {Redirect} from 'react-router-dom';

//MyAssessmentBot page for users to take assessments with the chatbot

class MyAssessmentBot extends Component{

  state ={
    messages:[],
  loading: true,
  typing: false,
  user: '',
  imageLoaded: false,
  firstName: '',
  userObject: [],
  lastAssessment: [],
  newAssessment:[],
  error: false,
  count: 0,
  answer1: '',
  answer2: '',
  answer3: '',
  answer4: '',
  answer5: '',
  answer6: '',
  answer7: '',
  answer8: '',
  answer9: '',
}

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
                userObject: response[0].data.user, 
                lastAssessment: response[0].data.user.assessments[0], 
                count: response[1].data.count,
                loading:false,
                messages:[
                    {
                      message: {
                        value:"Hey " + response[0].data.user.firstName + "! So you want to take an assessment? ",
                        user: 'robot',
                        id: Math.random(),
                        options:[
                          {option: 'Yes!'},
                          {option: 'No, I clicked the wrong link!'}
                        ]
                      }}
                  ],
                user: response[0].data.user.user,
                firstName: response[0].data.user.firstName
                 })          
        })
       
        .catch(error=>{
          this.setState({
            error: true
          })
        });
    }

    componentWillUnmount(){
      clearInterval(this.timeout)
    }

    //method to manage setTimeout between messages
    timeoutHandler = (message, time, hiddenMessage) =>{
      this.timeout = setTimeout(() => {
         this.updateRobotMessageHandler(message, hiddenMessage)
      }, time);
     }


    //function to add user messages to message array, then call updateRobotHandler to get robot response
  updateMessageHandler = (value, hiddenValue) =>{
    this.setState({
    messages: [...this.state.messages, {message:{value: value, user: this.state.user , id: Math.random()}}],
        })
        this.timeoutHandler(value, 1500, hiddenValue)

        setTimeout(()=>{
          this.setState({
            typing:true
          })
        },400)
        this.disableButtons()
        }

     //function to add robot messages to messages array    
    updateRobotMessageHandler = (value, hiddenValue)=>{
    //to get user assessment details 
    let userLevelId;
    let newUserLevelId;
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
        }

    }
    newUserLevelId = this.state.newAssessment.userLevelId;
   
    let userLevel = '';
        if(userLevelId === 1){
            userLevel = 'Novice'
        }else if(userLevelId === 2){
            userLevel = 'Intermediate'
        }else if(userLevelId ===3){
            userLevel = 'Advanced'
        }

    let newUserLevel = '';
        if(newUserLevelId === 1){
            newUserLevel = 'a Novice'
        }else if(newUserLevelId === 2){
          newUserLevel = 'an Intermediate'
        }else if(newUserLevelId ===3){
          newUserLevel = 'an Advanced'
        }
        //introductions
    // has done assessment before and has been more than seven days since last assessment 
         if((value === 'Yes!' && assessmentCount > 0 && daysSinceAssessment > 7) || (value === 'Yes I do!')){
           let nextAssessmentCount;
           nextAssessmentCount = ++assessmentCount
            this.setState({
            messages: [...this.state.messages,
                {message:{
                value: "Alright then! According to my records this will be assessment number " + nextAssessmentCount + " for you",
                    user: 'robot',
                    id: Math.random(),
                options:[
                ] }}]
            })
            this.timeoutHandler('Intro1', 4000)
         }
          // has done assessment before and has NOT been more than seven days since last assessment 
          if((value === 'Yes!' && assessmentCount > 0 && daysSinceAssessment < 7) ){
            this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Ok it's only been " + daysSinceAssessment + " days since your last assessment. It's best to wait at least a week before taking your next assessment! ",
                    user: 'robot',
                     id: Math.random(),
                   options:[
                   ] }}],
            })
            this.timeoutHandler('warning', 5000)
          }
          if(value === 'warning'){
            this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Are you sure you still want to do the assessment? ",
                    user: 'robot',
                     id: Math.random(),
                   options:[
                    {option: 'Yes I do!'},
                    {option: "No I'll wait"}
                   ] }}],
                   typing: false
            })
          }
         // first assessment 
         if(value === 'Yes!' && assessmentCount === 0){
            this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Excellent! Time for your first assessment.",
                    user: 'robot',
                     id: Math.random(),
                   options:[
                   ] }}],
            })
            this.timeoutHandler('warning2', 3500)
          }
          if(value === 'warning2'){
            this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Before we start, if you haven't watched the assessment video in the MyRoutines section of the app you should head over there now. ",
                    user: 'robot',
                     id: Math.random(),
                   options:[
                   ] }}],
            })
            this.timeoutHandler('warning3', 5000)
          }
          if(value === 'warning3'){
            this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Do you want to watch the video?",
                    user: 'robot',
                     id: Math.random(),
                   options:[
                    {option: 'Yea sure'},
                    {option: "I've already watched it!"}
                   ] }}],
                   typing: false
            })
          }
           if(value === 'Yea sure'){
            this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Ok see you soon!",
                    user: 'robot',
                     id: Math.random(),
                   options:[
                   ] }}],
                   typing: false
            })
            setTimeout(() => {
               this.redirectRoutines()
            }, 2500);
          } 
          if(value ==="I've already watched it!"){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Ok cool!",
                      user: 'robot',
                       id: Math.random(),
                     options:[
                     ] }}],
              })
              this.timeoutHandler('Intro2', 1500)
          }
          if(value === 'Intro1' && userLevelId !== 3){
            this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Currently your level is " + userLevel + ". Let's see if you move up a level today! ",
                    user: 'robot',
                     id: Math.random(),
                   options:[
                   ] }}],
            })
            this.timeoutHandler('Intro2', 3500)
          }
          if(value === 'Intro1' && userLevelId === 3){
            this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Currently your level is " + userLevel + ". So think of this assessment as a check up as you can't get any higher!",
                    user: 'robot',
                     id: Math.random(),
                   options:[
                   ] }}],
            })
            this.timeoutHandler('Intro2', 4000)
          }
          if(value === 'Intro2'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Remember to be honest with your answers so I can accurately assess you",
                      user: 'robot',
                       id: Math.random(),
                     options:[
                     ] }}],
              })
              this.timeoutHandler('Intro3', 4000)
          }
          if(value === 'Intro3'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Also remember that a score of 1 means you feel a sharp pain or pinch of the closing joint when doing the exercise",
                      user: 'robot',
                       id: Math.random(),
                     options:[
                     ] }}],
              })
              this.timeoutHandler('Intro4', 4500)
          }
          if(value === 'Intro4'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "A score of 2 indicates you have a feeling of tightness or restriction on the opening angle of the joint",
                      user: 'robot',
                       id: Math.random(),
                     options:[
                     ] }}],
              })
              this.timeoutHandler('Intro5', 4000)
          }
          if(value === 'Intro5'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Finally a 3 means you can move smoothly and unrestricted within your normal range of motion",
                      user: 'robot',
                       id: Math.random(),
                     options:[
                     ] }}],
              })
              this.timeoutHandler('Intro6', 4000)
          }
          if(value === 'Intro6'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Alright then lets get started",
                      user: 'robot',
                       id: Math.random(),
                     options:[
                     ] }}],
              })
              this.timeoutHandler('Question1', 3500)
          }
         //clicked wrong link or wants to wait longer = navigate away
         if(value === 'No, I clicked the wrong link!' || value === "No I'll wait"){
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
        //end of introduction
        
        //start of assessment questions
        //question1 
        if(value === 'Question1'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "OK so question 1 is about the neck. How would you score yourself out of 3?",
                     hiddenValue: "Question2",
                     user: 'robot',
                     id: Math.random(),
                     options:[
                        {option: '1'},
                        {option: "2"},
                        {option: "3"},
                    ] }}],
                    typing: false,
                    
              })
          }
          //question2 
          if(hiddenValue === 'Question2'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Alright good! Question 2 is about the spine. How would you score yourself out of 3?",
                     hiddenValue: "Question3",
                     user: 'robot',
                     id: Math.random(),
                     options:[
                        {option: '1'},
                        {option: "2"},
                        {option: "3"},
                    ] }}],
                    typing: false,
                    answer1: value,
              })
          }
          //question3 
          if(hiddenValue === 'Question3'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Good! On to Question 3. This time its the scapulas (that's your shoulder blades!). How would you score yourself out of 3?",
                     hiddenValue: "Question4",
                     user: 'robot',
                     id: Math.random(),
                     options:[
                        {option: '1'},
                        {option: "2"},
                        {option: "3"},
                    ] }}],
                    typing: false,
                    answer2: value,

              })
          }
          //question4 
          if(hiddenValue === 'Question4'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "OK! Question 4 concerns the shoulders. How would you score yourself out of 3?",
                     hiddenValue: "Question5",
                     user: 'robot',
                     id: Math.random(),
                     options:[
                        {option: '1'},
                        {option: "2"},
                        {option: "3"},
                    ] }}],
                    typing: false,
                    answer3: value,

              })
          }
          //question5 
          if(hiddenValue === 'Question5'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Great " + this.state.firstName+ "! You're halfway there. Question 5 is about the elbows. How would you score yourself out of 3?",
                     hiddenValue: "Question6",
                     user: 'robot',
                     id: Math.random(),
                     options:[
                        {option: '1'},
                        {option: "2"},
                        {option: "3"},
                    ] }}],
                    typing: false,
                    answer4: value,

              })
          }
          //question6 
          if(hiddenValue === 'Question6'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Question 6 takes us to the wrists. How would you score yourself out of 3?",
                     hiddenValue: "Question7",
                     user: 'robot',
                     id: Math.random(),
                     options:[
                        {option: '1'},
                        {option: "2"},
                        {option: "3"},
                    ] }}],
                    typing: false,
                    answer5: value
              })
          }
          //question7 
          if(hiddenValue === 'Question7'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Alright we're down to the hips! How would you score yourself out of 3?",
                     hiddenValue: "Question8",
                     user: 'robot',
                     id: Math.random(),
                     options:[
                        {option: '1'},
                        {option: "2"},
                        {option: "3"},
                    ] }}],
                    typing: false,
                    answer6: value,
              })
          }
          //question8
          if(hiddenValue === 'Question8'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Question 8 is all about the knees. How would you score your knees out of 3?",
                     hiddenValue: "Question9",
                     user: 'robot',
                     id: Math.random(),
                     options:[
                        {option: '1'},
                        {option: "2"},
                        {option: "3"},
                    ] }}],
                    typing: false,
                    answer7: value,
              })
          }
          //question9 
          if(hiddenValue === 'Question9'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "And last but not least, Question 9! How would you score your ankles out of 3?",
                     hiddenValue: "finished",
                     user: 'robot',
                     id: Math.random(),
                     options:[
                        {option: '1'},
                        {option: "2"},
                        {option: "3"},
                    ] }}],
                    typing: false,                 
                    answer8: value,
              })
          }
        //end of assessment questions

        //start of results
        if(hiddenValue === 'finished'){
            this.setState({
                messages: [...this.state.messages,
                   {message:{
                     value: "Well done " + this.state.firstName+ "! You've completed your assessment. Are you happy with your answers?",
                     user: 'robot',
                     id: Math.random(),
                     options:[
                      {option: "Yep I'm happy!"},
                      {option: "No, I'd like to try again"},
                    ] }}],
                    typing: false,
                    answer9: value
              })
        }
        if(value === "Yep I'm happy!"){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Alright then lets get those results logged! Just a second",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}],
            })
            axios.post('assessments/assessment/' + localStorage.getItem('id'), {
              
              q1: this.state.answer1,
              q2: this.state.answer2,
              q3: this.state.answer3,
              q4: this.state.answer4,
              q5: this.state.answer5,
              q6: this.state.answer6,
              q7: this.state.answer7,
              q8: this.state.answer8,
              q9: this.state.answer9,
            },  {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token')
              }
          })
          .then(response =>{
            this.timeoutHandler('ResultsLogged', 2000)
          })
          .catch(error=>{
            this.updateRobotMessageHandler('ErrorUploading')         
          })
        }
        if(value === "ResultsLogged"){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Your results have been logged in the system! You now have a new routine waiting for you in the My Routines section",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}]
            })

            axios.get( '/user/' + localStorage.getItem('id'), {
              headers: {
                  Authorization: 'Bearer ' + localStorage.getItem('token')
              }
  
          })
          .then(response=>{
            this.setState({
              newAssessment: response.data.user.assessments[0]
            })
            this.timeoutHandler('ResultsLogged2', 3500)
          })
          .catch(err=>{
              this.updateRobotMessageHandler('ErrorFetch')
          })        
        }
        //if user improves level
        if(value === "ResultsLogged2" && newUserLevelId > userLevelId && assessmentCount >=1){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Congratulations " + this.state.firstName+ "! You have increased your level!! Excellent work",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}]
            })
            this.timeoutHandler('ResultsLogged3', 4000)
        }
        if(value === "ResultsLogged3" && newUserLevelId === 2){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "You are now " + newUserLevel + " user, enjoy your new CARs and personal routines! ",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}]
            })
            this.timeoutHandler('resultsFinished', 4000)
        }
        if(value === "ResultsLogged3" && newUserLevelId === 3){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "You are now " + newUserLevel + " user, enjoy your new CARS routine! You don't have any new personalised routines as your doing well! Keep at your CARs every day",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}]
            })
            this.timeoutHandler('resultsFinished', 5500)
        }

      //if user level stays the same AND it is not first assessment
        if(value === "ResultsLogged2" && newUserLevelId === userLevelId && assessmentCount >=1 && userLevelId!==3){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "So " + this.state.firstName+ ", you haven't gone up a level in this assessment. But don't worry about it",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}]
            })
            this.timeoutHandler('ResultsLogged4', 4000)
        }
        if(value === "ResultsLogged4"){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Remember numbers are just numbers! If you feel improvements then that's all that matters! ",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}]
            })
            this.timeoutHandler('resultsFinished', 4000)
        }
      //if it is first assessment
      if(value === "ResultsLogged2" && assessmentCount ===0){
        this.setState({
            messages: [...this.state.messages,
               {message:{
                 value: "Well done " + this.state.firstName+ ", you have completed your first assessment.",
                 user: 'robot',
                 id: Math.random(),
                 options:[
                ] }}]
          })
          this.timeoutHandler('ResultsLogged5', 3000)
      }
      if(value === "ResultsLogged5"){
        this.setState({
            messages: [...this.state.messages,
               {message:{
                 value: "You are "  + newUserLevel +  " user. Have fun trying out your new routine!",
                 user: 'robot',
                 id: Math.random(),
                 options:[
                ] }}]
          })
          this.timeoutHandler('resultsFinished', 2500)
      }
      //if user level was advanced and is still advanced
      if(value === "ResultsLogged2" && userLevelId === newUserLevelId && userLevelId ===3){
        this.setState({
            messages: [...this.state.messages,
               {message:{
                 value: "Well done " + this.state.firstName+ ", you are still an advanced user. Keep doing your CARs routine every day to maintain strong joints!",
                 user: 'robot',
                 id: Math.random(),
                 options:[
                ] }}]
          })
          this.timeoutHandler('resultsFinished', 5000)
        }
        if(value === "ResultsLogged2" && newUserLevelId < userLevelId){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "OK " + this.state.firstName+ ", this week's result was lower than last week but that's fine!",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}]
            })
            this.timeoutHandler('ResultsLogged4', 5000)
          }

        //finishing results section and errors
        if(value === 'resultsFinished' || value === "ErrorFetch"){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "Come back in a week for your next assessment. For now, would you like to check out your routines?",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                     {option: 'Yes, take me to my routines'},
                     {option: 'No, go to my account'}
                  ] }}],
                  typing: false
            })
           
        }
        if(value === "Yes, take me to my routines"){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "No problem! Have fun",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}],
                  typing: false
            })
            setTimeout(() => {
            this.redirectRoutines()
            }, 2000);
        }
        if(value === "No, go to my account"){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "No problem! Enjoy your day",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}],
                  typing: false
            })
            setTimeout(() => {
              this.redirectMyAccount()
          }, 2000);
        }
        if(value === "ErrorUploading"){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "I'm sorry "+this.state.firstName+ " there was a problem in the upload. Please try again!",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}]
            })
            this.timeoutHandler('Intro6', 3000)
          //   setTimeout(() => {
          //     this.updateRobotMessageHandler('Intro6')
          // }, 3000);
        }
        if(value === "No, I'd like to try again"){
          this.setState({
              messages: [...this.state.messages,
                 {message:{
                   value: "No problem!",
                   user: 'robot',
                   id: Math.random(),
                   options:[
                  ] }}]
            })
            this.timeoutHandler('Intro6', 2000)
          //   setTimeout(() => {
          //     this.updateRobotMessageHandler('Intro6')
          // }, 2000);

        }
        //end of results
       }
   
    //redirect to my account if do assessment = no
    redirectMyAccount=() => {
    this.props.history.push("/myaccount");
    }  
    //redirect to my routines if watch video = yes
    redirectRoutines=() => {
    this.props.history.push("/myroutines");
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

  //check if image is loaded
  ImageLoadedhandler() {
    this.setState({ imageLoaded: true });
  }
  //check if error when loading image
  ImageErrorhandler() {
    this.setState({ imageLoaded: false});
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

  if(this.state.error){
    return <Redirect to='/error' />
}
   
  //loop through messages 
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
      return  <Button  btnType ='Conversation' key = {Math.random()} clicked = {() => this.updateMessageHandler(option.option, message.message.hiddenValue)}>{option.option}</Button>

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
export default MyAssessmentBot;

