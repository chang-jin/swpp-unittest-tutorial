import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

const stubInitialState = [
    {
        id: 0,
        title: "TODO_TITLE_1",
        content: "TODO_CONTENT_1",
        year: 2021,
        month: 10,
        date: 1,
        done: true
    },
    {
      id: 1,
        title: "TODO_TITLE_2",
        content: "TODO_CONTENT_2",
        year: 2021,
        month: 10,
        date: 2,
        done: true
    }
];

describe('<Calendar />', () => {
    it('should render without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('Table');
        expect(wrapper.length).toBe(1);
      });

      it('should render todo', () => {
        const component = shallow(<Calendar year={2021} month={10} todos={stubInitialState}/>)
          const wrapper = component.find('TableBody');
        expect(wrapper.length).toBe(1);
      })
})