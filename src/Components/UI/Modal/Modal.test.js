import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Modal from '../../UI/Modal/Modal';
import Backdrop from '../../UI/Backdrop/Backdrop';

configure({adapter: new Adapter()});

// //unit tests of Modal component 

describe('DropdownMenu Tests', () =>{

    let wrapper;
   
    beforeEach(()=>{
        wrapper = shallow(<Modal>Hello this is a test</Modal> );
        
    })

    it('should contain a Backdrop with props = show: true and clicked : false when show: true and modalClosed: false', ()=>{

        wrapper.setProps({shown: true, modalClosed: false})
        expect(wrapper.find(Backdrop).props()).toEqual({"clicked": false, "show": true})
    })

    it('should contain Backdrop with props = show: false and clicked: true when show: false and modalClosed: true ', ()=>{

        wrapper.setProps({shown: false, modalClosed: true})
        expect(wrapper.find(Backdrop).props()).toEqual({"clicked": true, "show": false})
    })
    it('should display a message passed on as props.children when shown: true', ()=>{
        wrapper.setProps({shown: true, modalClosed: false})
        expect(wrapper.contains("Hello this is a test")).toEqual(true)
    })
})
