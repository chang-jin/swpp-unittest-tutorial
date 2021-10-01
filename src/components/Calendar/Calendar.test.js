import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';

const stubTodos = [
  {
    id: 1,
    title: "TODO_TEST_TITLE_1",
    done: false,
    year: 2021,
    month: 8,
    date: 1,
  },
  {
    id: 2,
    title: "TODO_TEST_TITLE_2",
    done: false,
    year: 2021,
    month: 9,
    date: 15,
  },
  {
    id: 3,
    title: "TODO_TEST_TITLE_3",
    done: true,
    year: 2021,
    month: 8,
    date: 30,
  },
];

describe("<Calendar >", () => {
    it ("should render calender without error", () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find("Table");
        expect(wrapper.length).toBe(1);
    });

    it ("should make set values properly", () => {
        const component = shallow(
            <Calendar year={2021} month={9} todos={stubTodos} />
        )
        const wrapper = component.find('.date');
        expect(wrapper.length).toBe(30);
    });

    it ('should show tasks properly', () =>{
      const component = shallow(
        <Calendar year={2021} month={9} todos = {stubTodos} />
      );
      const wrapper = component.find(".todoTitle");
      expect(wrapper.length).toBe(2);
    });

    it ("should handle clicking button", () => {
      const mockClick = jest.fn();
      const component = shallow(
        <Calendar year={2021} month={9} todos ={stubTodos} clickDone={mockClick} />
      );
      const wrapper = component.find(".todoTitle.done");
      wrapper.simulate("click");
      expect(mockClick).toHaveBeenCalledTimes(1);
    });
});
