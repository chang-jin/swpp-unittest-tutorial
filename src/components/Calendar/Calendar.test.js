import React, { Component } from 'react';
import { Table } from 'semantic-ui-react';
import Calendar from "./Calendar";
import { shallow } from "enzyme";

const data = {
    year: 2021,
    month: 10,
    todos: ["first", "second"],
    clickDone: (id) => {}
}

describe('<Calendar />', () => {
    let calendar;
    // beforeEach(()=>{
    //     ;
    // });
    
    it('should be rendered properly', ()=>{
        calendar = shallow(<Calendar />);
        const wrapper = calendar.find('Table');
        expect(wrapper.length).toBe(1);

    });

    it('should render body properly', () => {
        calendar = shallow(<Calendar year={2021} month={10} clickDone={true} todos={[{year:2021, month:10, date:1, done:true, id:1}]}/>);
        const wrapper = calendar.find('Table');
        expect(wrapper.length).toBe(1);
        const title = calendar.find('.date div');
        expect(title.length).toBe(0);
    });
});