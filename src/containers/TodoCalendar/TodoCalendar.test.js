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

const mockCalendar = <Table className="spyCalendar" clickDone={() => {}}/>

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

    beforeAll(() => {
        jest.mock('../../components/Calendar/Calendar', () => ({
            default: mockCalendar
        }));
    })

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
        const wrapper = component.find('Table');

        expect(wrapper.length).toBe(1);
    })
    it('should handle click prev without error', () => {
        const component = mount(todoCalender);
        const wrapper = component.find('button');
        wrapper.at(0).simulate('click');

        const todoCalenderInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalenderInstance.state.month).toBe(8);
        expect(todoCalenderInstance.state.year).toBe(2021);
    });

    it('should handle click next without error', () => {
        const component = mount(todoCalender);
        const wrapper = component.find('button');
        wrapper.at(1).simulate('click');

        const todoCalenderInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(todoCalenderInstance.state.month).toBe(10);
        expect(todoCalenderInstance.state.year).toBe(2021);
    });

    it('should call getTodos', () => {
        const spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
            .mockImplementation(id => {return dispatch => {}; });
        const component = mount(todoCalender);
        expect(spyGetTodos).toBeCalledTimes(1);
    });

    it('should pass toggleTodo to child component', () => {
        const spyOnToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
            .mockImplementation(id => {return dispatch => {}; });
        const component = mount(todoCalender);
        const wrapper = component.find(Calendar);

        //expect(wrapper).toHaveProperty('props.');
        //console.log(component.debug());
    })
});