import React, {Component} from 'react';
import {Route, Switch, withRouter} from 'react-router-dom';
import Layout from './Components/Layout/Layout';
import Index from './Containers/Index/Index';
import Login from './Containers/Login/Login';
import Logout from './Containers/Logout/Logout';
import {connect} from 'react-redux';
import * as actions from './store/actions/actions';
import asyncComponent from './hoc/asyncComponent/asyncComponent';

//Lazy Loading for certain modules 
const asyncChatbot = asyncComponent(() =>{
  return import('./Containers/Chatbot/Chatbot')
});

const asyncAssessmentBot = asyncComponent(() =>{
  return import('./Containers/AssessmentBot/AssessmentBot')
});

const asyncUpdateUser = asyncComponent(() =>{
  return import('./Containers/UpdateUser/UpdateUser')
});

const asyncMyRoutine  = asyncComponent(() =>{
  return import('./Containers/MyRoutines/MyRoutine/MyRoutine')
});

const asyncMyRoutineAlt  = asyncComponent(() =>{
  return import('./Containers/MyRoutines/MyRoutine/MyRoutineAlt')
});

const asyncRegister = asyncComponent(() =>{
  return import('./Containers/Register/Register')
});

const asyncMyResults = asyncComponent(() =>{
  return import('./Containers/MyResults/MyResults')
});

const asyncMyResult = asyncComponent(() =>{
  return import('./Containers/MyResults/MyResult/MyResult')
});

const asyncContact  = asyncComponent(() =>{
  return import('./Containers/Contact/Contact')
});

const asyncMyAccount = asyncComponent(() =>{
  return import('./Containers/MyAccount/MyAccount')
});

const asyncMyRoutines  = asyncComponent(() =>{
  return import('./Containers/MyRoutines/MyRoutines')
});

const asyncDeleteRoutine  = asyncComponent(() =>{
  return import('./Containers/DeleteRoutine/DeleteRoutine')
});

const asyncNotFound = asyncComponent(() =>{
  return import('./Containers/NotFound/NotFound')
});

const asyncCoachIndex = asyncComponent(() =>{
  return import('./Containers/Coach/CoachIndex/CoachIndex')
});

const asyncUserStats = asyncComponent(() =>{
  return import('./Containers/Coach/UserStats/UserStats')
});

const asyncIndividualUser = asyncComponent(() =>{
  return import('./Containers/Coach/IndividualUser/IndividualUser')
});

const asyncUserResults = asyncComponent(() =>{
  return import('./Containers/Coach/UserResults/UserResults')
});

const asyncUserResult = asyncComponent(() =>{
  return import('./Containers/Coach/UserResults/UserResult/UserResult')
});

const asyncGeneralStats = asyncComponent(() =>{
  return import('./Containers/Coach/GeneralStats/GeneralStats')
});

class App extends Component {

  componentDidMount (){
    this.props.onTryAutoSignup();
  }

  render(){

    //unauthenicated routes
    let routes = (
          <Switch>
             <Route path='/contact' component = {asyncContact} />
             <Route path='/register' component ={asyncRegister} />
             <Route path='/login' component ={Login} />
             <Route path="/error" component={asyncNotFound}/>
             <Route path='/' exact component ={Index} />
             <Route path="*" component={Index}/>
          </Switch>
    );

    //authenticated routes
    if(localStorage.getItem('token')){

      //if admin 
      if(localStorage.getItem('id')==='16'){
        routes = (
          <Switch>
              <Route path = '/generalstats' component = {asyncGeneralStats} />
              <Route path = '/result/:userid/:id/:title' component = {asyncUserResult} />
              <Route path = '/results/:id' component = {asyncUserResults} />
              <Route path = '/user/:id' component = {asyncIndividualUser} />
              <Route path = '/userstats'  component = {asyncUserStats} />
              <Route path ='/logout' component ={Logout} />
              <Route path = '/updateinfo' component ={asyncUpdateUser}/>
              <Route path="/error" component={asyncNotFound}/>
              <Route path='/' exact component ={asyncCoachIndex} />
              <Route path="*" component={asyncCoachIndex}/>
          </Switch>
        );
      }else{
      routes = (
        <Switch>
            <Route path = '/assessment' component = {asyncAssessmentBot} />
            <Route path = '/chatbot' component = {asyncChatbot}/>
            <Route path ='/logout' component ={Logout} />
            <Route path = '/myresult/:id/:title' component ={asyncMyResult} />
            <Route path = '/myresults' component = {asyncMyResults}/>
            <Route path = '/updateinfo' component ={asyncUpdateUser}/>
            <Route path = '/myroutinealt/:id' component ={asyncMyRoutineAlt} />
            <Route path ='/deleteroutine/:id/:title' component={asyncDeleteRoutine} />
            <Route path ='/myroutine/:id/:title' component ={asyncMyRoutine} />
            <Route path='/myroutines' component ={asyncMyRoutines} />
            <Route path='/myaccount' component ={asyncMyAccount} /> 
            <Route path='/contact' component = {asyncContact} />
             <Route path="/error" component={asyncNotFound}/>
             <Route path='/' exact component ={Index} />
             <Route path="*" component={Index}/>
        </Switch>
      );
      }
    }

  return (
    <div>
      <Layout>
         {routes}
       </Layout>
    </div>
  );
}
}

const mapDispatchToProps = dispatch =>{
  return{
    onTryAutoSignup: () => dispatch(actions.authCheckState())
  };
 };

export default withRouter(connect(null, mapDispatchToProps)(App));