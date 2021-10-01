import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import TodoCalendar from "./TodoCalendar";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/todo";

jest.mock("../../components/Calendar/Calendar", () => {
  return jest.fn((props) => {
    return (
      <div className="spyCalendar">
        {props.year}.{props.month}
        <button className="doneButton" onClick={props.clickDone} />
      </div>
    );
  });
});

const stubInitialState = {
  year: 2021,
  month: 9,
  todos: [
    { id: 1, year: 2021, month: 9, date: 30, done: false },
    { id: 2, year: 2021, month: 9, date: 30, done: true },
    { id: 3, year: 2021, month: 10, date: 1, done: false },
  ],
};

const mockStore = getMockStore(stubInitialState);

describe("<TodoCalendar />", () => {
  let todoCalendar, spyGetTodos;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact render={() => <TodoCalendar />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    spyGetTodos = jest
      .spyOn(actionCreators, "getTodos")
      .mockImplementation(() => {
        return (dispatch) => {};
      });
  });

  it("should render Todos", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".spyCalendar");
    expect(wrapper.length).toBe(1);
    expect(wrapper.text()).toBe("2021.9");
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it(`should call 'handleClickPrev'`, () => {
    const component = mount(todoCalendar);
    const wrapper = component.find("button").at(0);
    const TodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2021);
    expect(TodoCalendarInstance.state.month).toEqual(8);
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2021);
    expect(TodoCalendarInstance.state.month).toEqual(7);
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2021);
    expect(TodoCalendarInstance.state.month).toEqual(6);
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2021);
    expect(TodoCalendarInstance.state.month).toEqual(5);
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2021);
    expect(TodoCalendarInstance.state.month).toEqual(4);
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2021);
    expect(TodoCalendarInstance.state.month).toEqual(3);
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2021);
    expect(TodoCalendarInstance.state.month).toEqual(2);
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2021);
    expect(TodoCalendarInstance.state.month).toEqual(1);
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2020);
    expect(TodoCalendarInstance.state.month).toEqual(12);
  });

  it(`should call 'handleClickNext'`, () => {
    const component = mount(todoCalendar);
    const TodoCalendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    const wrapper = component.find("button").at(1);
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2021);
    expect(TodoCalendarInstance.state.month).toEqual(10);
    wrapper.simulate("click")
    expect(TodoCalendarInstance.state.year).toEqual(2021);
    expect(TodoCalendarInstance.state.month).toEqual(11);
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2021);
    expect(TodoCalendarInstance.state.month).toEqual(12);
    wrapper.simulate("click");
    expect(TodoCalendarInstance.state.year).toEqual(2022);
    expect(TodoCalendarInstance.state.month).toEqual(1);
  });

  it(`should call 'clickDone'`, () => {
    const spyToggleTodo = jest
      .spyOn(actionCreators, "toggleTodo")
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
    const component = mount(todoCalendar);
    const wrapper = component.find(".spyCalendar .doneButton").at(0);
    wrapper.simulate("click");
    expect(spyToggleTodo).toBeCalledTimes(1);
  });
});