import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Chatbot from './Chatbot';
import {Redirect} from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

//Unit tests on Chatbot Container

describe('Index Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '1',
            getItem:  () =>{
               return localStorage.id
            }
         };

        wrapper = shallow(<Chatbot />);
    });

    it('should redirect to error page if routineStatus state = false', ()=>{
        wrapper.setState({error: true })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render a spinner if loading state = true', ()=>{
        wrapper.setState({loading: true })
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
})