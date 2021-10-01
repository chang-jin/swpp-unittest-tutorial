import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';
import { Table } from 'semantic-ui-react';

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.sunday');
    expect(wrapper.length).toBe(1);
  });

  it('should render with year, month, and date', () => {
    const todos = [
      {
        id: 1,
        title: 'TEST_TITLE',
        content: 'TEST_CONTENT',
        done: true,
        year: 2021,
        month: 9,
        date: 30
      }
    ]
    const Done = jest.fn()
    const component = shallow(<Calendar year={2021} month={10} todos={todos} date={1} clickDone={Done} />);
    let day = component.find('.cell');
    expect(day.length).toBe(30);
  });

});