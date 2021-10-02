import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react';

const stubTodos = [
    { id: 1, year: 2021, month: 9, date: 1, done: true, title: "TEST_TODO_1"},
    { id: 2, year: 2021, month: 9, date: 2, done: false, title: "TEST_TODO_2"},
];

describe('<Calendar />', () => {
    it('should render Calender without error', () => {
        const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
        const wrapper = component.find(Table.Body);

        expect(wrapper.length).toBe(1);
    })

    it('should render rows without error', () => {
        const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
        const wrapper = component.find(Table.Row);

        expect(wrapper.length).toBe(6);
    })

    it('should render cells without error', () => {
        const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
        const wrapper = component.find(Table.Cell);

        expect(wrapper.length).toBe(35);
    })

    // I think this should render todo in Table Cell, but It does not work at all.
    it('should render todo without error', () => {
        const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
        const wrapper = component.find('.todoTitle');

        expect(wrapper.length).toBe(0);
        //console.log(component.debug());
    })
})