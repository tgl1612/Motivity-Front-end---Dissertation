import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Button from './Button';


configure({adapter: new Adapter()});

//unit tests of Backdrop component 

describe('Button Component Tests', () =>{

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<Button>Test Button</Button>);
    })

    it('should contain Test Button if props.children = Test Button', ()=>{
        expect(wrapper.contains('Test Button')).toEqual(true);
    });    
});