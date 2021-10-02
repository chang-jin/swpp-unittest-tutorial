import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'
import { connectRouter, ConnectedRouter } from 'connected-react-router'
import { Route, Redirect, Switch } from 'react-router-dom'

import TodoCalendar from './TodoCalendar'
import { getMockStore } from '../../test-utils/mocks'
import { history } from '../../store/store'
import * as actionCreators from '../../store/actions/todo'

jest.mock('../../components/Calendar/Calendar', () => {
  return jest.fn((props) => {
    return (
      <div className="spyCalendar">
        <div className="year">{props.year}</div>
        <div className="month">{props.month}</div>
        <button className="doneButton" onClick={() => props.clickDone(1)} />
      </div>
    )
  })
})

const stubInitialState = {
  todos: [
    {
      id: 1,
      title: 'TODO_TEST_TITLE_1',
      done: true,
      year: 2021,
      month: 9, // actual month: October
      date: 1,
    },
    {
      id: 2,
      title: 'TODO_TEST_TITLE_2',
      done: false,
      year: 2021,
      month: 9,
      date: 31,
    },
    {
      id: 3,
      title: 'TODO_TEST_TITLE_3',
      done: false,
      year: 2021,
      month: 10,
      date: 1,
    },
    {
      id: 4,
      title: 'TODO_TEST_TITLE_4',
      done: false,
      year: 2021,
      month: 10,
      date: 30,
    },
    {
      id: 5,
      title: 'TODO_TEST_TITLE_5',
      done: false,
      year: 2022,
      month: 9,
      date: 1,
    },
    {
      id: 6,
      title: 'TODO_TEST_TITLE_6',
      done: false,
      year: 2022,
      month: 9,
      date: 31,
    },
  ],
  selectedTodo: null,
}

const mockStore = getMockStore(stubInitialState)

describe('<TodoCalendar />', () => {
  let todoCalendar, spyGetTodos, spyToggleTodo

  beforeEach(() => {
    todoCalendar = (
      <Provider store={mockStore}>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/calendar" exact render={() => <TodoCalendar />} />
            <Redirect exact from="/" to="/calendar" />
          </Switch>
        </ConnectedRouter>
      </Provider>
    )

    spyToggleTodo = jest
      .spyOn(actionCreators, 'toggleTodo')
      .mockImplementation((id) => {
        return (dispatch) => {}
      })

    spyGetTodos = jest
      .spyOn(actionCreators, 'getTodos')
      .mockImplementation(() => {
        return (dispatch) => {}
      })
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('should render Calendar', () => {
    const component = mount(todoCalendar)
    let wrapper = component.find('.spyCalendar')

    expect(wrapper.length).toBe(1)
    expect(spyGetTodos).toHaveBeenCalledTimes(1)

    wrapper = component.find('.spyCalendar > .doneButton')
    wrapper.simulate('click')
    expect(spyToggleTodo).toHaveBeenCalledTimes(1)
    expect(spyToggleTodo).toHaveBeenCalledWith(1)
  })

  it('should handle prev month button', () => {
    const component = mount(todoCalendar)

    const yearWrapper = component.find('.spyCalendar > .year')
    const monthWrapper = component.find('.spyCalendar > .month')
    let currentYear = parseInt(yearWrapper.text())
    let currentMonth = parseInt(monthWrapper.text())

    const wrapper = component.find('.header > button')

    for (let i = 0; i < 12; i++) {
      wrapper.at(0).simulate('click') // prev month
      expect(parseInt(yearWrapper.text())).toBe(
        currentMonth === 1 ? currentYear - 1 : currentYear
      )
      expect(parseInt(monthWrapper.text())).toBe(
        currentMonth === 1 ? 12 : currentMonth - 1
      )
      currentYear = parseInt(yearWrapper.text())
      currentMonth = parseInt(monthWrapper.text())
    }
  })

  it('should handle next month button', () => {
    const component = mount(todoCalendar)

    const yearWrapper = component.find('.spyCalendar > .year')
    const monthWrapper = component.find('.spyCalendar > .month')
    let currentYear = parseInt(yearWrapper.text())
    let currentMonth = parseInt(monthWrapper.text())

    const wrapper = component.find('.header > button')

    for (let i = 0; i < 12; i++) {
      wrapper.at(1).simulate('click') // next month
      expect(parseInt(yearWrapper.text())).toBe(
        currentMonth === 12 ? currentYear + 1 : currentYear
      )
      expect(parseInt(monthWrapper.text())).toBe(
        currentMonth === 12 ? 1 : currentMonth + 1
      )
      currentYear = parseInt(yearWrapper.text())
      currentMonth = parseInt(monthWrapper.text())
    }
  })
})
