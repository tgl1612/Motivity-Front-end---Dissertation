import React, {Component} from 'react';
import classes from './Modal.css';
import Auxiliary from '../../../hoc/Auxiliary/Auxiliary';
import Backdrop from '../../UI/Backdrop/Backdrop';

//Modal component to be displayed in app when called.

class Modal extends Component{

    shouldComponentUpdate(nextProps, nextState){
            return nextProps.shown !== this.props.shown || nextProps.children !==this.props.children;
    }

    render(){

        return(
            <Auxiliary>
            <Backdrop show ={this.props.shown} clicked={this.props.modalClosed}/>
            <div 
                className = {classes.Modal}
                style ={{
                    transform: this.props.shown ? 'translateY(0)' : 'translateY(-100vh)',
                    opacity: this.props.shown ? '1' : '0'
                }}
            >
        
                {this.props.children}
            </div>
            </Auxiliary>
        );
    }
}

export default Modal;