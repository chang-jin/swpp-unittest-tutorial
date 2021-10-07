import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';


import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

import TodoCalendar from "./TodoCalendar";
import TodoList from "../TodoList/TodoList";
import Calendar from "../../components/Calendar/Calendar";

jest.mock('../../components/Calendar/Calendar', ()=>{
    return jest.fn(props=>{
        return(
            <div className = "spyCalendr">

            </div>
        )
    })
})

const stubInitialState = {
    todos: [
        {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year:2021, month:9, date:14},
        {id: 2, title: 'TODO_TEST_TITLE_2', done: false, year:2021, month:9, date:12},
        {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year:2021, month:9, date:13},
    ],
    selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar/>', ()=>{
    let todoCalendar;

    beforeEach(() => {
        todoCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                        <Route path='/' exact
                               render={() => <TodoCalendar />} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    })

    it('should render Calendar', ()=>{
        const component = mount(todoCalendar);
        const wrapper = component.find(Calendar);
        expect(wrapper.length).toBe(1);
    })

    it('should handle Click Previous',()=>{
        const component = mount(todoCalendar)
        const wrapper = component.find("#PreviousButton");
        expect(wrapper.length).toBe(1);
        wrapper.simulate('click')

    })

    it('should handle Click Next',()=>{
        const component = mount(todoCalendar)
        const wrapper = component.find("#NextButton");
        expect(wrapper.length).toBe(1);
        wrapper.simulate('click')
    })

    it('should handle Click Next, from 12 to 1', ()=>{
        const component = mount(todoCalendar)
        const wrapper = component.find("#NextButton");
        expect(wrapper.length).toBe(1);
        for(let i=0; i<4; i++){
            wrapper.simulate('click');
        }
        //const wrapper2 = component.find(Calendar);

    })

    it('should handle Click Prev, from 1 to 12', ()=>{
        const component = mount(todoCalendar)
        const wrapper = component.find("#NextButton");
        expect(wrapper.length).toBe(1);
        for(let i=0; i<10; i++){
            wrapper.simulate('click');
        }
        /*
        const wrapper2 = component.find(TodoCalendar);
        expect(wrapper2.dive().state('year')).toBe(11);
        */
    })


})