import React from "react";
import { shallow, mount } from "enzyme";
import Calendar from "./Calendar";

const stubTodos = [
  {
    id: 1,
    title: "TEST_TITLE_1",
    content: "TEST_CONTENT_1",
    done: true,
    year: 1996,
    month: 4,
    date: 17,
  },
  {
    id: 2,
    title: "TEST_TITLE_2",
    content: "TEST_CONTENT_2",
    done: false,
    year: 2021,
    month: 10,
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
    const component = shallow(<Calendar year={1996} month={4} todos={stubTodos} />);
    const wrapper = component.find(".date");
    expect(wrapper.length).toBe(30);
  });

  it("should render todos", () => {
    const component = shallow(<Calendar year={1996} month={4} todos={stubTodos} />);
    const wrapper = component.find(".todoTitle");
    expect(wrapper.length).toBe(2);
  });

  it("should handle clickDone", () => {
    const mockClickDone = jest.fn();
    const component = shallow(
      <Calendar year={1996} month={4} todos={stubTodos} clickDone={mockClickDone} />
    );
    let wrapper = component.find(".todoTitle.done");
    wrapper.simulate("click");
    wrapper = component.find(".todoTitle.notdone");
    wrapper.simulate("click");
    expect(mockClickDone).toHaveBeenCalledTimes(2);
  });
});
