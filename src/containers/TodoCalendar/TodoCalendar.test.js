import React from "react";
import { shallow, mount } from "enzyme";
import { Provider } from "react-redux";
import { connectRouter, ConnectedRouter } from "connected-react-router";
import { Route, Redirect, Switch } from "react-router-dom";

import TodoCalendar from "./TodoCalendar";
import { getMockStore } from "../../test-utils/mocks";
import { history } from "../../store/store";
import * as actionCreators from "../../store/actions/todo";

const stubInitialState = {
  todos: [
    { id: 1, title: "TODO_TEST_TITLE_1", done: true, year: 1996, month: 4, date: 17 },
    { id: 2, title: "TODO_TEST_TITLE_2", done: false, year: 2021, month: 10, date: 1 },
    { id: 3, title: "TODO_TEST_TITLE_3", done: false, year: 2017, month: 5, date: 15 },
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe("<TodoCalendar />", () => {
  let todoCalendar;

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={TodoCalendar} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
  });

  it("should render TodoCalendar", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".TodoCalendar");
    expect(wrapper.length).toBe(1);
  });

  it(`should call 'getTodos'`, () => {
    const spyGetTodos = jest.spyOn(actionCreators, "getTodos").mockImplementation(() => {
      return (dispatch) => {};
    });
    const component = mount(todoCalendar);
    expect(spyGetTodos).toHaveBeenCalledTimes(1);
  });

  it(`should call 'toggleTodo'`, () => {
    const spyToggleTodo = jest
      .spyOn(actionCreators, "toggleTodo")
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
    const component = mount(todoCalendar);
    const wrapper = component.find(".todoTitle.done");
    wrapper.simulate("click");
    expect(spyToggleTodo).toHaveBeenCalledTimes(1);
  });

  it("should update year & month by prev button", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".prev");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toBe(2020);
    expect(todoCalendarInstance.state.month).toBe(9);
  });

  it("should update year & month by next button", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".next");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    wrapper.simulate("click");
    const todoCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalendarInstance.state.year).toBe(2022);
    expect(todoCalendarInstance.state.month).toBe(9);
  });
});
