import React from "react";
import { shallow, mount } from "enzyme";
import Calendar from "./Calendar";

const stubTodos = [
  {
    id: 1,
    title: "TEST_TITLE_1",
    content: "TEST_CONTENT_1",
    done: true,
    year: 2021,
    month: 9,
    date: 1,
  },
  {
    id: 2,
    title: "TEST_TITLE_2",
    content: "TEST_CONTENT_2",
    done: false,
    year: 2021,
    month: 9,
    date: 2,
  },
];

describe("<Calender />", () => {
  it("should render Calender", () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(".Calendar");
    expect(wrapper.length).toBe(1);
  });

  it("should render Date correctly", () => {
    const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
    const wrapper = component.find(".date");
    expect(wrapper.length).toBe(30);
  });

  it("should render todos", () => {
    const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
    const wrapper = component.find(".todoTitle");
    expect(wrapper.length).toBe(2);
  });

  it("should handle clickDone", () => {
    const mockClickDone = jest.fn();
    const component = shallow(
      <Calendar year={2021} month={9} todos={stubTodos} clickDone={mockClickDone} />
    );
    let wrapper = component.find(".todoTitle.done");
    expect(wrapper.length).toBe(1);
    wrapper.simulate("click");
    wrapper = component.find(".todoTitle.notdone");
    expect(wrapper.length).toBe(1);
    wrapper.simulate("click");
    expect(mockClickDone).toHaveBeenCalledTimes(2);
  });
});
