import React from "react";
import { shallow } from "enzyme";
import Calendar from "./Calendar";

const stubTodos = [
  {id: 1, title: "TEST_TITLE_1", done: true, year: 2021, month: 10, date: 29},
  {id: 2, title: "TEST_TITLE_2", done: false, year: 2021, month: 11, date: 30},
  {id: 3, title: "TEST_TITLE_3", done: false, year: 2022, month: 1, date: 16}
];

describe("<Calendar />", () => {
  it("should render calendar without errors", () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(".Calendar");
    expect(wrapper.length).toBe(1);
  });

  it("should set dates based on year and month", () => {
    const component = shallow(
      <Calendar year={2021} month={10} todos={stubTodos} />
    );
    const wrapper = component.find(".date");
    expect(wrapper.length).toBe(30);
  });

  it("should show tasks in the month set", () => {
    const component = shallow(
      <Calendar year={2021} month={10} todos={stubTodos} />
    );
    const wrapper = component.find(".todoTitle");
    expect(wrapper.length).toBe(1);
  });

  it("shoud handle done clicks", () => {
    const mockClick = jest.fn();
    const component = shallow(
      <Calendar year={2021} month={10} todos={stubTodos} clickDone={mockClick} />
    );
    const wrapper = component.find(".todoTitle.done");
    expect(wrapper.length).toBe(1);
    wrapper.simulate("click");
    expect(mockClick).toHaveBeenCalledTimes(1);
  });
});