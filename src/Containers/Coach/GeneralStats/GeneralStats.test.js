import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import GeneralStats from './GeneralStats';
import {Redirect} from 'react-router-dom';
import Spinner from '../../../Components/UI/Spinner/Spinner';

configure({adapter: new Adapter()});

//Unit tests on GeneralStats Container

describe('GeneralStats Container Tests', ()=>{
    let wrapper;

    beforeEach(()=>{
        global.localStorage = {
            id: '16',
            getItem:  () =>{
               return localStorage.id
            }
         };
         wrapper = shallow(<GeneralStats />);    });

    it('should redirect to error page if error state = true', ()=>{
        wrapper.setState({error: true })
        expect(wrapper.contains(<Redirect to='/error' />)).toEqual(true)
    })
    it('should render a spinner if loading state = true', ()=>{
        wrapper.setState({loading: true })
        expect(wrapper.contains(<Spinner />)).toEqual(true)
    })
    it('should return user count 100 if userCount state is set to 100', ()=>{
        wrapper.setState({loading: false, userCount: '100', genderRatio:[ {genderCount: '1'}, {genderCount: '1'},{genderCount: '1'}] })
        expect(wrapper.contains(<div><h5>Number of users: </h5><strong>100</strong></div>)).toEqual(true)
    })
    it('should return assessmentCount of 100 if assessmentCount is set to 100', ()=>{
        wrapper.setState({loading: false, assessmentCount: '100', genderRatio:[ {genderCount: '1'}, {genderCount: '1'},{genderCount: '1'}]  })
        expect(wrapper.contains(<div><h5>Number of assessments taken: </h5><strong>100</strong></div>)).toEqual(true)
    })
    it('should return Male gender count of 1', ()=>{
        wrapper.setState({loading: false, genderRatio:[ {genderCount: '1'}, {genderCount: '1'},{genderCount: '1'}]  })
        expect(wrapper.contains(<div>Male: <strong>1</strong> </div>)).toEqual(true)
    })
    it('should return topuser user name and assessment count', ()=>{
        wrapper.setState({loading: false, genderRatio:[ {genderCount: '1'},{genderCount: '1'},{genderCount: '1'}], topUsers: [{ userId: 1, user: {user: 'Test'}, assessmentCount: '1'}]  })
        expect(wrapper.contains(<h5>Test</h5>)).toEqual(true)
        expect(wrapper.contains(<h5>1</h5>)).toEqual(true)

    })
    
})