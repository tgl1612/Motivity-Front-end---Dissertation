import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Routines from './Routines';

configure({adapter: new Adapter()});

//unit tests of Routines component 

describe('Routines Component Tests', () =>{

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<Routines />);
    })

    it('should contain <h5><strong>test title</strong></h5>', ()=>{
        wrapper.setProps({id: 1, title: 'test title', level: 1})
        expect(wrapper.contains(<h5><strong>test title</strong></h5>)).toEqual(true);
    });
    it('should contain <h5 style={{color: "green"}}><strong>Level: </strong>Novice</h5> if level: 1', ()=>{
        wrapper.setProps({id: 1, title: 'test title', level: 1})
        expect(wrapper.contains(<h5 style={{color: 'green'}}><strong>Level: </strong>Novice</h5>)).toEqual(true);
    });
    it('should contain <h5 style={{color: "orange"}}><strong>Level: </strong>Intermediate</h5> if level: 2', ()=>{
        wrapper.setProps({id: 1, title: 'test title', level: 2})
        expect(wrapper.contains(<h5 style={{color: 'orange'}}><strong>Level: </strong>Intermediate</h5>)).toEqual(true);
    }); 
   
});