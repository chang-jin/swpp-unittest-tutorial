import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react'

describe("<Calender >", () => {
    /*console.log(shallow(<Calendar year={2021} date={10}/>).debug());#*/
    it ("should render without error", () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find("Table");
        expect(wrapper.length).toBe(1);
    });

    it ("should make dates properly", () => {
        const component = mount(<Calendar year={2021} date={10}/>);
        // console.log(component.debug())
        const wrapper = component.find(".cell .false");
        expect(wrapper.length).toBe(100);
        console.log(wrapper.debug());
    })
})
