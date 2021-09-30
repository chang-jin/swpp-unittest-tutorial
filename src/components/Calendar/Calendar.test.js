import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

const stubTodos = [
    {
        id: 0,
        title: "todo_title_1",
        content: "todo_content_1",
        year: 2021,
        month: 9,
        date: 30,
        done: true
    },
    {
        id: 1,
        title: "todo_title_2",
        content: "todo_content_2",
        year: 2021,
        month: 9,
        date: 4,
        done: false
    }
];


describe('<Calendar />', () => {
    it('should render calendar', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('Table');
        expect(wrapper.length).toBe(1);
    });

    it('should render calendar header successfully', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find("Table");
        expect(wrapper.length).toBe(1);
        expect(wrapper.find('TableHeaderCell').length).toBe(7);
    });

    it('should render when date is given', () => {
        const year = 2021;
        const month = 10;
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar year={year} month={month} todos={stubTodos} clickDone={mockClickDone} />);
        const wrapper = component.find("TableBody");
        expect(wrapper.length).toBe(1);
    });

    it('should handle clicks', () => {
        const mockClickDone = jest.fn();
        const year = 2021;
        const month = 10;
        const component = shallow(<Calendar year={year} month={month} todos={stubTodos} clickDone={mockClickDone} />);
        const wrapper = component.find('div.todoTitle')
        expect(wrapper.length).toBe(2);
        wrapper.first().simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });

});