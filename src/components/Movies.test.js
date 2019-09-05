import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Movies from './Movies';
import { jumboConfig } from '../config/jumbo.js';

configure({ adapter: new Adapter() });

describe('Movies component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Movies />);
  });

  it('has a search field', () => {
    expect(wrapper.find('#searchField').exists()).toBe(true);
  });

  it('has loaded the config file', () => {
    expect(jumboConfig.api.host).toEqual('https://api.themoviedb.org/3/');
  });

  it('has a movie container', () => {
    expect(wrapper.find('#moviesContainer').exists()).toBe(true);
  });

  it('has title on the page', (done) => {
    expect(wrapper.find('h2').textContent).toEqual('Popular Movies');
  });

  it('displays 6 cards when loaded', () => {
    expect(wrapper.find('').length).toEqual(6);
  });

  it('has a movies container', () => {
    expect(wrapper.find('.movies').exists()).toBe(true);
  });

  it('has the movie db logo', () => {
    expect(wrapper.find('.logo').exists()).toBe(true);
  });

  it('has pagination on the page', () => {
    expect(wrapper.find('ul.pagination').exists()).toBe(true);
  });

  it('returns a successful response', (done) => {
    const mockSuccessResponse = {};
    const mockJsonPromise = Promise.resolve(mockSuccessResponse);
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
    });
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise);

    expect(global.fetch).toHaveBeenCalledWith(
      'https://api.themoviedb.org/3/movie/popular'
    );

    expect(global.fetch).toHaveBeenCalledTimes(1);

    process.nextTick(() => {
      global.fetch.mockClear();
      done();
    });
  });
});
