import React from 'react';
import { mount, shallow } from 'enzyme';
import Calendar from './Calendar';

const stubtodos = [
    {
        id: 1,
        title: "TEST_TITLE",
        content: "TEST_CONTENT",
        year: 2021,
        month: 7,
        date: 30,
        done: false,
    }
];
describe('<Calendar />',()=>{
    it('should render without errors', () => {
        const component = shallow(<Calendar/>)
        const wrapper = component.find("Table")
        expect(wrapper.length).toBe(1);
    });

    it('should render dates with no errors', ()=> {
        const component = shallow(<Calendar year={2021} month={12} todos={stubtodos}/>);
        let wrapper = component.find('.date');
        expect(wrapper.length).toBe(31);
    })
})