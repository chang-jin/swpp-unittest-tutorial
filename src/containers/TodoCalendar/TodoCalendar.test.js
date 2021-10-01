import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoList from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';
import TodoCalendar from './TodoCalendar';

// jest.mock('../../components/Calendar/Calendar', () => {
//     return jest.fn(props => {
//         return (
//             <div className="spyCalendar">
                
//             </div>
//         )
//     })
// })

const stubInitialState = {
    todos: [
        {
            id: 0,
            title: "TODO_TITLE_1",
            content: "TODO_CONTENT_1",
            year: 2021,
            month: 10,
            date: 1,
            done: true
        },
        {
          id: 1,
            title: "TODO_TITLE_2",
            content: "TODO_CONTENT_2",
            year: 2021,
            month: 10,
            date: 2,
            done: true
        }
    ],
    selectedTodo: null,
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoCalendar />', () => {
    let todoCalendar, spyGetTodos, spyToggleTodo;

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
    });

    it(`should render Todos`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.TodoCalendar');
        expect(wrapper.length).toBe(1);
    });

    it(`should call 'handleClickPrev'`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('TodoCalendar');
        const header = component.find('.header');
        const button = header.find('button').at(0);

        let year = wrapper.state().year;
        let month = wrapper.state().month;

        button.simulate('click');

        if (month === 1) {
            expect(wrapper.state().year).toBe(year - 1);
            expect(wrapper.state().month).toBe(12);
        } else {
            expect(wrapper.state().month).toBe(month - 1);
        }

        for (let i = 0; i < 11; i++) {
            button.simulate('click');
        }
        expect(wrapper.state().year).toBe(year - 1);
    });

    it(`should call 'handleClickNext'`, () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('TodoCalendar');
        const header = component.find('.header');
        const button = header.find('button').at(1);

        let year = wrapper.state().year;
        let month = wrapper.state().month;
        
        button.simulate('click');

        if (month === 12) {
            expect(wrapper.state().year).toBe(year + 1);
            expect(wrapper.state().month).toBe(1);
        } else {
            expect(wrapper.state().month).toBe(month + 1);
        }

        for (let i = 0; i < 11; i++) {
            button.simulate('click');
        }
        expect(wrapper.state().year).toBe(year + 1);
    })

})