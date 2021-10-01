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
  const now = new Date();

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
    const wrapper = component.find('.TitleInput');
    wrapper.simulate('change', { target: { value: title } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual(title);
    expect(newTodoInstance.state.content).toEqual('');
    expect(newTodoInstance.state.dueDate.year).toEqual(now.getFullYear());
    expect(newTodoInstance.state.dueDate.month).toEqual(now.getMonth() + 1);
    expect(newTodoInstance.state.dueDate.date).toEqual(now.getDate());
  });

  it(`should set state properly on content input`, () => {
    const content = 'TEST_CONTENT'
    const component = mount(newTodo);
    const wrapper = component.find('textarea');
    wrapper.simulate('change', { target: { value: content } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual(content);
    expect(newTodoInstance.state.dueDate.year).toEqual(now.getFullYear());
    expect(newTodoInstance.state.dueDate.month).toEqual(now.getMonth() + 1);
    expect(newTodoInstance.state.dueDate.date).toEqual(now.getDate());
  });

  it(`should set state properly on content year`, () => {
    const year = '2100';
    const component = mount(newTodo);
    const wrapper = component.find('.YearInput');
    wrapper.simulate('change', { target: { value: year } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual('');
    expect(newTodoInstance.state.dueDate.year).toEqual(year);
    expect(newTodoInstance.state.dueDate.month).toEqual(now.getMonth() + 1);
    expect(newTodoInstance.state.dueDate.date).toEqual(now.getDate());
  });

  it(`should set state properly on content month`, () => {
    const month = '12';
    const component = mount(newTodo);
    const wrapper = component.find('.MonthInput');
    wrapper.simulate('change', { target: { value: month } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual('');
    expect(newTodoInstance.state.dueDate.year).toEqual(now.getFullYear());
    expect(newTodoInstance.state.dueDate.month).toEqual(month);
    expect(newTodoInstance.state.dueDate.date).toEqual(now.getDate());
  });

  it(`should set state properly on content date`, () => {
    const date = '1';
    const component = mount(newTodo);
    const wrapper = component.find('.DateInput');
    wrapper.simulate('change', { target: { value: date } });
    const newTodoInstance = component.find(NewTodo.WrappedComponent).instance();
    expect(newTodoInstance.state.title).toEqual('');
    expect(newTodoInstance.state.content).toEqual('');
    expect(newTodoInstance.state.dueDate.year).toEqual(now.getFullYear());
    expect(newTodoInstance.state.dueDate.month).toEqual(now.getMonth() + 1);
    expect(newTodoInstance.state.dueDate.date).toEqual(date);
  });

});


