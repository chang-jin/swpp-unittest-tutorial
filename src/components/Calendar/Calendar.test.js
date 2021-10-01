import React from "react";
import Calendar from "./Calendar";
import { shallow } from "enzyme";

describe("Calendar Unit Test", () => {
  it(`should render without errors `, () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find("Table");
    expect(wrapper.length).toBe(1);
  });

  it("should do something when button click", () => {
    const todos = [
      {
        id: 0,
        title: "test",
        done: true,
        year: 2021,
        month: 8,
        date: 28,
      },
    ];
    const mockClickDone = jest.fn();
    const component = shallow(
      <Calendar year={2021} month={9} todos={todos} clickDone={mockClickDone} />
    );
    const wrapper = component.find(".todoTitle");
    wrapper.simulate("click");
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });

  it("should do something when todo false", () => {
    const todos = [
      {
        id: 0,
        title: "test",
        done: false,
        year: 2021,
        month: 9,
        date: 1,
      },
    ];
    const mockClickDone = jest.fn();
    const component = shallow(
      <Calendar
        year={2021}
        month={10}
        todos={todos}
        clickDone={mockClickDone}
      />
    );
    let wrapper = component.find(".notdone");
    expect(wrapper.length).toBe(1);
    wrapper = component.find(".cell");
    expect(wrapper.length).toBe(30);
  });
});
