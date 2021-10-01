import React, { Component } from "react";
import { shallow, mount } from "enzyme";
import { Provider, connect } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";

import { getMockStore } from "../../test-utils/mocks";
import TodoCalendar from "./TodoCalendar";
import { history } from "../../store/store";

import * as actionCreators from '../../store/actions/index';


const stubInitialState = {
    todos : [
        {
            id: 1,
            title: "picnic",
            content: 'content1',
            done: true,
            year: 2021,
            month: 9,
            date: 30,
        },
        {
            id: 2,
            title: "movie",
            content: 'watch movie',
            done: false,
            year: 2021,
            month: 9,
            date: 30,
        },
        {
            id: 3,
            title: "sleep",
            content: 'good',
            done: true,
            year: 2021,
            month: 9,
            date: 30,
        },
        ],
    selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

jest.mock("../../components/Calendar/Calendar", () => {
  return jest.fn((props) => {
    return <div className="calendar" onClick={props.clickDone}></div>;
  });
});

describe("<TodoCalendar />", () => {
  let calendar;
  beforeEach(() => {
    calendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={TodoCalendar} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    actionCreators.getTodos = jest.fn((dispath) => {});
  });

  it('rendering test', () => {
    const component = mount(calendar);
    const wrapper = component.find(".header");
    expect(wrapper.length).toBe(1);
  });

  it('button click test', () => {
    const component = mount(calendar);
    const wrapper = component.find("button");
    expect(wrapper.length).toBe(2);

    const calendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(calendarInstance.state.month).toEqual(9);
    wrapper.at(1).simulate("click");
    wrapper.at(1).simulate("click");
    wrapper.at(1).simulate("click");
    wrapper.at(1).simulate("click");
    expect(calendarInstance.state.year).toEqual(2022);
    expect(calendarInstance.state.month).toEqual(1);
    wrapper.at(0).simulate("click");
    expect(calendarInstance.state.year).toEqual(2021);
    expect(calendarInstance.state.month).toEqual(12);
  });
});