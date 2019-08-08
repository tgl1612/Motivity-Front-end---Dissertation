import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Login} from './Login';
import {Redirect} from 'react-router-dom';
import Modal from '../../Components/UI/Modal/Modal';
import Button from '../../Components/UI/Button/Button';


configure({adapter: new Adapter()});

//Unit tests on Login Container

describe('Index Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<Login />);
    });

    it('should redirect to logged in index page if isAuthenticated: true', ()=>{
        global.localStorage = {
            id: null,
            getItem:  () =>{
               return localStorage.id
            }
         };
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<Redirect to='/'/> )).toEqual(true)
    })
    it('should redirect to coachindex page if isAuthenticated: true and localstorage.id = 16', ()=>{
        global.localStorage = {
            id: '16',
            getItem:  () =>{
               return localStorage.id
            }
         };
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<Redirect to='/coachindex'/>)).toEqual(true)
    })
    it('should redirect to coachindex page if isAuthenticated: true and localstorage.id = 16', ()=>{
        global.localStorage = {
            id: '16',
            getItem:  () =>{
               return localStorage.id
            }
         };
        wrapper.setProps({isAuthenticated: true})
        expect(wrapper.contains(<Redirect to='/coachindex'/>)).toEqual(true)
    })
    it('should show error messages in modal if error messages exist', ()=>{
        global.localStorage = {
            id: null,
            getItem:  () =>{
               return localStorage.id
            }
         };
        wrapper.setState({modalShown: true})
        wrapper.setProps({isAuthenticated: false, error: 'Test Error'})
        expect(wrapper.find(Modal).contains('Test Error')).toEqual(true);
    })
})
