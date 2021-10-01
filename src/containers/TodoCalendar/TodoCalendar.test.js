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
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
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

  it("should render without errors", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".TodoCalendar");
    expect(wrapper.length).toBe(1);
  })

  it("prevbtn", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".prevbtn");
    wrapper.simulate("click");
    const instance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(instance.state.year).toBe(2021);
    expect(instance.state.month).toBe(8);
  })

  it("prevbtn change year", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".prevbtn");
    for(let i = 0; i < 9; ++i) wrapper.simulate("click");
    const instance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(instance.state.year).toBe(2020);
    expect(instance.state.month).toBe(12);
  })

  it("nextbtn", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".nextbtn");
    wrapper.simulate("click");
    const instance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(instance.state.year).toBe(2021);
    expect(instance.state.month).toBe(10);
  })

  it("nextbtn change year", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".nextbtn");
    for(let i = 0; i < 4; ++i) wrapper.simulate("click");
    const instance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(instance.state.year).toBe(2022);
    expect(instance.state.month).toBe(1);
  })
});

