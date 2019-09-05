import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import Movies from './Movies';
import SearchField from './SearchField';
import { jumboConfig } from '../config/jumbo.js';

configure({ adapter: new Adapter() });

describe('Application container', () => {
  let appWrapper;
  let searchWrapper;
  let moviesWrapper;

  beforeEach(() => {
    appWrapper = shallow(<App />);
    searchWrapper = shallow(<SearchField />);
    moviesWrapper = shallow(<Movies />);
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    expect(appWrapper.find('div').exists()).toBe(true);
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has loaded the config file', () => {
    expect(jumboConfig.logo).toEqual('../src/assets/images/logo.png');
  });

  it('has a search field', () => {
    expect(searchWrapper.find('').exists()).toBe(true);
  });

  it('has a movie container', () => {
    expect(moviesWrapper.find('').exists()).toBe(true);
  });

  it('displays 6 cards when loaded', () => {
    expect(moviesWrapper.find('').length).toEqual(6);
  });

  it('has the movie db logo', () => {
    expect(appWrapper.find('.logo').exists()).toBe(true);
  });

  it('tile can be clicked on', () => {
    const mockCallBack = jest.fn();
    const tile = appWrapper;
    tile
      .find('#movieTile')
      .at(0)
      .simulate('click');

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('returns a successful response', (done) => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://themoviedb.org/documentation/api'
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);

    process.nextTick(() => {
      global.fetch.mockClear();
      done();
    });
  });
});
