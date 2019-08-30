import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, render } from 'enzyme'
import MovieDetails from './MovieDetails'

describe('Movie details component', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<MovieDetails />)
  })

  it('displays a card image at the top', () => {
    expect(wrapper.find('#header').exists()).toBeTrue()
  })
  it('displays a small image below the card display', () => {
    expect(wrapper.find('#image').exists()).toBeTrue()
  })
  it('displays a title header at the top of the page', () => {
    expect(wrapper.find('#title').textContent()).toEqual('something')
  })
  it('displays a release year', () => {
    expect(wrapper.find('#releaseYear').textContent()).toEqual('something')
  })
  it('displays a percentage of user score', () => {
    expect(wrapper.find('#userScore').textContent()).toEqual('something')
  })
  it('displays a duration time', () => {
    expect(wrapper.find('#duration').textContent()).toEqual('something')
  })
  it('displays an overview title', () => {
    expect(wrapper.find('#overview').textContent()).toEqual('something')
  })
  it('displays an overview description', () => {
    expect(wrapper.find('#description').textContent()).toEqual('something')
  })
  it('displays a back button', () => {
    expect(wrapper.find('img').exists()).toBeTrue()
  })
  it('has a clickable back button', () => {
    const mockCallBack = jest.fn()
    const searchIcon = wrapper
    searchIcon.find('#back').simulate('click')

    expect(mockCallBack.mock.calls.length).toEqual(1)
  })
})
