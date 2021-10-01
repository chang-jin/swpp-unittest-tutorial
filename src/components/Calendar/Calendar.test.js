import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import expectationResultFactory from 'jest-jasmine2/build/expectationResultFactory';

describe('<Calendar />', () => {
    let stubTodos = [
        {
            id: 1,
            year: 2021,
            month: 11,
            date: 15,
            title: 'TEST_TODO_1',
            done: true,
        },
        {
            id: 2,
            year: 2021,
            month: 11,
            date: 20,
            title: 'TEST_TODO_2',
            done: false,
        },
    ];

    it('should render Calendar', () => {
        const component = shallow(<Calendar year='2021' month='10' />);
        let wrapper = component.find(".sunday");
        expect(wrapper.length).toBe(5);
    })

    it('should render todo', () => {
        const component = shallow(<Calendar year='2021' month='10' todos={stubTodos}/>);
        let wrapper = component.find(".sunday");
        expect(wrapper.length).toBe(5);
    })

})