import React from "react";
import { shallow } from "enzyme";
import Calendar from "./Calendar";

const stubTodos = [
  {
    id: 1, title: "TODO_TEST_TITLE_1", done: true, year: 2021, month: 10, date: 8,
  },
  {
    id: 2, title: "TODO_TEST_TITLE_2", done: false, year: 2021, month: 11, date: 20,
  },
  {
    id: 3, title: "TODO_TEST_TITLE_3", done: true, year: 2021, month: 12, date: 3,
  },
];

describe("<Calendar />", () => {
  it("should render calendar", () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(".Calendar");
    expect(wrapper.length).toBe(1);
  });

  it("should set dates according to year and month", () => {
    const component = shallow(
      <Calendar year={2021} month={10} todos={stubTodos} />
    );
    const wrapper = component.find(".date");
    expect(wrapper.length).toBe(30);
  });

  it("should show tasks", () => {
    const component = shallow(
      <Calendar year={2021} month={11} todos={stubTodos} />
    );
    const wrapper = component.find(".todoTitle");
    expect(wrapper.length).toBe(1);
  });

  it("shoud handle clicking done", () => {
    const mockClick = jest.fn();
    const component = shallow(
      <Calendar year={2021} month={11} todos={stubTodos} clickDone={mockClick} />
    );
    const wrapper = component.find(".todoTitle.done");
    wrapper.simulate("click");
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});