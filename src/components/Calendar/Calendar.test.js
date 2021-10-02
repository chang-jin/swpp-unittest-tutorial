import React from "react";
import { shallow, mount } from "enzyme";
import Calendar from "./Calendar";
import * as actionCreators from '../../store/actions/todo';

const stubInitialState = {
  todos: [
      { id: 1, title: "TODO_TEST_TITLE_1", done: false, year: 2021, month: 9, date: 1 },
      { id: 2, title: "TODO_TEST_TITLE_2", done: true, year: 2021, month: 9, date: 1 },
      { id: 3, title: "TODO_TEST_TITLE_3", done: false, year: 2021, month: 9, date: 1 },
  ],
};

describe("<Calender />", () => {
  it("should render without errors", () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find("Table");
    expect(wrapper.length).toBe(1);
  });

  it(`should call 'toggleTodo'`, () => {
    const spyToggleTodo = jest
      .spyOn(actionCreators, "toggleTodo")
      .mockImplementation((id) => {
        return (dispatch) => {};
      });
    const component = shallow(
      <Calendar
          year={2021}
          month={10}
          todos={stubInitialState.todos}
          clickDone={spyToggleTodo}/>
    );
    const wrapper = component.find("div.todoTitle").first();
    wrapper.simulate("click");
    expect(spyToggleTodo).toHaveBeenCalledTimes(1);
  });
})