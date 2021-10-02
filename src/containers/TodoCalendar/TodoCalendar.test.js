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
        <div className="mockCalendar">
          <div className="year">{props.year}</div>
          <div className="month">{props.month}</div>
          <button className="done" onClick={() => props.clickDone(1)} />
        </div>
      )
    })
  })

const stubInitialState = {
    todos: [
        { id: 1, title: "TODO_TEST_TITLE_1", done: false, year: 2021, month: 9, date: 1 },
        { id: 2, title: "TODO_TEST_TITLE_2", done: true, year: 2021, month: 9, date: 1 },
        { id: 3, title: "TODO_TEST_TITLE_3", done: false, year: 2021, month: 9, date: 1 },
    ],
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos, spyToggleTodo;

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
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
    
    spyToggleTodo = jest
      .spyOn(actionCreators, "toggleTodo")
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
  })

  it('should render TodoCalendar', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('TodoCalendar');
    expect(wrapper.length).toBe(1);
  });

  it(`should call 'handleClickPrev'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('TodoCalendar')
    const header = component.find('.header');
    const prevButton = header.find('button').first();

    for (let index = 0; index < 12; index++) {
        let year = wrapper.state().year;
        let month = wrapper.state().month;
        prevButton.simulate('click');
        month === 1 ? expect(wrapper.state().year).toBe(year - 1) : expect(wrapper.state().year).toBe(year);
        month === 1 ? expect(wrapper.state().month).toBe(12) : expect(wrapper.state().month).toBe(month - 1);
    }
  });

  it(`should call 'handleClickNext'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('TodoCalendar')
    const header = component.find('.header');
    const nextButton = header.find('button').at(1);
    
    for (let index = 0; index < 12; index++) {
        let year = wrapper.state().year;
        let month = wrapper.state().month;
        nextButton.simulate('click');
        month === 12 ? expect(wrapper.state().year).toBe(year + 1) : expect(wrapper.state().year).toBe(year);
        month === 12 ? expect(wrapper.state().month).toBe(1) : expect(wrapper.state().month).toBe(month + 1);
    }
  });

  it(`should call 'toggleTodo'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.mockCalendar').find('.done');
    wrapper.simulate('click');
    expect(spyToggleTodo).toHaveBeenCalledTimes(1);
  });
});

