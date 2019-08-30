import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, render } from 'enzyme'
import Movies from './Movies'

describe('Movies component', () => {
  it('displays the title in the title on the card', () => {
    expect(shallow(<Movies />).find('').textContent).toEqual('something')
  })

  it('displays the percentage', () => {
    expect(shallow(<Movies />).find('').textContent).toEqual('10%')
  })

  it('has an image on the card', () => {
    expect(shallow(<Movies />).find('img href')).toEqual('something')
  })

  it('has a release date', () => {
    expect(shallow(<Movies />).find('.release-date')).toEqual('April 2018')
  })
})
