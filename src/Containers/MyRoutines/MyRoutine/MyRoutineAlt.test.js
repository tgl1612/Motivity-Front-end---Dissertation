import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyRoutineAlt from './MyRoutineAlt';
import {Redirect} from 'react-router-dom';
import Spinner from '../../../Components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

//Unit tests on MyRoutine Container

describe('Index Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '1',
            getItem:  () =>{
               return localStorage.id
            }
         };
         const match = { params: { id: '1'} }
        wrapper = shallow(<MyRoutineAlt match={match} />);
    });

    it('should redirect to error page if error state = true', ()=>{
        
        wrapper.setState({error: true })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should redirect to error page if isAuth state = false', ()=>{
        
        wrapper.setState({isAuth: false })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render a spinner if loaded state = false', ()=>{
        wrapper.setState({loaded: false, loading: false})
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should render a spinner if loading state = true', ()=>{
        wrapper.setState({loaded: true, loading: true})
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should contain the description and name of exercise if isAuth: true && error: false && loading: false && loaded: true', ()=>{
        wrapper.setState({isAuth: true, loading: false, loaded: true, error: false, routine: {description: "testdescription", name: "testname", videoPath: "test", difficultyId: 1}, })
        expect(wrapper.contains('testdescription')).toEqual(true)
        expect(wrapper.contains('testname')).toEqual(true)
    })
  
    
})


