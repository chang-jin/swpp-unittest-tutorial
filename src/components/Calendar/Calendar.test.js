import React from 'react';
import Calendar from './Calendar';
import { shallow } from 'enzyme';

const stubTodos = [
  {
    id: 1,
    title: '1',
    content: '1',
    done: false,
    year: 2021,
    month: 8,
    date: 2,
  },
  {
    id: 2,
    title: '2',
    content: '2',
    done: false,
    year: 2021,
    month: 8,
    date: 2,
  },
  {
    id: 3,
    title: '3',
    content: '3',
    done: true,
    year: 2021,
    month: 8,
    date: 2,
  },
];

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.calendar');
    expect(wrapper.length).toBe(1);
  });

  it('should render correctly with given date', () => {
    const component = shallow(
      <Calendar year='2021' month='9' todos={stubTodos} />
    );
    const wrapper = component.find('.cell');
    expect(wrapper.length).toBe(30);
  });

  it('should get all todos', () => {
    const component = shallow(
      <Calendar year='2021' month='9' todos={stubTodos} />
    );
    const wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(3);
  });

  it('should handle ClickDone', () => {
    const mockClickDone = jest.fn();
    const component = shallow(
      <Calendar
        year='2021'
        month='9'
        todos={stubTodos}
        clickDone={mockClickDone}
      />
    );
    const wrapper = component.find('.todoTitle.done');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});
