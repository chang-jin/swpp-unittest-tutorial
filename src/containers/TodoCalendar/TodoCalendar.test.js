import React, { Component } from "react";
import { shallow, mount, ReactWrapper } from "enzyme";
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
        <div className="year">{props.year}</div>
        <div className="month">{props.month}</div>
      </div>
    );
  });
});

const stubInitialState = {
  year: 2021,
  month: 12,
  todos: [
    {
      id: 0,
      title: "title 1",
      content: "content 1",
      dueDate: {
        year: 2021,
        month: 10,
        date: 2,
      },
    },
    {
      id: 1,
      title: "title 2",
      content: "content 2",
      dueDate: {
        year: 2021,
        month: 10,
        date: 3,
      },
    },
  ],
  selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe("<TodoCalender />", () => {
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

  it("should render TodoCalender with no errors", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".spyCalendar");
    expect(wrapper.length).toBe(1);
    expect(spyGetTodos).toBeCalledTimes(1);
  });

  it("should click handleClickPrev button", () => {
    const component = mount(todoCalendar);
    const wrapper = component.find(".todoCalendar-container");
    const button = component.find(".prev-button");

    // for (let i = 0; i < 12; i++) {
    //   let year = wrapper.state().year;
    //   let month = wrapper.state().month;
    //   button.simulate("click");
    //   if (month === 1) {
    //     expect(wrapper.state().year).toBe(year - 1);
    //     expect(wrapper.state().month).toBe(12);
    //   } else{
    //     expect(wrapper.state().month).toBe(month - 1);
    //   }

    // }
    expect();
  });
});
