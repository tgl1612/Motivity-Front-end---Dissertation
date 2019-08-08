import React, {Component} from 'react';
import classes from './Register.css';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import axios from '../../axios-instance';
import Modal from '../../Components/UI/Modal/Modal';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import RegistrationValidator from '../../Components/Validators/RegistrationValidator';
import {checkValidation} from '../../Components/Validators/checkValidation';

//Register Page to register users to the system

class Register extends Component{

    //set the state of the registration form/spinner/modal
    state = {

        registrationForm: {
            firstName:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Enter your first name'
                },
                value: '',
                label: 'First Name: ',
                validation:{
                    required: true,
                    minLength: 3,
                    maxLength:16
                },
                valid: false,
                touched: false
            },
            lastName:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Enter your surname'
                },
                value: '',
                label: 'Surname: ',
                validation:{
                    required: true,
                    minLength: 3,
                    maxLength:16
                },
                valid: false,
                touched: false
            },
            emailAddress:{
                elementType: 'input',
                elementConfig:{
                    type:'email',
                    placeholder: 'Enter your email address'
                },
                value: '',
                label: 'Email Address: ',
                validation:{
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            user:{
                elementType: 'input',
                elementConfig:{
                    type:'text',
                    placeholder: 'Choose a username'
                },
                value: '',
                label: 'Username: ',
                validation:{
                    required: true,
                    minLength: 6,
                    maxLength:16
                },
                valid: false,
                touched: false
            },
            pass:{
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder: 'Choose a password'
                },
                value: '',
                label: 'Password: ',
                validation:{
                    required: true,
                    minLength: 8,
                    maxLength:20

                },
                valid: false,
                touched: false
            },
            confirmPass:{
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder: 'Re-enter your password'
                },
                value: '',
                label: 'Confirm Password: ',
                validation:{
                    required: true,
                    minLength: 8,
                    maxLength:20
                },
                valid: false,
                touched: false
            },
            genderId:{
                elementType: 'select',
                elementConfig:{
                    options:[
                        {value: '1', displayValue: 'Male'},
                        {value: '2', displayValue: 'Female'},
                        {value: '3', displayValue: 'Rather not say'}
                    ]
                },
                value: '1',
                label: 'Gender: ',
                valid: true,
                validation: {}
                
            },
        },
        registering: false,
        loading: false,
        errorMessages: []
    }

    componentDidMount(){
        window.scrollTo(0, 0);
    }

    //send post request to axios to register user
    registrationHandler = (event) =>{
        event.preventDefault();
        this.setState({loading:true});
        const regFormData ={};
        for(let regFormElementIdentifier in this.state.registrationForm){
            regFormData[regFormElementIdentifier] = this.state.registrationForm[regFormElementIdentifier].value;
        }
        axios.post('auth/register', regFormData)
        .then(res=>{
            this.setState({loading:false});

            if(res.status === 201){
                this.setState({error:null});
            }
        })
        .catch(error =>{
            this.setState({loading:false});
            this.setState({error: error, errorMessages: error.response.data.data});
                    
        })
    }

   //update form info (twoway binding)
    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedRegistrationForm = {
            ...this.state.registrationForm
        }
        const updatedRegFormElement = {
            ...updatedRegistrationForm[inputIdentifier]
        };
        updatedRegFormElement.value = event.target.value;
        updatedRegFormElement.valid = checkValidation(updatedRegFormElement.value, updatedRegFormElement.validation)
        updatedRegFormElement.touched = true;
        updatedRegistrationForm[inputIdentifier] = updatedRegFormElement;
        this.setState({registrationForm: updatedRegistrationForm});
    }

    //modal appear
    registeringHandler = () =>{
        this.setState({registering: true})
    }

    //modal closed
    closeModalHandler = () =>{
        this.setState({registering: false});
        this.setState({error:null});
    }

    render() {

        const formElementsArray =[];
        for (let key in this.state.registrationForm){
            formElementsArray.push({
                id: key,
                config: this.state.registrationForm[key]
            }); 
        }
        return (
            <Auxiliary>
                       <Modal shown ={this.state.registering} modalClosed ={this.closeModalHandler}>
                           
                            <RegistrationValidator
                                passedErrorMessages = {this.state.errorMessages}
                                loadingStatus = {this.state.loading}
                                errorStatus = {this.state.error}
                                registeringStatus = {this.state.registering}
                        />
                      </Modal> 
                <div className ={classes.Container}>
                <div className = {classes.Register}>
                <h3>Welcome to Motivity</h3>
                <p>Sign up as a new member today!</p>
                <form onSubmit={this.registrationHandler}>
                    {formElementsArray.map(formElement =>(
                        <Input
                             key ={formElement.id}
                             elementType ={formElement.config.elementType}
                             elementConfig = {formElement.config.elementConfig}
                             value = {formElement.config.value}
                             label = {formElement.config.label}
                             valid ={formElement.config.valid}
                             needsValidation ={formElement.config.validation}
                             touched ={formElement.config.touched}
                             inputted = {(event)=>this.inputChangedHandler(event,formElement.id)}
                        />
                    ))}
                    <Button btnType='Continue' clicked ={this.registeringHandler}>REGISTER</Button>
                </form>             
                    <p className={classes.Information}>Don't worry! We won't share any of your information with third parties.</p>
                </div>
            </div>
        </Auxiliary>
        );
    }
};

export default Register;


    