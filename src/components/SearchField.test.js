import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, render } from 'enzyme'
import SearchField from './SearchField'

describe('Search field component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<SearchField />)
  })

  it('displays a magnify glass', () => {
    expect(wrapper.find('#search').exists()).toBeTrue()
  })

  it('has a clickable magnify glass', () => {
    const mockCallBack = jest.fn()
    const searchIcon = wrapper
    searchIcon.find('#search').simulate('click')

    expect(mockCallBack.mock.calls.length).toEqual(1)
  })

  it('has a placeholder of search', () => {
    expect(wrapper)
      .find('input')
      .textContent()
      .toEqual('search')
  })
})
