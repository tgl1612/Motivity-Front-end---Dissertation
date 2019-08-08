import React, {Component} from 'react';
import classes from './UpdateUser.css';
import Button from '../../Components/UI/Button/Button';
import Input from '../../Components/UI/Input/Input';
import axios from '../../axios-instance';
import Modal from '../../Components/UI/Modal/Modal';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import {Link, Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/actions';
import Spinner from '../../Components/UI/Spinner/Spinner';
import {checkValidation} from '../../Components/Validators/checkValidation';

//Update User page for users to update their information 

export class UpdateUser extends Component{
    //set the state of the password change form/spinner/modal
    state = {
         changePasswordForm:{
            pass:{
                elementType: 'input',
                elementConfig:{
                    type:'password',
                    placeholder: 'Choose a new password'
                },
                value: '' ,
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
                    placeholder: 'Re-enter your new password'
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
        },
        updating: false,
        loading: false,
        deleting: false,
        errorMessages: [],
        resStatus: 0,
        successMessage: '',
        componentMounted: false,
        isAuth: true,
        loadingError: false
    }


    //get user info 
    componentDidMount(){
        window.scrollTo(0, 0);
        axios.get( '/user/' + localStorage.getItem('id'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(response =>{
            this.setState({
                componentMounted: true,
                updateInfoForm: {
                    firstName:{
                        elementType: 'input',
                        elementConfig:{
                            type:'text',
                            placeholder: 'Enter your first name'
                        },
                        value: response.data.user.firstName,
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
                        value: response.data.user.lastName,
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
                        value: response.data.user.emailAddress,
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
                        value: response.data.user.user,
                        label: 'Username: ',
                        validation:{
                            required: true,
                            minLength: 6,
                            maxLength:16
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
                        value: response.data.user.genderId,
                        label: 'Gender: ',
                        valid: true,
                        validation: {}
                    }
                }
            })
        })
        .catch(err=>{
            this.setState({
                loadingError: true
            })
        })
    }
    
    //send put request to axios to update user info
    updateInfoHandler = (event) =>{
        event.preventDefault();
        this.setState({loading:true});
        const updateInfoFormData ={};
        for(let updateInfoFormElementIdentifier in this.state.updateInfoForm){
            updateInfoFormData[updateInfoFormElementIdentifier] = this.state.updateInfoForm[updateInfoFormElementIdentifier].value;

        }
        axios.put('auth/update/' + localStorage.getItem('id'), updateInfoFormData, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res=>{
            this.setState({loading:false});
            
            if(res.status === 201){
                this.setState({error:null});

                this.setState({resStatus:res.status, successMessage:res.data})
              

            }
        })
        .catch(error =>{
            this.setState({loading:false});
            this.setState({error: error, errorMessages: error.response.data.data});
                    
        })
    }

    //method to handle password change
    changePasswordHandler = (event) =>{
        event.preventDefault();
        this.setState({loading:true});
        const changePasswordFormData ={};
        for(let changePasswordFormElementIdentifier in this.state.changePasswordForm){
            changePasswordFormData[changePasswordFormElementIdentifier] = this.state.changePasswordForm[changePasswordFormElementIdentifier].value;

        }
        axios.put('auth/changepass/' + localStorage.getItem('id'), changePasswordFormData,{
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        })
        .then(res=>{
            this.setState({loading:false});
            
            if(res.status === 201){
                this.setState({error:null});
                this.setState({resStatus:res.status, successMessage:res.data})
            }
        })
        .catch(error =>{
            this.setState({loading:false});
            this.setState({error: error, errorMessages: error.response.data.data});
                    
        })
    }

   //update form info (twoway binding)
    inputChangedHandler = (event, inputIdentifier) =>{
        const updatedUpdateInfoForm = {
            ...this.state.updateInfoForm
        }
        const updatedUpdateInfoFormElement = {
            ...updatedUpdateInfoForm[inputIdentifier]
        };
        updatedUpdateInfoFormElement.value = event.target.value;
        updatedUpdateInfoFormElement.valid = checkValidation(updatedUpdateInfoFormElement.value, updatedUpdateInfoFormElement.validation)
        updatedUpdateInfoFormElement.touched = true;
        updatedUpdateInfoForm[inputIdentifier] = updatedUpdateInfoFormElement;
        this.setState({updateInfoForm: updatedUpdateInfoForm});
    }

    //function to change password (two way binding)
    passwordInputChangedHandler = (event, inputIdentifier)=>{
        const updatedChangePasswordForm = {
            ...this.state.changePasswordForm
        }
        const updatedChangePasswordFormElement = {
            ...updatedChangePasswordForm[inputIdentifier]
        };
        updatedChangePasswordFormElement.value = event.target.value;
        updatedChangePasswordFormElement.valid =checkValidation(updatedChangePasswordFormElement.value, updatedChangePasswordFormElement.validation)
        updatedChangePasswordFormElement.touched = true;
        updatedChangePasswordForm[inputIdentifier] = updatedChangePasswordFormElement;
        this.setState({changePasswordForm: updatedChangePasswordForm});
    }

    //method to delete user 
    deleteUserHandler = () =>{
        axios.delete('user/delete/' +  localStorage.getItem('id'), {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('token')
            }
        } )
        .then(response=>{
            this.props.onLogout();
            this.setState({isAuth: false})
        })
        .catch(err=>{
            this.setState({
                loadingError: true
            })
        });
    }

    //modal appear
    updatingHandler = () =>{
        this.setState({updating: true})
    }

     //delete modal appear
     deletingHandler = () =>{
        this.setState({deleting: true})
    }

    //delete modal disappear
    closeDeleteModalHander =()=>{
        this.setState({deleting: false})
    }

    //modal closed
    closeModalHandler = () =>{
        this.setState({updating: false});
        this.setState({error:null});
        this.setState({resStatus: 0,successMessage: ''})
    }

  //handle validation model text
    validationHandler = () =>{
        
        if(this.state.loading){
         return <Spinner />
        }

        

         if(this.state.resStatus === 201){
           const message = this.state.successMessage.message
            return <div className = {classes.SuccessBox}><h1>&#10004;</h1>
                        <div>{message}</div>
                       <Link to='/myaccount'><Button btnType ='Blue'>My Account</Button></Link> 
                    </div>;
        }else{
            const newErrorMessages = this.state.errorMessages.map(errorMessage =>{
                return <li key = {errorMessage.param}>{errorMessage.msg}</li>
            });
            return newErrorMessages;
        }
    }

    render() {

        const formElementsArray =[];
        for (let key in this.state.updateInfoForm){
            formElementsArray.push({
                id: key,
                config: this.state.updateInfoForm[key]
            }); 
        }

        const changePassElementsArray =[];
        for(let key in this.state.changePasswordForm){
            changePassElementsArray.push({
                id: key,
                config: this.state.changePasswordForm[key]
            });
        }

        if(this.state.loadingError){
            return <Redirect to='/error' />
        }

        if(!this.state.componentMounted){
            return <Spinner />
        }

        if(!this.state.isAuth){
            return <Redirect to='/' />
        }
     
        return (
            <Auxiliary>
                       <Modal shown ={this.state.updating} modalClosed ={this.closeModalHandler}>
                            {this.validationHandler()}
                        </Modal> 

                        <Modal shown ={this.state.deleting} modalClosed ={this.closeDeleteModalHander}>
                            <div className = {classes.DeleteModal}>
                            <h3>Are you sure you want to do this? </h3>
                            <div>
                            <Button btnType = 'Blue2' clicked = {this.closeDeleteModalHander}>No</Button>
                           <Button btnType = 'Delete2' clicked = {this.deleteUserHandler}>Yes</Button>
                           </div>
                           </div>

                        </Modal> 
               
                <div className ={classes.Container}>
                <div className = {classes.Register}>
                <h3>Edit Information</h3>
                <form onSubmit={this.updateInfoHandler}>                    
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
                    <Button btnType='Continue' clicked ={this.updatingHandler}>Update Info</Button>
                </form>
            </div>
            <div className = {classes.Register}>
                <h3>Change password</h3>
                <form onSubmit={this.changePasswordHandler}>
                    {changePassElementsArray.map(formElement =>(
                        <Input
                             key ={formElement.id}
                             elementType ={formElement.config.elementType}
                             elementConfig = {formElement.config.elementConfig}
                             value = {formElement.config.value}
                             label = {formElement.config.label}
                             valid ={formElement.config.valid}
                             needsValidation ={formElement.config.validation}
                             touched ={formElement.config.touched}
                             inputted = {(event)=>this.passwordInputChangedHandler(event,formElement.id)}
                        />
                    ))}
                   
                    <Button btnType='Continue' clicked ={this.updatingHandler}>Update Info</Button>

                </form>
              </div>
              {localStorage.getItem('id')!=='16' ? 
                <div className = {classes.UpdateBox}>
                <h3>Delete Account</h3>
                <p>Deleting your account is permanent. You will lose all of your routines and results! </p>
                <Button btnType ='Delete' clicked ={this.deletingHandler}>DELETE</Button>
               
              </div>
              : null 
              }
              
             </div>
        </Auxiliary>
        );
    }
};

const mapDispatchToProps = dispatch =>{
    return{
        onLogout: () =>dispatch(actions.logout())
    };
};

export default connect(null, mapDispatchToProps)(UpdateUser);