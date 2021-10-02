import React from "react";
import { shallow } from "enzyme";
import Calendar from './Calendar';
import { Table } from "semantic-ui-react";
import Todo from "../Todo/Todo";

describe('Calender Test', () => {

    it("should render without errors", () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar year={2021} month={10} todos={[{id: 0,
            title: 'title 1',
            year: 2021,
            month: 10,
            date: 2,
            done: false
        }]} clickDone = {mockClickDone}/>);
        const wrapper = component.find('.sunday');
        //console.log(component.debug());
        expect(wrapper.length).toBe(5);

        const wrapper2 = component.find('TableBody[as="tbody"]');
        expect(wrapper2.length).toBe(1);

        const wrapper3 = component.find('TableRow[as="tr"]');
        expect(wrapper3.length).toBe(6);

        const wrapper4 = component.find('TableCell[as="td"]');
        expect(wrapper4.length).toBe(35);
    });

    it("should render without errors", () => {
        const mockClickDone = jest.fn();
        const component = shallow(<Calendar year={2021} month={10} todos={[{id: 0,
            title: 'title 2',
            year: 2021,
            month: 10,
            date: 2,
            done: false
        }]} clickDone = {mockClickDone}/>);
        //console.log(component.debug());
        const wrapper = component.find('.date');
        expect(wrapper.length).toBe(31);
    });

    it("should handle clicks", () => {
        const mockClickDone = jest.fn();
        const testDate = new Date(2021, 10, 2);
        const component = shallow(<Calendar year={2021} month={10} todos={[{id: 0,
            title: 'title 3',
            year: testDate.getFullYear(),
            month: testDate.getMonth(),
            date: testDate.getDate(),
            done: false
        }, {id: 1,
            title: 'title 4',
            year: testDate.getFullYear(),
            month: testDate.getMonth(),
            date: testDate.getDate(),
            done: true
        }]} clickDone={mockClickDone} />);
        //console.log(component.debug());
        const wrapper = component.find('div[className="todoTitle notdone"]');
        wrapper.simulate('click');
        expect(mockClickDone).toHaveBeenCalledTimes(1);
    })
    
})