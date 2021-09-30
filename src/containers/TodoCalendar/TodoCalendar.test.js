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
        { id: 1, title: 'TODO_TEST_TITLE_1', done: false },
        { id: 2, title: 'TODO_TEST_TITLE_2', done: false },
        { id: 3, title: 'TODO_TEST_TITLE_3', done: false },
    ],
    selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('</TodoCalendar />', () => {
    let todoCal;

    beforeEach(() => {
        todoCal = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact component={TodoCalendar} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    })

    it('should render NewTodo', () => {
        const component = mount(todoCal);
        const wrapper = component.find('.todoCalendar');
        expect(wrapper.length).toBe(1);
    });

    it(`should call 'getTodos'`, () => {
        const spyPostTodo = jest.spyOn(actionCreators, 'getTodos')
            .mockImplementation(td => { return dispatch => { }; });
        const component = mount(todoCal);
        expect(spyPostTodo).toHaveBeenCalledTimes(1);
    });

    it(`prev next button should update year&month state`, () => {
        let todoCalendarInstance = null;
        const component = mount(todoCal);
        const prevBtn = component.find('.prev');
        const nextBtn = component.find('.next');

        prevBtn.simulate('click');
        todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.month).toBe(8);

        nextBtn.simulate('click');
        todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.month).toBe(9);

    });

    it(`should year changed`, () => {
        let todoCalendarInstance = null;
        const component = mount(todoCal);
        const prevBtn = component.find('.prev');
        const monthBefore = 9;

        for (let i = 0; i < monthBefore; i++) {
            prevBtn.simulate('click');
        }
        todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalendarInstance.state.month).toBe(12);
        expect(todoCalendarInstance.state.year).toBe(2020);

    });
})
