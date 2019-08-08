import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import IndividualUser from './IndividualUser';
import {Redirect} from 'react-router-dom';
import Spinner from '../../../Components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

//Unit tests on IndividualUser Container

describe('IndividualUser Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '16',
            getItem:  () =>{
               return localStorage.id
            }
         };

         const match = { params: { id: '1'} }

         wrapper = shallow(<IndividualUser match={match} />);  
    
    });

    it('should redirect to error page if error state = true', ()=>{
        wrapper.setState({error: true })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render a spinner if loading state = true', ()=>{
        wrapper.setState({loading: true })
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should redirect to userstats page if deleted state = true', ()=>{
        wrapper.setState({deleted: true, loading:false })
        expect(wrapper.contains(<Redirect to='/userstats' />)).toEqual(true)
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
    it('should contain <h3>testuser</h3> if user state is set', ()=>{
        wrapper.setState({loading:false, 
            user:{id:'1', firstName:'testname', lastName:'testsurname', emailAddress: 'test@test.com', user:'testuser'},
            lastAssessment: {AssessmentId: 1, startDate: "2019-07-12T19:42:29.000Z", userLevelId: 3},
        count: '16' })
        expect(wrapper.contains(<h3>testuser</h3>)).toEqual(true)
    })
    it('should contain  <p><strong>Completed Assessments: </strong>16</p> if count state is set', ()=>{
        wrapper.setState({loading:false, 
            user:{id:'1', firstName:'testname', lastName:'testsurname', emailAddress: 'test@test.com', user:'testuser'},
            lastAssessment: {AssessmentId: 1, startDate: "2019-07-12T19:42:29.000Z", userLevelId: 3},
        count: '16' })
        expect(wrapper.contains(<p><strong>Completed Assessments: </strong>16</p>)).toEqual(true)
    })
    it('should contain <p><strong >Gender: </strong>Male</p> if genderId ===1', ()=>{
        wrapper.setState({
            loading: false, 
            user:{id:'1', firstName:'testname', lastName:'testsurname', emailAddress: 'test@test.com', user:'testuser', genderId: 1}
        })
            expect(wrapper.contains(<p><strong >Gender: </strong>Male</p>)).toEqual(true)
    })
    it('should contain <p><strong >Gender: </strong>Female</p> if genderId ===2', ()=>{
        wrapper.setState({
            loading: false, 
            user:{id:'1', firstName:'testname', lastName:'testsurname', emailAddress: 'test@test.com', user:'testuser', genderId: 2}
        })
            expect(wrapper.contains(<p><strong >Gender: </strong>Female</p>)).toEqual(true)
    })
    it('should contain <p><strong >Gender: </strong>Rather not say</p> if genderId ===3', ()=>{
        wrapper.setState({
            loading: false, 
            user:{id:'1', firstName:'testname', lastName:'testsurname', emailAddress: 'test@test.com', user:'testuser', genderId: 3}
        })
            expect(wrapper.contains(<p><strong >Gender: </strong>Rather not say</p>)).toEqual(true)
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
