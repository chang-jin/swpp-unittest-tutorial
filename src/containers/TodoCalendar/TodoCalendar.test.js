import React from "react";
import { mount } from "enzyme";
import { Provider } from "react-redux";
import { ConnectedRouter } from "connected-react-router";
import { Route, Switch } from "react-router-dom";
import { getMockStore } from "../../test-utils/mocks";
import TodoCalendar from "./TodoCalendar";
import { history } from "../../store/store";

import * as actionCreators from "../../store/actions/todo";

const stubInitialState = {
  todos: [
    { id: 1, title: "TODO_TEST_TITLE_1", done: false },
    { id: 2, title: "TODO_TEST_TITLE_2", done: false },
    { id: 3, title: "TODO_TEST_TITLE_3", done: false },
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
  let newTodo;
  beforeEach(() => {
    newTodo = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={() => <TodoCalendar />} />
          </Switch>
        </ConnectedRouter>
      </Provider>
    );
    actionCreators.getTodos = jest.fn(() => (dispath) => {});
  });

  it(`should render header`, () => {
    const component = mount(newTodo);
    const wrapper = component.find(".header");
    console.log(component.debug());
    expect(wrapper.length).toBe(1);
  });

  it(`should button click wells`, () => {
    const component = mount(newTodo);
    const wrapper = component.find("button");
    expect(wrapper.length).toBe(2);
    const calendarInstance = component
      .find(TodoCalendar.WrappedComponent)
      .instance();
    wrapper.at(0).simulate("click");
    expect(calendarInstance.state.month).toEqual(8);
    wrapper.at(1).simulate("click");
    expect(calendarInstance.state.month).toEqual(9);
    for (let i = 1; i <= 4; ++i) {
      wrapper.at(1).simulate("click");
    }
    expect(calendarInstance.state.year).toEqual(2022);
    expect(calendarInstance.state.month).toEqual(1);
    wrapper.at(0).simulate("click");
    expect(calendarInstance.state.year).toEqual(2021);
    expect(calendarInstance.state.month).toEqual(12);
  });

  it(`should toggle Todo well`, () => {
    const spyToggleTodo = jest
      .spyOn(actionCreators, "toggleTodo")
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
    const component = mount(newTodo);
    const wrapper = component.find(".calendar");
    wrapper.simulate("click");
    expect(spyToggleTodo).toHaveBeenCalledTimes(1);
  });
});
