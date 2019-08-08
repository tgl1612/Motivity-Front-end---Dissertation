import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DeleteRoutine from './DeleteRoutine';
import {Redirect} from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

//Unit tests on DeleteRoutine Container

describe('DeleteRoutine Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '1',
            getItem:  () =>{
               return localStorage.id
            }
         };

         const match = { params: { id: '1', title: 'test'} }

         wrapper = shallow(<DeleteRoutine match={match} />);    });

    it('should redirect to error page if error state = true', ()=>{
        wrapper.setState({error: true })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should redirect to error page if authStatus state = false', ()=>{
        wrapper.setState({authStatus: false })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render a spinner if loaded state = false', ()=>{
        wrapper.setState({loaded: false })
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should redirect to MyRoutines if deleted state = true', ()=>{
        wrapper.setState({deleted: true })
        expect(wrapper.contains(<Redirect to='/myroutines' />)).toEqual(true)
    })

})