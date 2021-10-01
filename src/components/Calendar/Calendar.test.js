import React from 'react';
import { shallow } from 'enzyme';

import Calendar from './Calendar';

const stubTodoCalendar = [
    { id: 1, title: 'homework', content: 'text', done: true, year: 2021, month: 10, date: 1}
];

describe('<Calendar />', () => {
    it('should render Calendar', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('.Calendar');
        expect(wrapper.length).toBe(1);
    });

    it('should render correct size of Calendar', () => {
        const component = shallow(<Calendar year={2021} month={10} todos={stubTodoCalendar} />);
        const wrapper = component.find('.cell');
        expect(wrapper.length).toBe(31);
    });
});