import React from 'react';
import { shallow, mount } from 'enzyme';
import Calendar from './Calendar';

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = mount(<Calendar  month = {10} year = {2020} todos = {[{year: 2020, month: 10, date: 10, id: 1, done: true, title:test}]}/>);
    const wrapper = component.find('.sunday');
    expect(wrapper.length).toBeGreaterThan(0);
  });

});
