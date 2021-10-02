import React from 'react';
import { mount, shallow } from 'enzyme';
import { Table } from 'semantic-ui-react';

import Calendar from './Calendar';

const stubTodos = [
  {
    id: 1,
    title: 'title 1',
    done: true,
    date: 15,
    month: 8,
    year: 2021,
  },
  {
    id: 2,
    title: 'title 2',
    done: false,
    date: 14,
    month: 7,
    year: 2021,
  },
  {
    id: 3,
    title: 'title 3',
    done: false,
    date: 5,
    month: 8,
    year: 2021,
  },
];

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    expect(component.findWhere((n) => n.type() === Table)).toHaveLength(1);
  });

  it('should be rendered as table', () => {
    // 2021-09 has 30 dates
    const component = shallow(<Calendar year={2021} month={9} todos={[]} />);
    expect(component.findWhere((n) => n.type() === Table)).toHaveLength(1);
    expect(component.findWhere((n) => n.type() === Table.Row)).toHaveLength(6);
    expect(component.findWhere((n) => n.type() === Table.HeaderCell)).toHaveLength(7);
    expect(component.findWhere((n) => n.type() === Table.Cell)).toHaveLength(35);
  });

  it('should render sundays as sundays', () => {
    const component = mount(<Calendar year={2021} month={9} todos={[]} />);
    const wrapper = component.findWhere((n) => n.type() === Table.Cell);
    const sundays = wrapper.find('TableCell.sunday').map((n) => n.text());
    expect(sundays).toHaveLength(5);
    expect(sundays).toEqual(expect.arrayContaining(['Sun', '5', '12', '19', '26']));
  });

  it('should render todos', () => {
    const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
    const wrapper = component.findWhere(
      (n) => n.type() === Table.Cell && n.exists('.todoTitle')
    );
    expect(wrapper).toHaveLength(2);
    expect(wrapper.at(0).find('.date').text()).toBe('5');
    expect(wrapper.at(0).find('.todoTitle').text()).toBe('title 3');
    expect(wrapper.at(1).find('.date').text()).toBe('15');
    expect(wrapper.at(1).find('.todoTitle').text()).toBe('title 1');
  });

  it('should render todos with correct state', () => {
    const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
    const wrapper = component.find('.todoTitle');
    expect(wrapper).toHaveLength(2);
    expect(wrapper.at(0).hasClass('notdone')).toBe(true);
    expect(wrapper.at(0).hasClass('done')).toBe(false);
    expect(wrapper.at(1).hasClass('notdone')).toBe(false);
    expect(wrapper.at(1).hasClass('done')).toBe(true);
  });

  it('should handle todo clicks', () => {
    const mockClickDone = jest.fn();
    const component = shallow(
      <Calendar year={2021} month={8} todos={stubTodos} clickDone={mockClickDone} />
    );
    const wrapper = component.find('.todoTitle');
    expect(wrapper).toHaveLength(1);
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
});
