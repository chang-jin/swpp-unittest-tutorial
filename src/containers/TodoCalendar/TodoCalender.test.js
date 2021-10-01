import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import Calendar from '../../components/Calendar/Calendar';

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

describe('<TodoCalenderr />', () => {
    let todoCalender, spyGetTodos;
  
    beforeEach(() => {
      todoCalender = (
        <Provider store={mockStore}>
          <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact
              render={() => <TodoCalendar title="TODOCALENDER_TEST_TITLE" />} />
          </Switch>
          </ConnectedRouter>
        </Provider>
      );
      spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
        .mockImplementation(() => { return dispatch => {}; });
    })

    it ('should render Calender', () => {
        const component = mount(todoCalender);
        const wrapper = component.find('Table');
        expect(wrapper.length).toBe(1);
    })

    it(`should call 'handleClickPrev'`, () => {
        const spyHandleClickPrev = jest.fn();
        const component = mount(todoCalender); // handleClickPrev={spyHandleClickPrev}/>);
        const wrapper = component.find("button");
        console.log(component.debug());
        wrapper.at(0).simulate('click');
        console.log(wrapper.debug());
        expect(spyHandleClickPrev).toHaveBeenCalledTimes(1);
    })

})
