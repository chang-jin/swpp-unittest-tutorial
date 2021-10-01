import React from 'react';
 import { Provider } from 'react-redux';
 import { ConnectedRouter } from 'connected-react-router';
 import { Route, Switch } from 'react-router-dom';
 import { mount } from 'enzyme';
 import { getMockStore } from '../../test-utils/mocks';
 import TodoCalendar from './TodoCalendar';
 import { history } from '../../store/store';
 import * as actionCreators from '../../store/actions/todo';

 const stubInitialState = {
   todos: [
     {
       id: 1,
       title: 'TEST_TITLE_1',
       done: false,
       year: 2021,
       month: 9,
       date: 30,
     },
     {
       id: 2,
       title: 'TEST_TITLE_2',
       done: false,
       year: 2021,
       month: 10,
       date: 1,
     },
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
             <Route path='/' exact component={TodoCalendar} />
           </Switch>
         </ConnectedRouter>
       </Provider>
     );
     spyGetTodos = jest
       .spyOn(actionCreators, 'getTodos')
       .mockImplementation(() => {
         return (dispatch) => {};
       });
   });

   it('should render TodoCalendar', () => {
     const component = mount(todoCalendar);
     const wrapper = component.find('.todoCalendar');
     expect(wrapper.length).toBe(1);
     expect(spyGetTodos).toBeCalledTimes(1);
   });

   it('should set state properly on year & month with prev button', () => {
     const component = mount(todoCalendar);
     const wrapper = component.find('.previous');
     for (let i = 0; i < 9; i++) wrapper.simulate('click');
     const newTodoCalendarInstance = component
       .find(TodoCalendar.WrappedComponent)
       .instance();
     expect(newTodoCalendarInstance.state.year).toBe(2020);
     expect(newTodoCalendarInstance.state.month).toBe(12);
   });

   it('should set state properly on year & month with next button', () => {
     const component = mount(todoCalendar);
     const wrapper = component.find('.next');
     for (let i = 0; i < 4; i++) wrapper.simulate('click');
     const newTodoCalendarInstance = component
       .find(TodoCalendar.WrappedComponent)
       .instance();
     expect(newTodoCalendarInstance.state.year).toBe(2022);
     expect(newTodoCalendarInstance.state.month).toBe(1);
   });
 });