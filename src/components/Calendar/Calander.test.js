import React from 'react';
import { shallow } from 'enzyme';
import Calendar from './Calendar';

describe('<Calendar />', () => {
    it('should render without errors', () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find('.Calendar');
        expect(wrapper.length).toBe(1);
    });

    it('should render todo correctly', () => {
        const component = shallow(<Calendar year={2020} month={10} todos={[{id : 100, year : 2020, month : 10, date : 28, title : 'TEST_TITLE', done : true}]}/>);
        let wrapper = component.find('.todoTitle done');
        expect(wrapper.length).toBe(1);
        expect(wrapper.text()).toEqual('TEST_TITLE');
    });
});
