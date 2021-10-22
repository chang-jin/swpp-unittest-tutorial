import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import TodoCalendar from "./TodoCalendar";
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
        return (
            <div className="spyTodo">
                <div className="title">
                    {props.todos[0].title}
                </div>
            </div>);
    });
});

const stubInitialState = {
    todos: [
        {id: 1, title: 'TODO_TEST_TITLE_1', done: false},
        {id: 2, title: 'TODO_TEST_TITLE_2', done: false},
        {id: 3, title: 'TODO_TEST_TITLE_3', done: false},
    ],
    selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
    let todoCalendar, spyGetTodos;

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
        spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
            .mockImplementation(() => { return dispatch => {}; });
    })

    it('should render Calendars', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.spyTodo');
        expect(wrapper.length).toBe(1);
        const wrapper2 = component.find('.title');
        expect(wrapper2.text()).toBe('TODO_TEST_TITLE_1')
        expect(spyGetTodos).toBeCalledTimes(1);
    });

    it(`should call 'handleClickPrev'`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.header button').at(0);
        wrapper.simulate('click');
        const newCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newCalendarInstance.state.month).toBe(8);
    });

    it(`bound action correctness for 'handleClickPrev'`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.header button').at(0);
        for (let i = 0; i < 9; i++) wrapper.simulate('click');
        const newCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newCalendarInstance.state.year).toBe(2020);
    });

    it(`should call 'handleClickNext'`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.header button').at(1);
        wrapper.simulate('click');
        const newCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newCalendarInstance.state.month).toBe(10);
    });

    it(`bound action correctness for 'handleClickNext'`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.header button').at(1);
        for (let i = 0; i < 4; i++) wrapper.simulate('click');
        const newCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newCalendarInstance.state.month).toBe(2022);
    });
});