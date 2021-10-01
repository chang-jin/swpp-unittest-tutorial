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
        { id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2021, month: 8, date: 20 },
        { id: 2, title: 'TODO_TEST_TITLE_2', done: false, year: 2021, month: 9, date: 17 },
        { id: 3, title: 'TODO_TEST_TITLE_3', done: true, year: 2021, month: 8, date: 30 },
      ],
      selectedTodo: null,
};
const mockStore = getMockStore(stubInitialState);


describe('<TodoCalendar />', () => {
  let calendar, spyGetTodos, spyToggleTodo;

  beforeEach(() => {
    calendar = (
        <Provider store={mockStore}>
          <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact   component={TodoCalendar} />
          </Switch>
          </ConnectedRouter>
        </Provider>
      );
       spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation((id) => { return dispatch => { } })
        spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
        .mockImplementation(() => { return dispatch => { }; });
  })
  it('should render TodoCalendar', ()=>{
    const component =mount(calendar);
      let wrapper = component.find('.CalendarTodo');
      expect(wrapper.length).toBe(1);
      expect(spyGetTodos).toHaveBeenCalledTimes(1);
  });
  it('should click prev button', () => {
    const component = mount(calendar);
    const button = component.find('.prev');
    button.simulate('click');
    let prev = component.find(TodoCalendar.WrappedComponent).instance();
    expect(prev.state.month).toBe(8);
  });
  it('should click next button', () => {
    const component = mount(calendar);
    const button = component.find('.next');
    button.simulate('click');
    let next = component.find(TodoCalendar.WrappedComponent).instance();
    expect(next.state.month).toBe(10);
  });
  it('should call getTodos',()=>{
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
    .mockImplementation(() => { return dispatch => {}; });
    const component=mount(calendar);
    expect(spyGetTodos).toHaveBeenCalledTimes(4);
  })

  it(`year should change with prev`, () => {
    const component = mount(calendar);
    const button = component.find('.prev');
    const initialMonth = 9;
    for (let i = 0; i < initialMonth; i++) {
        button.simulate('click');
    }
    let wrap = component.find(TodoCalendar.WrappedComponent).instance();
    expect(wrap.state.month).toBe(12);
    expect(wrap.state.year).toBe(2020);
});
it(`year should change with next`, () => {
    const component = mount(calendar);
    const button = component.find('.next');
    for (let i = 0; i < 4; i++) {
        button.simulate('click');
    }
    let wrap = component.find(TodoCalendar.WrappedComponent).instance();
    expect(wrap.state.month).toBe(1);
    expect(wrap.state.year).toBe(2022);
});
it('should click one todo', () => {
    const component = mount(calendar)
    const wrapper = component.find('.todoTitle.done')
    wrapper.simulate('click')
    expect(spyToggleTodo).toHaveBeenCalledTimes(1);
}); 
});

