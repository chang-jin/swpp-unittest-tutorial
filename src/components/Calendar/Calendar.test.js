import React from "react";
import { shallow } from "enzyme";
import Calendar from "./Calendar";

const stubTodos = [
  {
    id: 1,
    title: "TEST_TITLE1",
    content: "TEST_CONTENT1",
    done: false,
    year: 2021,
    month: 9,
    date: 30,
  },
  {
    id: 2,
    title: "TEST_TITLE2",
    content: "TEST_CONTENT2",
    done: true,
    year: 2021,
    month: 9,
    date: 30,
  },
];

describe("<Calendar/>", () => {
  it("should render without errors", () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(".calendar");
    expect(wrapper.length).toBe(1);
  });

  it("should render calendars withour errors", () => {
    const component = shallow(
      <Calendar year={2021} month={9} todos={stubTodos} />
    );
    const wrapper = component.find(".cell");
    expect(wrapper.length).toBe(30);
  });

  it("should render header without errors", () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find("Table");
    const headers = wrapper.find("TableHeaderCell");
    expect(headers.length).toBe(7);
  });
});
