import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import NavigationItems from './NavigationItems';
import NavigationItem from './NavigationItem/NavigationItem';

configure({adapter: new Adapter()});

//unit tests of NavigationItems component when non-user, user and admin

describe('Navigation Items Tests', () =>{

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<NavigationItems />);
    })

    it('should render two navigation items if not authenticated', ()=>{
        expect(wrapper.find(NavigationItem)).toHaveLength(2);
    });
    it('should contain a Register navigation item if unauthenticated user', ()=>{
        expect(wrapper.contains(<NavigationItem link ='/register'>Join Us</NavigationItem>)).toEqual(true);
    });
    it('should render three navigation items if authenticated normal user', ()=>{
         global.localStorage = {
            id: '12',
            getItem:  () =>{
               return localStorage.id
            }
         };
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(3);
    });
    it('should contain a My Account navigation item if authenticated normal user', ()=>{
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link ='/myaccount'>My Account</NavigationItem>)).toEqual(true);
    });
    it('should render four navigation items if authenticated admin user', ()=>{
        global.localStorage = {
            id: '16',
            getItem:  () =>{
               return localStorage.id
            }
         };        
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.find(NavigationItem)).toHaveLength(4);
    });  
    it('should contain a general stats navigation item if authenticated admin user', ()=>{
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<NavigationItem link ='/generalstats'>General Stats</NavigationItem>)).toEqual(true);
    });
});