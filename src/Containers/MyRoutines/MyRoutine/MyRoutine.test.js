import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MyRoutine from './MyRoutine';
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
         const match = { params: { id: '1',title: 'Test'} }

        wrapper = shallow(<MyRoutine match={match} />);
    });

    it('should redirect to error page if routineStatus state = false', ()=>{
        
        wrapper.setState({routineStatus: false })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render a spinner if loading state = true', ()=>{
        wrapper.setState({loading: true, routineStatus: true, routine: [{description: "test", name: "test", videoPath: "test"}] })
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should contain the description and name if routineStatus: true and loading: false', ()=>{
        wrapper.setState({loading: false, routineStatus: true, routine: [{description: "testdescription", name: "testname", videoPath: "test"}] })
        expect(wrapper.contains('testdescription')).toEqual(true)
        expect(wrapper.contains('testname')).toEqual(true)

    })
  
    
})
