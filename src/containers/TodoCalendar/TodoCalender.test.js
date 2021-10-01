import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

const stubInitialState = [
    {
        id: 1,
        title: "picnic",
        content: 'content1',
        done: true,
        year: 2021,
        month: 10,
        date: 1,
    },
    {
        id: 2,
        title: "movie",
        content: 'watch movie',
        done: false,
        year: 2021,
        month: 10,
        date: 1,
    },
    {
        id: 3,
        title: "sleep",
        content: 'good',
        done: true,
        year: 2021,
        month: 10,
        date: 1,
    },
];
  
const mockStore = getMockStore(stubInitialState);
  
describe('<TodoCalendar />', () => {
    let calendar, spyGetTodos, spyToggleTodo;
    beforeEach(() => {
        calendar = (
        <Provider store={mockStore}>
            <ConnectedRouter history={history}>
            <Switch>
                <Route path="/" exact component={TodoCalendar} />
            </Switch>
            </ConnectedRouter>
        </Provider>
        );
        spyToggleTodo = jest
            .spyOn(actionCreators, "toggleTodo")
            .mockImplementation((id) => {
                return (dispatch) => {};
            });
        spyGetTodos = jest
            .spyOn(actionCreators, "getTodos")
            .mockImplementation(() => {
                return (dispatch) => {};
            });
    });

    it("should render calendar without errors", () => {
        const component = mount(calendar);
        const wrapper = component.find(".todoCalendar");
        expect(wrapper.length).toBe(1);
    });

    it("should get todos without errors", () => {
        const component = mount(calendar);
        expect(spyGetTodos).toHaveBeenCalledTimes(2);
    });

    it("should make prev button work without errors", () => {
        const component = mount(calendar);
        const wrapper = component.find(".prevButton");
        wrapper.simulate("click");
        const newMonth = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newMonth.state.month).toBe(8);
    });

    it("should make next button work without errors", () => {
        const component = mount(calendar);
        const wrapper = component.find(".nextButton");
        wrapper.simulate("click");
        const newMonth = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newMonth.state.month).toBe(10);
    });

    it("should make link work without errors", () => {
        const component = mount(calendar);
        const wrapper = component.find(".link");
        wrapper.simulate("click");
        expect(spyGetTodos).toHaveBeenCalledTimes(5);
    });

    it("should change year when month is over 12 without errors", () => {
        const component = mount(calendar);
        const wrapper = component.find(".nextButton");
        for (let i = 0; i < 12; i++) {
        wrapper.simulate("click");
        }
        const newYear = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newYear.state.year).toBe(2022);
    });

    it("should change year when month is under 1 without errors", () => {
        const component = mount(calendar);
        const wrapper = component.find(".prevButton");
        for (let i = 0; i < 12; i++) {
        wrapper.simulate("click");
        }
        const newYear = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newYear.state.year).toBe(2020);
    });
});