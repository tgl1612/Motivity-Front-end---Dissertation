import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import UserResult from './UserResult';
import {Redirect} from 'react-router-dom';
import Spinner from '../../../../Components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

//Unit tests on UserResult Container

describe('UserResult Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '16',
            getItem:  () =>{
               return localStorage.id
            }
         };

         const match = { params: { id: '1', title: 'test'} }

         wrapper = shallow(<UserResult match={match} />);  
    
    });

    it('should redirect to error page if error state = true', ()=>{
        wrapper.setState({error: true })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should redirect to error page if resultStatus state = false', ()=>{
        wrapper.setState({resultStatus: false, loading: false})
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render a spinner if loading state = true', ()=>{
        wrapper.setState({loading: true })
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should render <strong style={{color: "green"}}>Novice</strong> if overallScore: 1', ()=>{
        wrapper.setState({overallScore: 1, error: false, loading: false })
        expect(wrapper.contains(<strong style={{color: 'green'}}>Novice</strong>)).toEqual(true)
    })
    it('should render <strong style={{color: "green"}}>Novice</strong> if overallScore does not equal 2 or 3', ()=>{
        wrapper.setState({overallScore: 4, error: false, loading: false })
        expect(wrapper.contains(<strong style={{color: 'green'}}>Novice</strong>)).toEqual(true)
    })
    it('should render <strong style={{color: "orange"}}>Intermediate</strong> if overallScore: 2', ()=>{
        wrapper.setState({overallScore: 2, error: false, loading: false })
        expect(wrapper.contains(<strong style={{color: 'orange'}}>Intermediate</strong>)).toEqual(true)
    })
    it('should render <strong style={{color: "red"}}>Advanced</strong> if overallScore: 3', ()=>{
        wrapper.setState({overallScore: 3, error: false, loading: false })
        expect(wrapper.contains(<strong style={{color: 'red'}}>Advanced</strong>)).toEqual(true)
    })
    it('should render <h3>test</h3> if title state is set.', ()=>{
        wrapper.setState({error: false, loading: false})
        expect(wrapper.contains(<h3>test</h3>)).toEqual(true)
    })
    it('should render <h5 style = {{color: "green"}}><strong style = {{color: "#033875"}} >Hip: </strong> Novice</h5> if hipScore: Novice', ()=>{
        wrapper.setState({hipScore: 'Novice', error: false, loading: false })
        expect(wrapper.contains(<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Hip: </strong> Novice</h5>)).toEqual(true)
    })
    it('should render <h5 style = {{color: "green"}}><strong style = {{color: "#033875"}} >Hip: </strong> Novice</h5> if hipScore doesnt equal accepted value', ()=>{
        wrapper.setState({hipScore: 'TESTVALUE', error: false, loading: false })
        expect(wrapper.contains(<h5 style = {{color: 'green'}}><strong style = {{color: '#033875'}} >Hip: </strong>Novice</h5>)).toEqual(true)
    })
    it('should render <h5 style = {{color: "orange"}}><strong style = {{color: "#033875"}} >Hip: </strong> Intermediate</h5> if hipScore: Intermediate', ()=>{
        wrapper.setState({hipScore: 'Intermediate', error: false, loading: false })
        expect(wrapper.contains(<h5 style = {{color: 'Orange'}}><strong style = {{color: '#033875'}} >Hip: </strong> Intermediate</h5>)).toEqual(true)
    })
    it('should render <h5 style = {{color: "red"}}><strong style = {{color: "#033875"}} >Hip: </strong> Advanced</h5> if hipScore: Advanced', ()=>{
        wrapper.setState({hipScore: 'Advanced', error: false, loading: false })
        expect(wrapper.contains(<h5 style = {{color: 'Red'}}><strong style = {{color: '#033875'}} >Hip: </strong> Advanced</h5>)).toEqual(true)
    })
})