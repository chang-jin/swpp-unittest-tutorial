import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';


const stubTodos =[
    { id: 1, title: 'TODO_TEST_TITLE1', content: 'take shower', done: true, year: 2021, month: 9, date: 30 },
    { id: 2, title: 'TODO_TEST_TITLE2', content: 'finish lab', done: false, year: 2021, month: 10, date: 1 },
    { id: 3, title: 'TODO_TEST_TITLE3', content: 'eat dinner', done: false, year: 2021, month: 10, date: 5 },
];

describe('<Calendar />', () => {
    it('should render without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('.Calendar');
        expect(wrapper.length).toBe(1);
    });

    it('should handle clicks', () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Todo clickDone={mockClickDone} />);
        const wrapper = component.find('.todoTitle');
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    });
});