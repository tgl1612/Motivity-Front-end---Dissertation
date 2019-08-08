import React, {Component} from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary';
import classes from './Layout.css';
import NavigationBar from '../Navigation/NavigationBar/NavigationBar';
import DropdownMenu from '../Navigation/DropdownMenu/DropdownMenu';
import {connect} from 'react-redux';

//Layout component for general app layout

class Layout extends Component{

    state ={
        dropdownMenuShown: false,
    }

    //method to close the dropdown menu
   dropDownMenuClosedToggle = () =>{
        this.setState({dropdownMenuShown: false})
   }     

   //method to open dropdown menu
   dropDownMenuToggleHandler = () =>{
       this.setState( (prevState) =>{
           return{dropdownMenuShown: !prevState.dropdownMenuShown}
       });
   }

   render(){
       return(
        <Auxiliary>
            <NavigationBar 
                isAuth = {this.props.isAuthenticated}
                dropdownMenuToggleClicked={this.dropDownMenuToggleHandler} 
                closeDropdownMenu = {this.dropDownMenuClosedToggle}/>
            <DropdownMenu 
                isAuth = {this.props.isAuthenticated}
                opened={this.state.dropdownMenuShown}
                closed = {this.dropDownMenuClosedToggle}
            />
            <main className = {classes.Content}>
                {this.props.children}
            </main>
        </Auxiliary>

       ); 
   } 
};

    
const mapStateToProps = state =>{
    return{
        isAuthenticated: state.token !== null
    };
};

export default connect(mapStateToProps)(Layout);