import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

const stubTodos = [
  {
    id: 1,
    title: "picnic",
    content: 'content1',
    done: true,
    year: 2021,
    month: 10,
    date: 1,
  },
  {
    id: 2,
    title: "movie",
    content: 'watch movie',
    done: false,
    year: 2021,
    month: 10,
    date: 1,
  },
  {
    id: 3,
    title: "sleep",
    content: 'good',
    done: true,
    year: 2021,
    month: 10,
    date: 1,
  },
];

describe('<Calendar />', () => {
  it('rendering test', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find(".calendar");
    expect(wrapper.length).toBe(1);
  });

  it('render with todos', () => {
    const component = shallow(<Calendar year={2021} month={9} todos={stubTodos} />);
    const wrapper = component.find(".cell");
    expect(wrapper.length).toBe(30);
  });

  it('render header', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find("Table");
    const header = wrapper.find("TableHeaderCell");
    expect(header.length).toBe(7);
  });
});