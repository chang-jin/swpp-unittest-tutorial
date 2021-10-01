import React from 'react';
import { mount } from 'enzyme';
import { Provider } from 'react-redux';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Switch } from 'react-router-dom';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';

import TodoCalendar from './TodoCalendar';

const stubTodoCalendar = {
    year: 2021,
    month: 10,
    todos: [
        {id: 1, year: 2021, month: 10, date: 1, done: true},
        {id: 2, year: 2021, month: 10, date: 1, done: true},
        {id: 3, year: 2021, month: 10, date: 1, done: true}
    ]
};

const mockStore = getMockStore(stubTodoCalendar);

describe('<TodoCalendar />', () => {
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
    });

    it('should handle ClickPrev', () => {
        const component = mount(todoCalendar);
        const header = component.find('.header');
        const clickPrev = header.find('button').at(0);
        clickPrev.simulate('click');
        const prevMonth = component.find(TodoCalendar.WrappedComponent).instance();
        expect(prevMonth.state.month).toBe(stubTodoCalendar.month - 1);
    });

    it('should handle year change', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('TodoCalendar');
        const header = component.find('.header');
        const clickPrev = header.find('button').at(0);
        clickPrev.simulate('click');
        for (let i = 0; i < 10; i++) {
            clickPrev.simulate('click')
        }
        expect(wrapper.state().year).toBe(wrapper.state().year - 1);
    });    

    it('should handle ClickNext', () => {
        const component = mount(todoCalendar);
        const header = component.find('.header');
        const clickNext = header.find('button').at(1);
        clickNext.simulate('click');
        const nextMonth = component.find(TodoCalendar.WrappedComponent).instance();
        expect(nextMonth.state.month).toBe(stubTodoCalendar.month + 1);
    });

    it('should render TodoCalendar', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find(".todoCalendar");
        expect(wrapper.length).toBe(1);
    });
});