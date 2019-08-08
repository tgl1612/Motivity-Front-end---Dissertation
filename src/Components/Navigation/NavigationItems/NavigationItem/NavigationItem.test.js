import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItem from './NavigationItem';
import { NavLink } from 'react-router-dom';
import classes from './NavigationItem.css'


configure({adapter: new Adapter()});

//unit tests of Backdrop component 

describe('NavigationItem Component Tests', () =>{

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<NavigationItem link='/testlink'>TestContent</NavigationItem>);
    })

    it("should contain TestContent if props.children is set", ()=>{
        expect(wrapper.contains('TestContent')).toEqual(true); 
    }); 
    it("should contain NavLink with to= '/testlink' prop", ()=>{
        expect(wrapper.contains(<NavLink 
            to= '/testlink'
            exact
            activeClassName={classes.active}
          >TestContent   
          </NavLink>)).toEqual(true); 
    });  
});