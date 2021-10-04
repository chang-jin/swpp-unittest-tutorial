import React from 'react';
import { shallow, mount } from 'enzyme';
import { Provider } from 'react-redux';
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import TodoCalendar from './TodoCalendar';
import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';


jest.mock('../../components/Calendar/Calendar', ()=>{
    return jest.fn(props => {
        return (
            <div className="spyCalendar">
            </div>
        )
    })
})

const stubInitialState = {
    todos:[{id:1, year:2021, month:10, done:true}],
    selectedTodo: null
};

const mockStore = getMockStore(stubInitialState);



describe('<TodoCalendar />', () => {
    let todoCalendar;

    beforeEach(()=>{
        todoCalendar = (
            <Provider store={mockStore}>
                <ConnectedRouter history={history}>
                <Switch>
                    <Route path='/' render={()=> <TodoCalendar />}/>
                </Switch>
                </ ConnectedRouter>
            </Provider>
        );
    })

    it('should be rendered properly', ()=>{
        const component = mount(todoCalendar);
        const wrapper = component.find(".header");
        expect(wrapper.length).toBe(1);
    });
   
    it('should render calendar', () => {
        const component = mount(todoCalendar);
        const wrapper = component.find('.spyCalendar');
        expect(wrapper.length).toBe(1);
    });

    it('should handle click', ()=>{
        const component = mount(todoCalendar);
        const buttons = component.find('.header button');
        expect(buttons.length).toBe(2);
        let newCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newCalendarInstance.state.month).toEqual(9);
        buttons.at(0).simulate('click');
        newCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newCalendarInstance.state.month).toEqual(8);
        buttons.at(1).simulate('click');
        newCalendarInstance = component.find(TodoCalendar.WrappedComponent).instance();
        expect(newCalendarInstance.state.month).toEqual(9);
    })

});