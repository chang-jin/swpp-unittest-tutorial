import React from 'react';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import { shallow, mount } from 'enzyme';

import TodoCalendar from './TodoCalendar';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';


const stubInitialState = {
    todos: [
        { id: 1, title: 'TEST_TITLE_1', done: true, year: 2021, month: 9, date: 29},
        { id: 2, title: 'TEST_TITLE_2', done: false, year: 2021, month: 10, date: 30},
        { id: 3, title: 'TEST_TITLE_3', done: false, year: 2021, month: 12, date: 25},
    ],
    selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
    let todoCalendar, spyGetTodos, spyToggleTodo;

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
            .mockImplementation((id) => { return dispatch => { } })
    })

    it('should render without errors', () => {
        const component = mount(todoCalendar)
        const wrapper = component.find('TodoCalendar');
        expect(wrapper.length).toBe(1)
        expect(spyGetTodos).toHaveBeenCalledTimes(1);
    });

    it('should handle done clicks', () => {
        const component = mount(todoCalendar)
        const wrapper = component.find('.todoTitle.done')
        wrapper.simulate('click')
        expect(spyToggleTodo).toHaveBeenCalledTimes(1);
        expect(spyToggleTodo).toHaveBeenCalledWith(1);
    });

    it('should set month state properly when clicking prev btn', () => {
        const component = mount(todoCalendar)
        const wrapper = component.find('TodoCalendar');
        const header = component.find('.header')
        const prevButton = header.find('#prev')

        let year = wrapper.state().year
        for (let i = 0; i < 12; i++) {
            prevButton.simulate('click')
        }

        expect(wrapper.state().year).toBe(year - 1)
    });

    it('should set month state properly when clicking next btn', () => {
        const component = mount(todoCalendar)
        const wrapper = component.find('TodoCalendar');
        const header = component.find('.header')
        const nextButton = header.find('#next')

        let year = wrapper.state().year;
        for (let i = 0; i < 12; i++) {
            nextButton.simulate('click')
        }

        expect(wrapper.state().year).toBe(year + 1)
    });


})