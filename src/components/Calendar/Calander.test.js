import React from 'react';
import { shallow } from 'enzyme';
import Calendar from "./Calendar";

const todos = [{
    id: 1,
    title: "title",
    content: "content",
    done: true,
    year: 2021,
    month: 9,
    date: 1,
}];

describe("<Calendar />", () => {
    it("should render without errors", () => {
        const component = shallow(<Calendar />);
        const wrapper = component.find("Table");
        expect(wrapper.length).toBe(1);
    });

    it('should render with todos errors', () => {
        const component = shallow(<Calendar 
            year={2021}
            month={10}
            todos={todos} 
            />);
        const wrapper = component.find(".cell");
        expect(wrapper.length).toBe(30);
    });
});