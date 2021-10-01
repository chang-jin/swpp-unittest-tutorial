import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('<Calendar />', () => {

  it('should render without error', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.sunday');
    expect(wrapper.length).toBe(1);
  })

  it('should show todo in date correctly', () => {
    /*
    year={this.state.year}
    month={this.state.month}
    todos={this.props.storedTodos}
    clickDone={this.props.onToggleTodo}

    id: action.id,
    title: action.title,
    content: action.content,
    year: action.year,
    month: action.month,
    date: action.date,
    done: action.done,
    */
    const test_todos_1 = [
      {
        id: 0,
        title: 'TEST_TITLE',
        content: 'TEST_CONTENT',
        year: 2021,
        month: 7,
        date: 1,
        done: false,
      }
    ]
    const mockClickDone = jest.fn();
    const component = shallow(<Calendar year={2021} month={9} todos={test_todos_1} clickDone={mockClickDone} />);
    const wrapper = component.find('.todoTitle');
    expect(wrapper.length).toBe(0);

  })
  
})