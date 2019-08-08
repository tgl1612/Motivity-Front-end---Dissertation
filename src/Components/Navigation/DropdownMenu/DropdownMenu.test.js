import React from 'react';
import {configure, shallow} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import DropdownMenu from './DropdownMenu';
import Backdrop from '../../UI/Backdrop/Backdrop';
import classes from './DropdownMenu.css';
import NavigationItems from '../../Navigation/NavigationItems/NavigationItems'
configure({adapter: new Adapter()});

// //unit tests of NavigationItems component when non-user, user and admin

describe('DropdownMenu Tests', () =>{

    let wrapper;

    beforeEach(()=>{
        wrapper = shallow(<DropdownMenu />);
        
    })

    it('should contain a Backdrop with props = show: true and clicked : false when opened: true and closed: false', ()=>{

        wrapper.setProps({opened: true, closed: false})
        expect(wrapper.find(Backdrop).props()).toEqual({"clicked": false, "show": true})
    })

    it('should contain Backdrop with props = show: false and clicked: true when opened: false and closed: true ', ()=>{

        wrapper.setProps({opened: false, closed: true})
        expect(wrapper.find(Backdrop).props()).toEqual({"clicked": true, "show": false})
    })
})  