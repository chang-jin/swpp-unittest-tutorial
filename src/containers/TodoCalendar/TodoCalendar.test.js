import React, { Component } from 'react';

import { NavLink } from 'react-router-dom';

import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import Calendar from '../../components/Calendar/Calendar';

import * as actionCreators from '../../store/actions/index';

import TodoCalendar from './TodoCalendar';
import getMockStore from '../../test-utils/mocks';


jest.mock('../../components/Calendar/Calendar', () => {
  return jest.fn(props => {
    return (
      <div className="spyCalendar">
      </div>);
  });
});

const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2021, month: 11, date: 1},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2021, month: 10, date: 1},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2021, month: 9, date: 1},
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
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
      .mockImplementation(() => { return dispatch => {}; });
  })
    spyToggleTodo = jest.spyOn(actionCreators, 'ToggleTodos')
    .mockImplementation(() => { return dispatch => {}; });

  it('should render Calendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar');
    expect(wrapper.length).toBe(1);
    expect(spyGetTodos).toBeCalledTimes(1);
  });
});

/*
  it(`should call 'clickTodoHandler'`, () => {
    const spyHistoryPush = jest.spyOn(history, 'push')
      .mockImplementation(path => {});
    const component = mount(todoList);
    const wrapper = component.find('.spyTodo .title').at(0);
    wrapper.simulate('click');
    expect(spyHistoryPush).toHaveBeenCalledWith('/todos/1');
  });

  it(`should call 'clickDelete'`, () => {
    const spyDeleteTodo = jest.spyOn(actionCreators, 'deleteTodo')
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoList);
    const connectedRouter = component.find(ConnectedRouter);
    const wrapper = component.find('.spyTodo .deleteButton').at(0);
    wrapper.simulate('click');
    expect(spyDeleteTodo).toHaveBeenCalledTimes(1);
  });

  it(`should call 'clickDone'`, () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoList);
    const wrapper = component.find('.spyTodo .doneButton').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
  
});

*/