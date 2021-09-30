import React from 'react';
import Calendar from './Calendar';
import { shallow } from 'enzyme';
import { exportAllDeclaration } from '@babel/types';

describe('<Calendar />', () => {
  it('should render without errors', () => {
    const component = shallow(<Calendar />);
    const wrapper = component.find('.callendar');
    exportAllDeclaration(wrapper.length).toBe(1);
  });
});
