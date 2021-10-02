import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Calendar from './Calendar';

let _todos = [
    {
        id: 1,
        year: 2021,
        month: 10,
        date: 1,
        title: 'myTitle',
        done: true,
    }
]

describe('<Calendar />', () => {

    it('should render Calendar without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('.sunday');
        expect(wrapper.length).toBe(1);
    });

    it('should render Calendar with props', () => {
        const component = shallow(<Calendar year={2021} month={10} todos={_todos} />);
        const wrapper = component.find('.cell');
        expect(wrapper.length).toBe(30);
    });

});
