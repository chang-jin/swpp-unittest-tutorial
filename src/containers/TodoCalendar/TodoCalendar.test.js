import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';
import { Item } from 'semantic-ui-react';

const stubInitialState = {
    todos: [
        { id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2021, month: 9, date: 3 },
        { id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2021, month: 9, date: 9 },
        { id: 3, title: 'TODO_TEST_TITLE_3', done: true, year: 2021, month: 8, date: 15 },
    ],
    selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);


describe('<TodoCalendar />', () => {
    let todoCalendar;
    let spyGetTodos, spyToggleTodo;

    beforeEach(() => {
        todoCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact
                            render={() => <TodoCalendar />} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
        spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
            .mockImplementation(() => { return dispatch => { }; });
        spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
            .mockImplementation(() => { return dispatch => { }; })
    })

    it(`should render TodoCalender`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.TodoCalendar');
        expect(wrapper.length).toBe(1);
    });

    it(`should handle ClickPrev`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('TodoCalendar');
        const header = component.find('.header');
        const prevButton = header.find('button').at(0);
        prevButton.simulate('click');

        let year = wrapper.state().year;
        let month = wrapper.state().month;

        for (let i = 0; i < 12; i++) {
            prevButton.simulate('click')
        }
        expect(wrapper.state().year).toBe(year - 1);
    });

    it(`should handle ClickNext`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('TodoCalendar');
        const header = component.find('.header');
        const nextButton = header.find('button').at(1);
        nextButton.simulate('click');

        let year = wrapper.state().year;
        let month = wrapper.state().month;

        for (let i = 0; i < 12; i++) {
            nextButton.simulate('click')
        }
        expect(wrapper.state().year).toBe(year + 1);
    });

    it(`should toggle Todo`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.todoTitle.done');
        wrapper.simulate('click');
        expect(spyToggleTodo).toHaveBeenCalledTimes(1);
    })

}) 