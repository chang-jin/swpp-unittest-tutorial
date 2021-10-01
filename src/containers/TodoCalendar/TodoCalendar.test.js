import React from 'react';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { mount } from 'enzyme';
import { getMockStore } from '../../test-utils/mocks';
import TodoCalendar from './TodoCalendar';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

const stubInitialState = {
  todos: [
    {
      id: 1,
      title: 'TODO_TEST_TITLE_1',
      done: false,
      year: 2021,
      month: 8,
      date: 2,
    },
    {
      id: 2,
      title: 'TODO_TEST_TITLE_2',
      done: false,
      year: 2021,
      month: 8,
      date: 2,
    },
    {
      id: 3,
      title: 'TODO_TEST_TITLE_3',
      done: true,
      year: 2021,
      month: 8,
      date: 2,
    },
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
    spyGetTodos = jest
      .spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => {
        return (dispatch) => {};
      });
  });

  it('should render TodoCalendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.todoCalendar');
    expect(wrapper.length).toBe(1);
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it(`should handle 'toggleTodo'`, () => {
    const spyToggleTodo = jest
      .spyOn(actionCreators, 'toggleTodo')
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
    const component = mount(todoCalendar);
    const wrapper = component.find('.done');
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });

  it('should handle click prev button', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.prev');
    wrapper.simulate('click');
    const newTodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    expect(newTodoCalendarInstance.state.month).toBe(8);
  });

  it('should handle click next button', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.next');
    wrapper.simulate('click');
    const newTodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    expect(newTodoCalendarInstance.state.month).toBe(10);
  });

  it('should set state properly on year & month with prev button', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.prev');
    for (let i = 0; i < 9; i++) wrapper.simulate('click');
    const newTodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    expect(newTodoCalendarInstance.state.year).toBe(2020);
    expect(newTodoCalendarInstance.state.month).toBe(12);
  });

  it('should set state properly on year & month with next button', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.next');
    for (let i = 0; i < 4; i++) wrapper.simulate('click');
    const newTodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    expect(newTodoCalendarInstance.state.year).toBe(2022);
    expect(newTodoCalendarInstance.state.month).toBe(1);
  });
});
