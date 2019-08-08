import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyRoutines from './MyRoutines';
import {Redirect} from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';
import ChatbotButton from '../../Components/UI/ChatbotButton/ChatbotButton';

configure({adapter: new Adapter()});

//Unit tests on MyRoutines Container

describe('Index Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '1',
            getItem:  () =>{
               return localStorage.id
            }
         };
        wrapper = shallow(<MyRoutines />);
    });
    it('should redirect to error page if error state = true', ()=>{
        global.localStorage = {
            id: null,
            getItem:  () =>{
               return localStorage.id
            }
         };
        wrapper.setState({error: true})
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render spinner if loading state = true', ()=>{
        global.localStorage = {
            id: null,
            getItem:  () =>{
               return localStorage.id
            }
         };
        wrapper.setState({loading: true})
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should render the chatbot button',()=>{
        wrapper.setState({loading:false})
        expect(wrapper.contains(<ChatbotButton />)).toEqual(true)
    })
    it('should not render the chatbot button',()=>{
        wrapper.setState({loading:true})
        expect(wrapper.contains(<ChatbotButton />)).toEqual(false)
    })
    it('should render CARs routines section if hasRoutines state = true',()=>{
        wrapper.setState({hasRoutines:true, loading: false})
        expect(wrapper.contains(<h4><strong>Daily Routines</strong></h4>)).toEqual(true)
    })
    it('should not render CARs routines section if hasRoutines state = false',()=>{
        wrapper.setState({hasRoutines:false, loading: false})
        expect(wrapper.contains(<h4><strong>Daily Routines</strong></h4>)).toEqual(false)
    })
    it('should render Personalised routines section if hasRoutines state = true',()=>{
        wrapper.setState({hasRoutines:true, loading: false})
        expect(wrapper.contains(<h4><strong>Personalised Routines</strong></h4>)).toEqual(true)
    })
    it('should not render Personalised routines section if hasRoutines state = false',()=>{
        wrapper.setState({hasRoutines:false, loading: false})
        expect(wrapper.contains(<h4><strong>Personalised Routines</strong></h4>)).toEqual(false)
    })
    
})
