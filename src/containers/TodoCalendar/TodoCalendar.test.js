import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar', () => {
  return jest.fn(props => {
    return (
        <div className="spyCalendar">
            <div className="notdone" onClick={props.clickDone}>
                title
            </div>
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

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={TodoCalendar} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
  })

  it('should render Calendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar');
    expect(wrapper.length).toBe(1);
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it(`should call 'handleClickPrev'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(0);
    wrapper.simulate('click');
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toBe(2021);
    expect(todoCalendarInstance.state.month).toBe(8);
  });

  it(`should call 'handleClickNext'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(1);
    wrapper.simulate('click');
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toBe(2021);
    expect(todoCalendarInstance.state.month).toBe(10);
  });

  it(`should have proper year & month value at corner case`, () => {
    const component = mount(todoCalendar);
    let wrapper = component.find('button').at(1);
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    wrapper.simulate('click');
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toBe(2022);
    expect(todoCalendarInstance.state.month).toBe(1);
    wrapper = component.find('button').at(0);
    wrapper.simulate('click');
    expect(todoCalendarInstance.state.year).toBe(2021);
    expect(todoCalendarInstance.state.month).toBe(12);
  });

  it(`should call 'toggleTodo'`, () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(id => { return dispatch => {}; });
    const component = mount(todoCalendar);
    const wrapper = component.find('.spyCalendar .notdone');
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
  
});

