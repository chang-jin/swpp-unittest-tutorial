import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

const stubInitialState = {
  year: 2021,
  month: 10,
  todos: [
      {
        content: "take swpp class",
        date: 1,
        done: false,
        id: 8,
        month: 9,
        title: "SWPP",
        year: 2021
      },
      {
        content: "Watch Movie",
        date: 1,
        done: true,
        id: 9,
        month: 9,
        title: "Movie",
        year: 2021,
      },
      {
        content: "eat dinner",
        date: 1,
        done: true,
        id: 12,
        month: 9,
        title: "Dinner",
        year: 2021,
      }
    ]
        
}

describe('Calendar', () => {
  it('should render Calendar w/o error', () => {    
    const component = shallow(<Calendar />);
    const wrapper = component.find('Table');
    expect(wrapper.length).toBe(1);
  });
  it('should make correct dates', () => {
    const mockClickDone = jest.fn();
    const stubTodos = [...stubInitialState.todos]
    const component = shallow(<Calendar year={stubInitialState.year} month={stubInitialState.month} todos={stubTodos} clickDone={mockClickDone} />);
    const wrapper = component.find('.date');
    expect(wrapper.length).toEqual(30);
  });
  // it('should make correct todo at calendar', () => {
  //  const mockClickDone = jest.fn();
  //   const stubTodos = [stubInitialState.todos[0]] // start from notdone
  //   const component = shallow(<Calendar year={stubInitialState.year} month={stubInitialState.month} todos={stubTodos} clickDone={mockClickDone} />);
  //   const wrapper = component.find('TableCell div.todoTitle.notdone');
  //   console.log(wrapper.debug());
  // })
  it('should handle "clickDone" at notdone todo', () => {
    const mockClickDone = jest.fn();
    const stubTodos = [stubInitialState.todos[0]] // start from notdone
    const component = shallow(<Calendar year={stubInitialState.year} month={stubInitialState.month} todos={stubTodos} clickDone={mockClickDone} />);
    const wrapper = component.find('.todoTitle.notdone');
    wrapper.simulate('click')
    expect(mockClickDone).toHaveBeenCalledTimes(1)
  })
  it('should handle "clickDone" at done todo', () => {
    const mockClickDone = jest.fn();
    const stubTodos = [stubInitialState.todos[1]] // start from done
    const component = shallow(<Calendar year={stubInitialState.year} month={stubInitialState.month} todos={stubTodos} clickDone={mockClickDone} />);
    const wrapper = component.find('.todoTitle.done');
    wrapper.simulate('click')
    expect(mockClickDone).toHaveBeenCalledTimes(1)
  })

});