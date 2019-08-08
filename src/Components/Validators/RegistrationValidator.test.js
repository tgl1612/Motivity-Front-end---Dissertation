import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import RegistrationValidator from './RegistrationValidator';
import Spinner from '../UI/Spinner/Spinner';


configure({adapter: new Adapter()});

//unit tests of Backdrop component 

describe('RegistrationValidator Component Tests', () =>{

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<RegistrationValidator />);
    })

    it('should contain <h4>You have been registered!</h4> if props.errorStatus: false && props.registeringStatus: true && props.loadingStatus: false', ()=>{

        wrapper.setProps({errorStatus: false, registeringStatus: true, loadingStatus: false,})
        expect(wrapper.contains(<h4>You have been registered!</h4>)).toEqual(true);
    });
    it('should contain <h4>Validation Error!</h4> if props.errorStatus: true && props.registeringStatus: true && props.loadingStatus: false', ()=>{

        wrapper.setProps({errorStatus: true, registeringStatus: true, loadingStatus: false, passedErrorMessages:[{param: "firstName", msg: "First name must be between 3 - 16 characters"}]})
        expect(wrapper.contains(<h4>Validation Error!</h4>)).toEqual(true);
    });
    it('should contain <li>First name must be between 3 - 16 characters</li> if props.errorStatus: true && props.registeringStatus: true && props.loadingStatus: false', ()=>{

        wrapper.setProps({errorStatus: true, registeringStatus: true, loadingStatus: false, passedErrorMessages:[{param: "firstName", msg: "First name must be between 3 - 16 characters"}]})
        expect(wrapper.contains( <li>First name must be between 3 - 16 characters</li>)).toEqual(true);
    });
    it('should contain <Spinner /> if registeringStatus: true && props.loadingStatus: true', ()=>{

        wrapper.setProps({ registeringStatus: true, loadingStatus: true})
        expect(wrapper.contains(<Spinner />)).toEqual(true);
    });
   
});