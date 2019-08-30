import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, render } from 'enzyme'
import MovieTile from './MovieTile'

describe('Movie details component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<MovieTile />)
  })

  it('displays an image', () => {
    expect(wrapper.find('#tileImage').exists()).toBe(true)
  })

  it('displays a percentage of user score', () => {
    expect(wrapper.find('#userScore').textContent()).toEqual('something')
  })
})
