import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount, render } from 'enzyme'
import App from './App'
import Movies from './components/Movies'
import SearchField from './components/SearchField'

describe('Application container', () => {
  let wrapper
  beforeEach(() => {
    wrapper = shallow(<App />)
  })

  it('renders without crashing', () => {
    const div = document.createElement('div')
    expect(
      shallow(<App />)
        .find('div')
        .exists()
    ).toBe(true)
    ReactDOM.unmountComponentAtNode(div)
  })

  it('has a search field', () => {
    expect(
      shallow(<SearchField />)
        .find('')
        .exists()
    ).toBe(true)
  })

  it('has a movie container', () => {
    expect(
      shallow(<Movies />)
        .find('')
        .exists()
    ).toBe(true)
  })

  it('displays 6 cards when loaded', () => {
    expect(shallow(<Movies />).find('').length).toEqual(6)
  })

  it('has the movie db logo', () => {
    expect(shallow(<App />).find('')).toEqual('theMovieDBLogo')
  })

  it('tile can be clicked on', () => {
    const mockCallBack = jest.fn()
    const tile = shallow(<App />)
    tile
      .find('#movieTile')
      .at(0)
      .simulate('click')

    expect(mockCallBack.mock.calls.length).toEqual(1)
  })

  it('returns a successful response', (done) => {
    const mockSuccessResponse = {}
    const mockJsonPromise = Promise.resolve(mockSuccessResponse)
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    })
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)

    expect(global.fetch).toHaveBeenCalledWith('https://themoviedb.org/documentation/api')

    expect(global.fetch).toHaveBeenCalledTimes(1)

    process.nextTick(() => {
      global.fetch.mockClear()
      done()
    })
  })
})
