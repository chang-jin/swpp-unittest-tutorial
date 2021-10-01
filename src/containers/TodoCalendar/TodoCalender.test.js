import React from 'react';
import TodoCalendar  from './TodoCalendar'
import { mount } from 'enzyme'
import { Provider } from 'react-redux'
import { connectRouter, ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, Switch } from 'react-router-dom';

import { getMockStore } from '../../test-utils/mocks';
import { history } from '../../store/store';
import * as actionCreators from '../../store/actions/todo';

// jest.resetModules();
// jest.doMock('../../components/Calendar/Calendar', () => {
//   let Table = require('semantic-ui-react')
//   return jest.fn( props => {
//     const dates = [];
//     const year = props.year;
//     const month = props.month - 1;
//     let date = 1;
//     let maxDate = (new Date(year, month + 1, 0)).getDate();

//     for (let date=1; date<=maxDate; date++) {
//       dates.push(new Date(year, month, date));
//     }

//     let i = 0;
//     const rows = [];
//     for (let week=0; week<5; week++){
//       let day = 0; // Sunday
//       let row = [];
//       for (let day=0; day<7; day++) {
//         const date = dates[i];
//         if (date !== undefined && day === date.getDay()) {
//           row.push(
//             <Table.Cell className={`cell ${day === 0 && 'sunday'}`} key={7*week+day}>
//               <div className="date">{date.getDate()}</div>
//               {
//                 props.todos.filter(todo => {
//                   return todo.year === date.getFullYear() &&
//                     todo.month === date.getMonth() &&
//                     todo.date === date.getDate();
//                 }).map(todo => {
//                   return (
//                     <div
//                       key={todo.id}
//                       className={`todoTitle ${todo.done ? 'done':'notdone'}`}
//                       onClick={() => props.clickDone(todo.id)}>
//                       {todo.title}
//                     </div>
//                   )
//                 })
//               }
//             </Table.Cell>
//         )
//         i++;
//       } else {
//         row.push(<Table.Cell key={7*week+day}> </Table.Cell>)
//       }
//     }
//     rows.push(row);
//     }
//     return (
//       <Table>
//         <Table.Header>
//           <Table.Row>
//           <Table.HeaderCell className="sunday">Sun</Table.HeaderCell>
//           <Table.HeaderCell>Mon</Table.HeaderCell>
//           <Table.HeaderCell>Tue</Table.HeaderCell>
//           <Table.HeaderCell>Wed</Table.HeaderCell>
//           <Table.HeaderCell>Thu</Table.HeaderCell>
//           <Table.HeaderCell>Fri</Table.HeaderCell>
//           <Table.HeaderCell>Sat</Table.HeaderCell>
//           </Table.Row>
//         </Table.Header>
//         <Table.Body>
//           {rows.map((row, i) => (<Table.Row key={i}>{row}</Table.Row>))}
//         </Table.Body>
//       </Table>
//     )
//   })
// })
const stubInitialState = {
  todos: [
    {id: 1, title: 'TODO_TEST_TITLE_1', done: false, year: 2021, month: 8, date:11},
    {id: 2, title: 'TODO_TEST_TITLE_2', done: true,  year: 2021, month: 9, date:12},
    {id: 3, title: 'TODO_TEST_TITLE_3', done: false, year: 2021, month: 10, date:3},
  ],
};

const mockStore = getMockStore(stubInitialState);

describe('<TodoListCalendar />', () => {
  let todoListCalendar, spyGetTodos, spyToggleTodo;
  beforeEach(() => {
    todoListCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path='/' exact component={TodoCalendar}/>
          </Switch>
        </ConnectedRouter>
      </Provider>
    )
    spyGetTodos = jest.spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => { return dispatch => {}; });
    spyToggleTodo = jest.spyOn(actionCreators, 'toggleTodo')
      .mockImplementation(() => { return dispatch => {}; })
  });

  it('should render TodoCalendar correctly', () => {
    const component = mount(todoListCalendar)
    const wrapper = component.find('.todoCal')
    expect(wrapper.length).toBe(1);
    expect(spyGetTodos).toBeCalledTimes(1);
  })

  it('should set prev month and year properly when clicking prev button', () => {
    const component = mount(todoListCalendar);
    const wrapper = component.find('#prev');
    for (let click = 0; click < 12; click++) {
      wrapper.simulate('click');
    }
    // redux로 wrapping 되어있기 때문에 아래 같은 구문이 필요
    const todoCalInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalInstance.state.month).toBe(9);
    expect(todoCalInstance.state.year).toBe(2020);
  });

  it('should set prev month and year properly when clicking next button', () => {
    const component = mount(todoListCalendar);
    const wrapper = component.find('#next');
    for (let click = 0; click < 12; click++) {
      wrapper.simulate('click')
    };
    const todoCalInstance = component.find(TodoCalendar.WrappedComponent).instance();
    expect(todoCalInstance.state.month).toBe(9);
    expect(todoCalInstance.state.year).toBe(2022);
  });
  
  it('should toggle todo',()=>{
    const component = mount(todoListCalendar);
    const wrapper = component.find('div.todoTitle.notdone')
    wrapper.simulate('click')
    expect(spyToggleTodo).toBeCalledTimes(1)
  })    
})


// })
