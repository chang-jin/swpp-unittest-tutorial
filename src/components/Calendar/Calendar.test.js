import React from 'react';
import { shallow } from 'enzyme';
import Calendar from "./Calendar";

const stubstate = {
    todos: [{id: 1, title: 'TODO_TEST_TITLE_1', done: false, year:2021, month:9, date:14},
        {id: 2, title: 'TODO_TEST_TITLE_2', done: true, year:2021, month:9, date:13}],
    year: "2021",
    month: "10"
}

describe('<Calendar/>', ()=>{
    it('should render all the dates without errors', ()=>{
        const component = shallow(<Calendar year={stubstate.year} month={stubstate.month} todos={stubstate.todos} />);
        const wrapper = component.find(".date");
        expect(wrapper.length).toBe(30);
    })

    it('should render not done todos correctly', ()=>{
        const component = shallow(<Calendar year={stubstate.year} month={stubstate.month} todos={stubstate.todos} />);
        const wrapper = component.find('.todoTitle_notdone');
        expect(wrapper.length).toBe(1);
    })

    it('should render done todos correctly', ()=>{
        const component = shallow(<Calendar year={stubstate.year} month={stubstate.month} todos={stubstate.todos} />);
        const wrapper = component.find('.todoTitle_done');
        expect(wrapper.length).toBe(1);
    })
});