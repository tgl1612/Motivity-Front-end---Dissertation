import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyAccount from './MyAccount';
import {Redirect} from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';
import ChatbotButton from '../../Components/UI/ChatbotButton/ChatbotButton';

configure({adapter: new Adapter()});

//Unit tests on MyAccount Container

describe('Index Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '1',
            getItem:  () =>{
               return localStorage.id
            }
         };

        wrapper = shallow(<MyAccount />);
    });

    it('should redirect to error page if routineStatus state = false', ()=>{
        wrapper.setState({error: true })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render a spinner if loading state = true', ()=>{
        wrapper.setState({loading: true })
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should render <p style={{color:"green"}}><strong >User Level: </strong>Novice</p> if !this.state.lastAssessment', ()=>{
        wrapper.setState({lastAssessment: null, error: false, loading: false })
        expect(wrapper.contains(<p style={{color:'green'}}><strong >User Level: </strong>Novice</p>)).toEqual(true)
    })
    it('should render <p style={{color:"green"}}><strong >User Level: </strong>Novice</p> if this.state.lastAssessment.userLevelId = 1', ()=>{
        wrapper.setState({lastAssessment: {userLevelId: 1}, error: false, loading: false })
        expect(wrapper.contains(<p style={{color:'green'}}><strong >User Level: </strong>Novice</p>)).toEqual(true)
    })
    it('should render <p style={{color:"orange"}}><strong >User Level: </strong>Intermediate</p> if this.state.lastAssessment.userLevelId = 2', ()=>{
        wrapper.setState({lastAssessment: {userLevelId: 2}, error: false, loading: false })
        expect(wrapper.contains(<p style={{color:'orange'}}><strong >User Level: </strong>Intermediate</p>)).toEqual(true)
    })
    it('should render <p style={{color:"red"}}><strong >User Level: </strong>Advanced</p> if this.state.lastAssessment.userLevelId = 3', ()=>{
        wrapper.setState({lastAssessment: {userLevelId: 3}, error: false, loading: false })
        expect(wrapper.contains(<p style={{color:'red'}}><strong >User Level: </strong>Advanced</p>)).toEqual(true)
    })
    it('should render username in title if user state is set.', ()=>{
        wrapper.setState({lastAssessment: {AssessmentId: 1, startDate: "2019-07-12T19:42:29.000Z", userLevelId: 3},
                          user:{id: 1, firstName: "Jonnyriiiiiiiiii", lastName: "Boy", emailAddress: "jon_boy_jonboy@gmail.com", user: "JonnyTime8888888", assessments:{AssessmentId: 1, startDate: "2019-07-12T19:42:29.000Z", userLevelId: 3}},
                           count: 2,  error: false, loading: false })
        expect(wrapper.contains(<h3>JonnyTime8888888</h3>)).toEqual(true)
    })
    it('should render the chatbot button',()=>{
        wrapper.setState({loading:false})
        expect(wrapper.contains(<ChatbotButton />)).toEqual(true)
    })
    it('should contain  <p><strong>Completed Assessments: </strong>16</p> if count state is set', ()=>{
        wrapper.setState({loading:false, 
            user:{id:'1', firstName:'testname', lastName:'testsurname', emailAddress: 'test@test.com', user:'testuser'},
            lastAssessment: {AssessmentId: 1, startDate: "2019-07-12T19:42:29.000Z", userLevelId: 3},
        count: '16' })
        expect(wrapper.contains( <p><strong>Completed Assessments: </strong>16</p>)).toEqual(true)
    }) 
    it('should return the value 20 when daysBetween method is called - test run on 21/07/2019 - expect different value when retesting', ()=>{
        wrapper.setState({loading:false, 
        user:{id:'1', firstName:'testname', lastName:'testsurname', emailAddress: 'test@test.com', user:'testuser', genderId: 3},
        lastAssessment: {AssessmentId: 61, startDate: "2019-07-12T19:42:29.000Z", userLevelId: 3},
    })
        const instance = wrapper.instance();
        instance.daysBetween()
        expect(Math.floor(instance.daysBetween())).toEqual(20)
    })
})
