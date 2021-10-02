import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

const stubInitialState = {
    todos: [
        {
            id: 1,
            year: 2021,
            month: 10,
            date: 1,
            title: 'myTitle1',
            done: false,
        },
    ],
    selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
    let todoCalendar, spyGetTodo;
    beforeEach(() => {
        todoCalendar = (
          <Provider store={mockStore}>
            <ConnectedRouter history={history}>
            <Switch>
              <Route path='/' exact component={() => <TodoCalendar />} />
            </Switch>
            </ConnectedRouter>
          </Provider>
        );
        spyGetTodo = jest.spyOn(actionCreators, 'getTodos')
            .mockImplementation(id => { return dispatch => {}; });
    })

    it('should render TodoCalendar without errors', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.TodoCalendar');
        expect(wrapper.length).toBe(1);
    });



    it('test TodoCalendar handleClickPrev()', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.prevMonth');
        wrapper.simulate('click');

        const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.year).toBe(2021);
        expect(todoCalendarInstance.state.month).toBe(8);
    });

    it('test TodoCalendar handleClickPrev() 9 times', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.prevMonth');
        for(let i=0; i<9; i++){
            wrapper.simulate('click');
        }

        const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.year).toBe(2020);
        expect(todoCalendarInstance.state.month).toBe(12);
    });



    it('test TodoCalendar handleClickNext()', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.nextMonth');
        wrapper.simulate('click');

        const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.year).toBe(2021);
        expect(todoCalendarInstance.state.month).toBe(10);
    });

    it('test TodoCalendar handleClickNext() 4 times', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.nextMonth');
        for(let i=0; i<4; i++){
            wrapper.simulate('click');
        }

        const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.year).toBe(2022);
        expect(todoCalendarInstance.state.month).toBe(1);
    });

});
