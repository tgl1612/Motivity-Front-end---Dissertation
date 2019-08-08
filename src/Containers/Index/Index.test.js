import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {Index} from './Index';
import {Redirect} from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';
import Chatbot from '../../Components/UI/ChatbotButton/ChatbotButton';
import Footer from '../../Components/Navigation/Footer/Footer';
import Button from '../../Components/UI/Button/Button';

configure({adapter: new Adapter()});

//Unit tests on Index Container

describe('Index Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '12',
            getItem:  () =>{
               return localStorage.id
            }
         };
        wrapper = shallow(<Index />);
    });

    it('should render a non-personalised welcome message when auth = false', ()=>{
        
        wrapper.setProps({isAuthenticated: false})
        expect(wrapper.contains( <h2>Welcome to Motivity!</h2>)).toEqual(true)
        expect(wrapper.contains(<Button btnType = 'Blue'>Join Us</Button>)).toEqual(true)
    })
    it('should render a personalised welcome message when auth = true', ()=>{
        wrapper.setProps({isAuthenticated: true})
        wrapper.setState({ userFirstName: 'testname', userLoaded: true, imageStatus: 'loaded' });
        expect(wrapper.contains(<h2>Welcome testname</h2>)).toEqual(true)
        expect(wrapper.contains(<Button btnType = 'Blue'>View Routines</Button>)).toEqual(true)
    })
    it('should render an redirect when error = true', ()=>{
        wrapper.setState({error: true})
        expect(wrapper.contains(<Redirect to ='/error' />)).toEqual(true)
    })
    it('should render a spinner if userLoaded = false', ()=>{
        wrapper.setProps({isAuthenticated: true})
        wrapper.setState({ userFirstName: 'testname', userLoaded: false, imageStatus: 'loaded' });
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should render a Chatbot button if isAuthenticated = true', ()=>{
        wrapper.setProps({isAuthenticated: true})
        wrapper.setState({ userFirstName: 'testname', userLoaded: true, imageStatus: 'loaded' });
        expect(wrapper.contains(<Chatbot />)).toEqual(true)
    })
    it('should not render a Chatbot button if isAuthenticated = false', ()=>{
        wrapper.setProps({isAuthenticated: false})
        wrapper.setState({ userFirstName: 'testname', userLoaded: true, imageStatus: 'loaded' });
        expect(wrapper.contains(<Chatbot />)).toEqual(false)
    })
    it('should render a Footer button if imageStatus = loaded', ()=>{
        wrapper.setProps({isAuthenticated: true})
        wrapper.setState({ userFirstName: 'testname', userLoaded: true, imageStatus: 'loaded' });
        expect(wrapper.contains(<Footer />)).toEqual(true)
    })
    it('should not render a Footer button if imageStatus = loading', ()=>{
        wrapper.setProps({isAuthenticated: true})
        wrapper.setState({ userFirstName: 'testname', userLoaded: true, imageStatus: 'loading' });
        expect(wrapper.contains(<Footer />)).toEqual(false)
    })
})
