import React, {Component} from 'react';
import Modal from '../../Components/UI/Modal/Modal';
import Auxiliary from '../Auxiliary/Auxiliary';
const errorHandler = (WrappedComponent, axios) =>{
    return class extends Component{

        //set the initial state
        state ={
            error: null,
            errorMessages: []
        }
        //define new state
        componentDidMount(){

            axios.interceptors.request.use(req=>{
                this.setState({error:null});
                return req;
            });

            axios.interceptors.response.use(res=>res, error=>{
            this.setState({error:error});
            this.setState({error: error, errorMessages: error.response.data.data});

            });
        }
     
       //close error handler
        errorRecognisedHandler =() =>{
            this.setState({error:null});
        };

        render(){
            //get individual messages
            const newErrorMessages = this.state.errorMessages.map(errorMessage =>{
                return <li key = {errorMessage.param}>{errorMessage.msg}</li>
             });

            return(
                <Auxiliary>
                    <Modal
                        shown ={this.state.error}
                        modalClosed ={this.errorRecognisedHandler}
                    >
                        {this.state.error ? 
                        <div>
                        <h4>Validation error</h4>
                        <ul>{newErrorMessages}</ul>
                        <h5>Please try again</h5></div>
                        : null}
                    </Modal>
                <WrappedComponent {...this.props} />
                </Auxiliary>
            );
        }
    }
    
   
        
    
}

export default errorHandler;
