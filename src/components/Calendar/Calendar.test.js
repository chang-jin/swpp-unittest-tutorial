import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('<Calendar />', () => {
    it('should render without errors', () => {
        const component = shallow(<Calendar />);
        const table = component.find('Table')
        expect(table.length).toBe(1);
    })

    it('render with year and month', () => {
        const todos = [
            {
                id: 8,
                title: 'SWPP',
                content: 'take swpp class',
                done: true,
                year: 2021,
                month: 9,
                date: 1
            },
            {
                id: 9,
                title: 'Movie',
                content: 'Watch Movie',
                done: false,
                year: 2021,
                month: 9,
                date: 1
            }]
        const clickDone = jest.fn()
        const component = shallow(<Calendar year={2021} month={10} todos={todos} clickDone={clickDone} />);
        let dayCell = component.find('.cell');
        expect(dayCell.length).toBe(30);
    })
})