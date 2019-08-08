import React, {Component} from 'react';
import classes from './NavigationBar.css';
import NavigationItems from '../NavigationItems/NavigationItems';
import Logo from '../../Logo/motivitylogo2.PNG'
import classesLogo from '../../Logo/Logo.css';
import DropdownMenuToggle from '../DropdownMenu/DropdownMenuToggle/DropdownMenuToggle';
import {Link} from 'react-router-dom';



class NavigationBar extends Component {

    state = {
        imageStatus: 'loading',
    }

    ImageLoadedhandler() {
        this.setState({ imageStatus: "loaded" });
      }
    
      ImageErrorhandler() {
        this.setState({ imageStatus: "failed to load" });
      }

      loadPageHander(){
          let containerClass = classes.NavigationBar;

          if(this.state.imageStatus !=='loaded'){
            containerClass = classes.Empty
          }
          return containerClass;
      }

render(){


    return(
    
        <header className ={this.loadPageHander()}>
        
        <Link to='/' style={{ textDecoration: 'none', color: 'white' }} onClick ={this.props.closeDropdownMenu}>
        <div className = {classesLogo.LogoText} >
        <div >
         <img 
            src={Logo} 
            className={classesLogo.Logo} 
            alt='logo' 
            onLoad={this.ImageLoadedhandler.bind(this)}
            onError={this.ImageErrorhandler.bind(this)}
         />
             
        </div>

        <div>
        <p>Motivity</p>
        </div>

        </div>
        </Link>
       
        
        <nav className = {classes.DesktopOnly}>
            <NavigationItems isAuthenticated = {this.props.isAuth} /> 
        </nav>

        <DropdownMenuToggle clicked={this.props.dropdownMenuToggleClicked} />
        
    </header>
    );
}

}

export default NavigationBar;