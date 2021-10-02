import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';

const todos = [
    { id: 1, title: 'TEST_TITLE', content: 'TEST_CONTENT', year: 2021, month: 10, date: 4, done: false, }, 
]

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('Table');
    expect(wrapper.length).toBe(1);
  });

  it('should render calender shape of specific year & month', () => {
    const component = mount(<Calendar year={2021} month={10} todos={[]}/>);
    const wrapper = component.find('td');
    expect(wrapper.length).toBe(35);
  });

  it('should render todos on Calendar', () => {
      const component = mount(<Calendar year={2021} month={10} todos={todos} />);
      const wrapper = component.find('div[className="todoTitle notdone"]');
      expect(wrapper.text()).toBe('TEST_TITLE');
  })

  it('should handle clicks', () => {
      const mockClickDone = jest.fn();
      const component = mount(<Calendar year={2021} month={10} todos={todos} clickDone={mockClickDone} />);
      const wrapper = component.find('div[className="todoTitle notdone"]');
      console.log(wrapper.debug());
  })
  
/*
  it('should render title as done if done=true', () => {
    const component = shallow(<Todo done={true} title={'TEST_TITLE'} />);
    const wrapper = component.find('.done');
    expect(wrapper.text()).toEqual('TEST_TITLE');
  });

  it('should handle clicks', () => {
    const mockClickDone = jest.fn();
    const component = shallow(<Todo clickDone={mockClickDone} />);
    const wrapper = component.find('.doneButton');
    wrapper.simulate('click');
    expect(mockClickDone).toHaveBeenCalledTimes(1);
  });
  */
});
