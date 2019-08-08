import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Backdrop from './Backdrop';


configure({adapter: new Adapter()});

//unit tests of Backdrop component 

describe('Backdrop Component Tests', () =>{

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<Backdrop />);
    })

    it('should render a div if the backdrop props.show is true', ()=>{
        wrapper.setProps({show: true})
        expect(wrapper.find('div')).toHaveLength(1);
    });
    it('should not render a div if the backdrop props.show is false', ()=>{
        wrapper.setProps({show: false})
        expect(wrapper.find('div').exists()).toEqual(false);
    });
    it('should not render a div when props.clicked is true',()=>{
        wrapper.setProps({clicked: true})
        expect(wrapper.find('div').exists()).toEqual(false);
    })
   
});