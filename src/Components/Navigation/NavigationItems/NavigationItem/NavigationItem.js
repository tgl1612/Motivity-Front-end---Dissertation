import React from 'react';
import classes from './NavigationItem.css';
import { NavLink } from 'react-router-dom';

//navigationItem component to be used in the NavigationItems component

const navigationItem = (props) => (
      <li className={classes.NavigationItem}>
          <NavLink 
            to= {props.link}
            exact
            activeClassName={classes.active}
          >
            {props.children}    
          </NavLink>
      </li>
);

export default navigationItem;