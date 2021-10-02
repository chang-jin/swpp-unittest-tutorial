import React from 'react'
import { shallow, mount } from 'enzyme'
import { Provider } from 'react-redux'

import Calendar from './Calendar'
import { Table } from 'semantic-ui-react'

const testTodos = [
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
]

describe('<Calendar />', () => {
  it('should render Calendar', () => {
    const component = shallow(<Calendar />)
    const wrapper = component.find(Table)
    expect(wrapper.length).toBe(1)
  })

  it('should render correct number of dates', () => {
    const component = shallow(<Calendar year={2021} month={10} todos={[]} />)
    let wrapper = component.find('.date')
    expect(wrapper.length).toBe(31)

    wrapper = component.find('.sunday > .date')
    expect(wrapper.length).toBe(5) // pre-calculated number of sundays
  })

  it('should render todos', () => {
    const mockClickDone = jest.fn()

    const component = shallow(
      <Calendar
        year={2021}
        month={10}
        todos={testTodos}
        clickDone={mockClickDone}
      />
    )
    let wrapper = component.find('.todoTitle')
    expect(wrapper.length).toBe(2)
    expect(wrapper.at(0).text()).toBe('TODO_TEST_TITLE_1')
    expect(wrapper.at(1).text()).toBe('TODO_TEST_TITLE_2')

    wrapper.at(0).simulate('click')
    wrapper.at(1).simulate('click')
    expect(mockClickDone).toHaveBeenCalledTimes(2)
  })
})
