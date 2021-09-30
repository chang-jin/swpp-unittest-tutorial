import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import NewTodo from './NewTodo';
import { getMockStore } from '../../../test-utils/mocks';
import { history } from '../../../store/store';
import * as actionCreators from '../../../store/actions/todo';

const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<NewTodo />', () => {
  let newTodo;

  beforeEach(() => {
    newTodo = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
        <Switch>
          <Route path='/' exact component={NewTodo} />
        </Switch>
        </ConnectedRouter>
      </Provider>
    );
  })

  it('should render NewTodo', () => {
    const component = mount(newTodo);
    const wrapper = component.find('.NewTodo');
    expect(wrapper.length).toBe(1);
  });

  it(`should call 'postTodo'`, () => {
    const spyPostTodo = jest.spyOn(actionCreators, 'postTodo')
      .mockImplementation(td => { return dispatch => {}; });
    const component = mount(newTodo);
    const wrapper = component.find('button');
    wrapper.simulate('click');
    expect(spyPostTodo).toHaveBeenCalledTimes(1);
  });
  
  it(`should set state properly on title input`, () => {
    const title = 'TEST_TITLE'
    const component = mount(newTodo);
    const wrapper = component.find('#title-input');
    wrapper.simulate('change', { target: { value: title } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual(title);
    expect(newTodoInstance.state.content).toEqual('');
  });

  it(`should set state properly on content input`, () => {
    const content = 'TEST_CONTENT'
    const component = mount(newTodo);
    const wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: content } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual(content);
  });

  it(`should set state properly on year month date input`, () => {
    let instance = null;

    const year = 2020;
    const month = 2;
    const date = 23;

    const component = mount(newTodo);
    const yearInput = component.find('#year-input');
    const monthInput = component.find('#month-input');
    const dateInput = component.find('#date-input');

    yearInput.simulate('change', { target: { value: year } });
    instance = component.find(NewTodo.WrappedComponent).instance();
    expect(instance.state.dueDate.year).toEqual(year);

    monthInput.simulate('change', { target: { value: month } });
    instance = component.find(NewTodo.WrappedComponent).instance();
    expect(instance.state.dueDate.month).toEqual(month);

    dateInput.simulate('change', { target: { value: date } });
    instance = component.find(NewTodo.WrappedComponent).instance();
    expect(instance.state.dueDate.date).toEqual(date);
  });
});


