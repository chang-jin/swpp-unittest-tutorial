import React from 'react';
import { mount, shallow } from 'enzyme';
import * as actionCreators from '../../store/actions/todo';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import { ConnectedRouter } from 'connected-react-router';
import { Switch, Route } from 'react-router-dom';
import TodoCalendar from './TodoCalendar';
import { Provider } from 'react-redux';
import Calendar from '../../components/Calendar/Calendar';
import { Table } from 'semantic-ui-react';

jest.mock('../../components/Calendar/Calendar', () => {
    return jest.fn(props => {
        return (
            <div className="spyCalendar">
                <button className="spyTodo" onClick={props.clickDone} />
            </div>
        )
    })
})

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
    let todoCalender;

    beforeEach(() => {
        todoCalender = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                    <Switch>
                    <Route path='/' exact component={TodoCalendar} />
                    </Switch>
                </ConnectedRouter>
            </Provider>
        );
    });

    it('should render Calendar', () => {
        const component = mount(todoCalender);
        const wrapper = component.find('.spyCalendar');

        expect(wrapper.length).toBe(1);
    });

    it('should handle click prev without error', () => {
        const component = mount(todoCalender);
        const wrapper = component.find('button');
        wrapper.at(0).simulate('click');
        const todoCalenderInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalenderInstance.state.month).toBe(8);
        expect(todoCalenderInstance.state.year).toBe(2021);

        for(let i = 0; i < 8; i++) {
            wrapper.at(0).simulate('click');
        }
        expect(todoCalenderInstance.state.month).toBe(12);
        expect(todoCalenderInstance.state.year).toBe(2020);
    });

    it('should handle click next without error', () => {
        const component = mount(todoCalender);
        const wrapper = component.find('button');
        wrapper.at(1).simulate('click');
        const todoCalenderInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalenderInstance.state.month).toBe(10);
        expect(todoCalenderInstance.state.year).toBe(2021);

        for(let i = 0; i < 3; i++) {
            wrapper.at(1).simulate('click');
        }
        expect(todoCalenderInstance.state.month).toBe(1);
        expect(todoCalenderInstance.state.year).toBe(2022);
    });

    it('should call getTodos', () => {
        const spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
            .mockImplementation(id => {return dispatch => {}; });
        const component = mount(todoCalender);
        expect(spyGetTodos).toBeCalledTimes(1);
    });

    it('should pass toggleTodo to child component', () => {
        const spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
            .mockImplementation(id => { return dispatch => {}; });
        const component = mount(todoCalender);
        const wrapper = component.find('.spyCalendar .spyTodo');
        wrapper.simulate('click');
        expect(spyToggleTodo).toBeCalledTimes(1);
    })
});