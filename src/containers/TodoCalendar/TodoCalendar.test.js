import React, { Component } from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import TodoCalendar from './TodoCalendar';
import { Route, Redirect, Switch } from 'react-router-dom';

import * as actionCreators from '../../store/actions/index';

import './TodoCalendar.css';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

const stubInitialState = {
    year: 2020,
    month: 10, 
    todos: [{year: 2020, month: 10, date: 10, id: 1, done: true, title:test}],
  };
  
  const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
  let todoCalendar;

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
  })
  it('should render without error', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('.header');
    expect(wrapper.length).toBeGreaterThan(0);
  });

  it('should render prev', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(0);
    wrapper.simulate('click')
    expect(component.find('.header').length).toBeGreaterThan(0);
  });
  
  it('should render next', () => {
    const component = mount(todoCalendar);
    const wrapper = component.find('button').at(1);
    wrapper.simulate('click')
    expect(component.find('.header').length).toBeGreaterThan(0);
  });

});


