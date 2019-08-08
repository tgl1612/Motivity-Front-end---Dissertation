import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserStats from './UserStats';
import {Redirect} from 'react-router-dom';
import Spinner from '../../../Components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

//Unit tests on UserStats Container

describe('UserStats Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '16',
            getItem:  () =>{
               return localStorage.id
            }
         };
         wrapper = shallow(<UserStats />);  
    
    });

    it('should redirect to error page if error state = true', ()=>{
        wrapper.setState({error: true })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render a spinner if loading state = true', ()=>{
        wrapper.setState({loading: true })
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })

    it('should render <h5 style={{color: "green"}}><strong style = {{color: "#033875"}}>Level: </strong>Novice</h5> if userLevelId = 1', ()=>{
        wrapper.setState({users:[{id: 3, firstName: "Test", lastName: "Testerson", user: "Thisisatest", userRole: {userType: "User"},gender: {genderType: "Male"}, assessments: [{userLevelId: 1}]}],
        error: false, loading: false })
        expect(wrapper.contains(<h5 style={{color: 'green'}}><strong style = {{color: '#033875'}}>Level: </strong>Novice</h5>)).toEqual(true)
    })
    it('should render <h5 style={{color: "green"}}><strong style = {{color: "#033875"}}>Level: </strong>Novice</h5> if no assessments returned', ()=>{
        wrapper.setState({users:[{id: 3, firstName: "Test", lastName: "Testerson", user: "Thisisatest", userRole: {userType: "User"},gender: {genderType: "Male"}, assessments: []}],
        error: false, loading: false })
        expect(wrapper.contains(<h5 style={{color: 'green'}}><strong style = {{color: '#033875'}}>Level: </strong>Novice</h5>)).toEqual(true)
    })
    it('should render <h5 style={{color: "green"}}><strong style = {{color: "#033875"}}>Level: </strong>Novice</h5> if userLevelId !== 1 - 3', ()=>{
        wrapper.setState({users:[{id: 3, firstName: "Test", lastName: "Testerson", user: "Thisisatest", userRole: {userType: "User"},gender: {genderType: "Male"}, assessments: [{userLevelId: 4}]}],
        error: false, loading: false })
        expect(wrapper.contains(<h5 style={{color: 'green'}}><strong style = {{color: '#033875'}}>Level: </strong>Novice</h5>)).toEqual(true)
    })
    it('should render <h5 style={{color: "orange"}}><strong style = {{color: "#033875"}}>Level: </strong>Intermediate</h5> if userLevelId = 2', ()=>{
        wrapper.setState({users:[{id: 3, firstName: "Test", lastName: "Testerson", user: "Thisisatest", userRole: {userType: "User"},gender: {genderType: "Male"}, assessments: [{userLevelId: 2}]}],
        error: false, loading: false })
        expect(wrapper.contains(<h5 style={{color: 'orange'}}><strong style = {{color: '#033875'}}>Level: </strong>Intermediate</h5>)).toEqual(true)
    })
    it('should render <h5 style={{color: "red"}}><strong style = {{color: "#033875"}}>Level: </strong>Advanced</h5> if userLevelId = 3', ()=>{
        wrapper.setState({users:[{id: 3, firstName: "Test", lastName: "Testerson", user: "Thisisatest", userRole: {userType: "User"},gender: {genderType: "Male"}, assessments: [{userLevelId: 3}]}],
        error: false, loading: false })
        expect(wrapper.contains(<h5 style={{color: 'red'}}><strong style = {{color: '#033875'}}>Level: </strong>Advanced</h5>)).toEqual(true)
    })
    it('should render <h4>Thisisatest</h4> if username is set', ()=>{
        wrapper.setState({users:[{id: 3, firstName: "Test", lastName: "Testerson", user: "Thisisatest", userRole: {userType: "User"},gender: {genderType: "Male"}, assessments: [{userLevelId: 1}]}],
        error: false, loading: false })
        expect(wrapper.contains(<h4>Thisisatest</h4>)).toEqual(true)
    })
    it('should render <h5><strong>Gender: </strong> {user.gender.genderType}</h5> if genderType is set', ()=>{
        wrapper.setState({users:[{id: 3, firstName: "Test", lastName: "Testerson", user: "Thisisatest", userRole: {userType: "User"},gender: {genderType: "Male"}, assessments: [{userLevelId: 1}]}],
        error: false, loading: false })
        expect(wrapper.contains(<h5><strong>Gender: </strong> Male</h5>)).toEqual(true)
    })
})