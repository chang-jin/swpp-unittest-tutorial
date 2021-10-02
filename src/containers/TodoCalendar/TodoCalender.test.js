import React from 'react';

import { Provider } from 'react-redux';

import * as actionCreators from '../../store/actions/todo';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import TodoCalendar from './TodoCalendar';
import { shallow, mount } from "enzyme";
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';
import NewTodo from "../TodoList/NewTodo/NewTodo";

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
        return (
            <div className="spyTodo">
                <div className="title">
                    {props.todos[0].title}
                </div>
                <button className="doneButton" onClick={props.clickDone} />
            </div>);
    });
});

const stubInitialState = {
    todos: [
      {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
      {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
      {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
    ],
    selectedTodo: null,
  };
  
const mockStore = getMockStore(stubInitialState);

describe('TodoCalender Test', () => {

    let todoCalendar, spyGetTodos;

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
            .mockImplementation(() => { return (dispatch) => {}; });
      })

    it("should render without errors", () => {
        const component = mount(todoCalendar);
        //console.log(component.debug());
        const wrapper = component.find('.spyTodo');
        expect(wrapper.length).toBe(1);
        expect(wrapper.text()).toBe('TODO_TEST_TITLE_1');
        expect(spyGetTodos).toBeCalledTimes(1);
    });

    it('check button', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.header button').at(0);
        wrapper.simulate('click');
        const newInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newInstance.state.month).toBe(8);

        const wrapper2 = component.find('.header button').at(0);

        for ( let i = 0; i < 12; i++) {
            wrapper2.simulate('click');
        }

        const newInstance2 = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newInstance2.state.year).toBe(2020);

        const wrapper3 = component.find('.header button').at(1);

        for ( let i = 0; i < 24; i++) {
            wrapper3.simulate('click');
        }

        const newInstance3 = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newInstance3.state.year).toBe(2022);
        expect(newInstance3.state.month).toBe(8);
    });

    it(`should call 'clickDone'`, () => {
        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
          .mockImplementation(id => { return dispatch => {}; });
        const component = mount(todoCalendar);
        //console.log(component.debug());
        const wrapper = component.find('.spyTodo .doneButton').at(0);
        wrapper.simulate('click');
        expect(spyToggleTodo).toBeCalledTimes(1);
    });
    
})