import React from 'react';
import Calendar from './Calendar';
import { shallow } from 'enzyme';

const todos = [
    {
        id: 1,
        title: "TEST_TITLE",
        content: "TEST_CONTENT",
        done: false,
        year: 2021,
        month: 9,
        date: 30,
    }
];

describe("<Calendar />", () => {
    it('should render without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find(".sunday");
        expect(wrapper.length).toBe(1);
    });

    it('should render calendar with no errors', () => {
        const component = shallow(<Calendar year={2021} month={10} todos={todos}/>);
        const wrapper = component.find(".cell");
        expect(wrapper.length).toBe(30);
    })
});