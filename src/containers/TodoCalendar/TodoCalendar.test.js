import { ConnectedRouter } from 'connected-react-router';
import { mount } from 'enzyme';
import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch } from 'react-router';

import * as actionCreators from '../../store/actions/todo';
import { history } from '../../store/store';
import { getMockStore } from '../../test-utils/mocks';
import TodoCalendar from './TodoCalendar';

jest.mock('../../components/Calendar/Calendar', () => {
  return jest.fn((props) => {
    const cells = props.todos.map((todo) => (
      <td key={todo.id}>
        <div
          className="spy-calendar__todo"
          onClick={() => props.clickDone(todo.id)}
        >
          {todo.title}
        </div>
      </td>
    ));
    return (
      <table>
        <tbody>
          <tr>
            {cells}
          </tr>
        </tbody>
      </table>
    );
  });
});

const stubInitialState = {
  todos: [
    { id: 1, title: 'TODO_TEST_TITLE_1', done: false },
    { id: 2, title: 'TODO_TEST_TITLE_2', done: false },
    { id: 3, title: 'TODO_TEST_TITLE_3', done: false },
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact render={() => <TodoCalendar />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it('should change years and months', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('TodoCalendar');
    expect(wrapper.state().year).toBe(2021);
    expect(wrapper.state().month).toBe(9);

    const wrapperPrevMonth = wrapper.find('.todo-calendar__prev-month');
    expect(wrapperPrevMonth).toHaveLength(1);
    const wrapperNextMonth = wrapper.find('.todo-calendar__next-month');
    expect(wrapperNextMonth).toHaveLength(1);

    wrapperPrevMonth.simulate('click');
    expect(wrapper.state().year).toBe(2021);
    expect(wrapper.state().month).toBe(8);
    wrapperNextMonth.simulate('click');
    expect(wrapper.state().year).toBe(2021);
    expect(wrapper.state().month).toBe(9);
  
    while (wrapper.state().month !== 12) {
      wrapperNextMonth.simulate('click');
    }
    wrapperNextMonth.simulate('click');
    expect(wrapper.state().year).toBe(2022);
    expect(wrapper.state().month).toBe(1);
    wrapperPrevMonth.simulate('click');
    expect(wrapper.state().year).toBe(2021);
    expect(wrapper.state().month).toBe(12);
  })
  
  it('should render Todos', () => {
    const spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => (dispatch) => {});
    const component = mount(todoCalendar);
    const wrapper = component.find('.spy-calendar__todo');
    expect(wrapper).toHaveLength(3);
    expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1');
    expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_2');
    expect(wrapper.at(2).text()).toBe('TODO_TEST_TITLE_3');
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it("should call 'clickDone'", () => {
    const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(() => (dispatch) => {});
    const component = mount(todoCalendar);
    const wrapper = component.find('.spy-calendar__todo').at(0);
    wrapper.simulate('click');
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});
