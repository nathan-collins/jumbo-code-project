import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Movies from './Movies';
import { jumboConfig } from '../config/jumbo.js';

configure({ adapter: new Adapter() });

let movies = [
  {
    popularity: 345.677,
    vote_count: 473,
    video: false,
    poster_path: '/a4BfxRK8dBgbQqbRxPs8kmLd8LG.jpg',
    id: 429203,
    adult: false,
    backdrop_path: '/8bRIfPGDnmWgdy65LO8xtdcFmFP.jpg',
    original_language: 'en',
    original_title: 'The Old Man & the Gun',
    genre_ids: [35, 80, 18],
    title: 'The Old Man & the Gun',
    vote_average: 6.4,
    overview:
      'The true story of Forrest Tucker, from his audacious escape from San Quentin at the age of 70 to an unprecedented string of heists that confounded authorities and enchanted the public. Wrapped up in the pursuit are a detective, who becomes captivated with Forrest’s commitment to his craft, and a woman, who loves him in spite of his chosen profession.',
    release_date: '2018-09-28',
  },
  {
    popularity: 263.198,
    vote_count: 1505,
    video: false,
    poster_path: '/cCTJPelKGLhALq3r51A9uMonxKj.jpg',
    id: 320288,
    adult: false,
    backdrop_path: '/phxiKFDvPeQj4AbkvJLmuZEieDU.jpg',
    original_language: 'en',
    original_title: 'Dark Phoenix',
    genre_ids: [28, 12, 878],
    title: 'Dark Phoenix',
    vote_average: 6.1,
    overview:
      "The X-Men face their most formidable and powerful foe when one of their own, Jean Grey, starts to spiral out of control. During a rescue mission in outer space, Jean is nearly killed when she's hit by a mysterious cosmic force. Once she returns home, this force not only makes her infinitely more powerful, but far more unstable. The X-Men must now band together to save her soul and battle aliens that want to use Grey's new abilities to rule the galaxy.",
    release_date: '2019-06-07',
  },
];

describe('Movies', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Movies movies={movies} />);
  });

  it('renders the component on shallow', () => {
    shallow(<Movies movies={movies} />);
  });

  it('renders the component on mount', () => {
    mount(<Movies movies={movies} />);
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

  it('has title on the page', () => {
    expect(wrapper.find('h2').text()).toBe('Popular Movies');
  });

  it('has a movies container', () => {
    expect(wrapper.find('.movies').exists()).toBe(true);
  });

  it('displays 2 cards when loaded', () => {
    expect(wrapper.find('.movie-tile')).toHaveLength(2);
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
