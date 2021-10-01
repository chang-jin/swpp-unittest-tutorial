import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

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
];

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.Calendar');
    expect(wrapper.length).toBe(1);
  });

  it('should render todo correctly', () => {
    const component = shallow(
      <Calendar year='2021' month='10' todos={stubTodos} />
    );
    const wrapper = component.find('.cell');
    expect(wrapper.length).toBe(10);
  });

  it('should get all todos', () => {
    const component = shallow(
      <Calendar year='2021' month='10' todos={stubTodos} />
    );
    const wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(1);
  });

  it('should handle ClickDone', () => {
    const mockClickDone = jest.fn();
    const component = shallow(
      <Calendar
        year='2021'
        month='10'
        todos={stubTodos}
        clickDone={mockClickDone}
      />
    );
    const wrapper = component.find('.todoTitle.done');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});