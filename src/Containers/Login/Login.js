import React, {Component} from 'react';
import classes from './Login.css';
import Button from '../../Components/UI/Button/Button';
import {Link} from 'react-router-dom';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import Input from '../../Components/UI/Input/Input';
import * as actions from '../../store/actions/actions';
import {connect} from 'react-redux';
import Modal from '../../Components/UI/Modal/Modal';
import {Redirect} from 'react-router-dom';

//Login page to let a user log in

export class Login extends Component{

    state ={
        loginForm:{
            user:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Enter your username'
                },
                value: '',
                label: 'Username: '
            },
            pass:{
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder: 'Enter your password'
                },
                value: '',
                label: 'Password: '
               
        }
        },
        modalShown: true
       
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    //method to handle user input
    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedLoginForm = {
            ...this.state.loginForm,
            [inputIdentifier]:{
                ...this.state.loginForm[inputIdentifier],
                value: event.target.value
            }
        };
        this.setState({loginForm: updatedLoginForm});

    }

    //show modal and call onAuth method
    loginHandler = (event) =>{
        event.preventDefault();
        this.props.onAuth(this.state.loginForm.user.value, this.state.loginForm.pass.value);
        this.setState({
            modalShown:true
        })
    }

    //modal closed
    closeModalHandler = () =>{
        this.setState({
        modalShown:false
        })
    }

    render() {
        const formElementsArray =[];
        for (let key in this.state.loginForm){
            formElementsArray.push({
                id: key,
                config: this.state.loginForm[key]
            }); 
        }

        let errorMessage = null;
        if(this.props.error) {
           
            errorMessage =(
                <p>{this.props.error}</p>
            );
        }
                   
        let authRedirect = null;
        let coachRedirect = null;

        if (this.props.isAuthenticated){

        if(localStorage.getItem('id') === '16'){
         coachRedirect = <Redirect to='/coachindex'/>
        }
            authRedirect = <Redirect to= '/' />
        }
        return (
            <Auxiliary>
                <Modal shown ={errorMessage && this.state.modalShown} modalClosed ={this.closeModalHandler}>
                    {errorMessage}  
                </Modal>
                {coachRedirect}
                {authRedirect}

                <div className ={classes.Container}>
                    <div className = {classes.Login}>
                    <h3>Welcome back!</h3>
                    <p>Log in to practice your routines!</p>
                    <form onSubmit={this.loginHandler}>
                    {formElementsArray.map(formElement =>(
                        <Input
                             key ={formElement.id}
                             elementType ={formElement.config.elementType}
                             elementConfig = {formElement.config.elementConfig}
                             value = {formElement.config.value}
                             label = {formElement.config.label}
                             inputted = {(event)=>this.inputChangedHandler(event,formElement.id)}
                        />
                    ))}
                     
                    <Button btnType='Continue'>Log In</Button>

                    </form>
                   
                    <p className={classes.Information}>Don't have an account? Click <Link to='/register' style={{ textDecoration: 'none', color: 'white'}}><span style={{textDecoration: 'underline'}}>here</span></Link> to register.</p>
                    </div>
                </div>       
            </Auxiliary>
        );
    }
};

const mapStateToProps = state =>{

    return{
        loading: state.loading,
        error: state.error,
        isAuthenticated: state.token !== null
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        onAuth: (user, pass) => dispatch(actions.auth(user, pass))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);