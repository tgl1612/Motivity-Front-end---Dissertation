import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import {UpdateUser} from './UpdateUser';
import {Redirect} from 'react-router-dom';
import Spinner from '../../Components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

//Unit tests on UpdateUser Container

describe('UpdateUser Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '1',
            getItem:  () =>{
               return localStorage.id
            }
         };
         wrapper = shallow(<UpdateUser />);  
    });

    it('should redirect to error page if loadingError state = tru', ()=>{
        wrapper.setState({loadingError: true})
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render a spinner if loading state = true', ()=>{
        wrapper.setState({loading: true })
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should render a spinner if componentMounted state = false', ()=>{
        wrapper.setState({componentMounted: false })
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should redirect to index page if isAuth state = false', ()=>{
        wrapper.setState({isAuth: false, componentMounted: true, loading: false })
        expect(wrapper.contains(<Redirect to='/' />)).toEqual(true)
    })
    it('should contain a success message if successMessage state is set and resStatus===201', ()=>{
        wrapper.setState({isAuth: true, componentMounted: true, loading: false, updating: true, resStatus: 201, successMessage: {message: 'Test Success Message'} })
        expect(wrapper.contains(<div>Test Success Message</div>)).toEqual(true)
    })
    it('should contain an error message if errorMessages state is set and resStatus!==201', ()=>{
        wrapper.setState({isAuth: true, componentMounted: true, loading: false, updating: true, resStatus: 500, errorMessages: [{param: 1, msg: 'Test Error Message'}] })
        expect(wrapper.contains(<li>Test Error Message</li>)).toEqual(true)
    })

    it('should contain a delete user box if localstorage.id !==16', ()=>{
        wrapper.setState({isAuth: true, componentMounted: true, loading: false})
        expect(wrapper.contains(<h3>Delete Account</h3>)).toEqual(true)
    })
    it('should not contain a delete user box if localstorage.id ===16', ()=>{
        global.localStorage = {
            id: '16',
            getItem:  () =>{
               return localStorage.id
            }
         };
        wrapper.setState({isAuth: true, componentMounted: true, loading: false})
        expect(wrapper.contains(<h3>Delete Account</h3>)).toEqual(false)
    })

})