import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyResults from './MyResults';
import {Redirect} from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

//Unit tests on MyResults Container

describe('MyResults Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '12',
            getItem:  () =>{
               return localStorage.id
            }
         };

         wrapper = shallow(<MyResults />);  
    
    });

    it('should redirect to error page if error state = true', ()=>{
        wrapper.setState({error: true })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render a spinner if loading state = true', ()=>{
        wrapper.setState({loading: true })
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should render <h5 style={{color: "green"}}>Novice</h5> if userLevelId: 1', ()=>{
        wrapper.setState({myAssessments: [{id: 1, userId: 1, userLevelId: 1}], error: false, loading: false })
        expect(wrapper.contains(<h5 style={{color: 'green'}}>Novice</h5>)).toEqual(true)
    })
    it('should render <h5 style={{color: "green"}}>Novice</h5> if userLevelId is anything but 2 or 3', ()=>{
        wrapper.setState({myAssessments: [{id: 1, userId: 1, userLevelId: 4}], error: false, loading: false })
        expect(wrapper.contains(<h5 style={{color: 'green'}}>Novice</h5>)).toEqual(true)
    })
    it('should render <h5 style={{color: "orange"}}>Intermediate</h5> if userLevelId: 2', ()=>{
        wrapper.setState({myAssessments: [{id: 1, userId: 1, userLevelId: 2}], error: false, loading: false })
        expect(wrapper.contains(<h5 style={{color: 'orange'}}>Intermediate</h5>)).toEqual(true)
    })
    it('should render <h5 style={{color: "red"}}>Advanced</h5> if userLevelId: 3', ()=>{
        wrapper.setState({myAssessments: [{id: 1, userId: 1, userLevelId: 3}], error: false, loading: false })
        expect(wrapper.contains(<h5 style={{color: 'red'}}>Advanced</h5>)).toEqual(true)
    })
    it('should render <h5>Date: 12-07-2019</h5 if startDate: "2019-07-12T19:42:29.000Z" ', ()=>{
        wrapper.setState({myAssessments: [{id: 1, startDate: "2019-07-12T19:42:29.000Z", userLevelId: 3}], error: false, loading: false })
        expect(wrapper.contains(<h5>Date: 12-07-2019</h5>)).toEqual(true)
    })
    it('should render <h5>Assessment 1</h5> as title if assessment rank = 1" ', ()=>{
        wrapper.setState({myAssessments: [{id: 1, rank: 1, startDate: "2019-07-12T19:42:29.000Z", userLevelId: 3}], error: false, loading: false })
        expect(wrapper.contains(<h5>Assessment 1</h5>)).toEqual(true)
    })
 
})