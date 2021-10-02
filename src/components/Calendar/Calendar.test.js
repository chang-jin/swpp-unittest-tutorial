import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react';

const stubTodos = [
    { id: 1, title: "TEST_TODO_1", done: true, year: 2021, month: 9, date: 1},
    { id: 2, title: "TEST_TODO_2", done: false, year: 2021, month: 9, date: 2},
];

describe('<Calendar />', () => {
    it('should render Calender without error', () => {
        const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
        const wrapper = component.find(Table.Body);

        expect(wrapper.length).toBe(1);
    });

    it('should render rows without error', () => {
        const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
        const wrapper = component.find(Table.Row);

        expect(wrapper.length).toBe(6);
    });

    it('should render cells without error', () => {
        const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
        const wrapper = component.find(Table.Cell);

        expect(wrapper.length).toBe(35);
    });

    it('should render todo without error', () => {
        const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
        const wrapper = component.find('.todoTitle');

        expect(wrapper.length).toBe(2);
    });

    it('should clicking todo dispatch clickDone without error when done=true', () => {
        const stubClickDone = jest.fn((id) => {})
        const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} clickDone={stubClickDone}/>);
        const wrapper = component.find('.todoTitle').at(0);
        wrapper.simulate('click');

        expect(stubClickDone).toHaveBeenCalledTimes(1);
    })

    it('should clicking todo dispatch clickDone without error when done=false', () => {
        const stubClickDone = jest.fn((id) => {})
        const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} clickDone={stubClickDone}/>);
        const wrapper = component.find('.todoTitle').at(1);
        wrapper.simulate('click');

        expect(stubClickDone).toHaveBeenCalledTimes(1);
    })
})