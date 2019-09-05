import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MoviePage from './MoviePage';
import { jumboConfig } from '../config/jumbo.js';

configure({ adapter: new Adapter() });

let selectedMovie = {
  adult: false,
  backdrop_path: '/8bRIfPGDnmWgdy65LO8xtdcFmFP.jpg',
  belongs_to_collection: null,
  budget: 0,
  genres: [
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 18, name: 'Drama' },
  ],
  homepage: 'http://www.foxsearchlight.com/theoldmanandthegun',
  id: 429203,
  imdb_id: 'tt2837574',
  original_language: 'en',
  original_title: 'The Old Man & the Gun',
  overview:
    'The true story of Forrest Tucker, from his audacious escape from San Quentin at the age of 70 to an unprecedented string of heists that confounded authorities and enchanted the public. Wrapped up in the pursuit are a detective, who becomes captivated with Forrest’s commitment to his craft, and a woman, who loves him in spite of his chosen profession.',
  popularity: 345.677,
  poster_path: '/a4BfxRK8dBgbQqbRxPs8kmLd8LG.jpg',
  production_companies: [
    {
      id: 51513,
      logo_path: '/eWhUrhDH1DapiMCnK7I9f5HPDjd.png',
      name: 'Condé Nast Entertainment',
      origin_country: 'US',
    },
    {
      id: 1205,
      logo_path: null,
      name: 'Endgame Entertainment',
      origin_country: 'US',
    },
    {
      id: 2870,
      logo_path: null,
      name: 'Identity Films',
      origin_country: 'US',
    },
    {
      id: 14634,
      logo_path: null,
      name: 'Sailor Bear',
      origin_country: 'US',
    },
    {
      id: 316,
      logo_path: null,
      name: 'Wildwood Enterprises',
      origin_country: 'US',
    },
    {
      id: 43,
      logo_path: '/4RgIPr55kBakgupWkzdDxqXJEqr.png',
      name: 'Fox Searchlight Pictures',
      origin_country: 'US',
    },
  ],
  production_countries: [
    { iso_3166_1: 'US', name: 'United States of America' },
  ],
  release_date: '2018-09-27',
  revenue: 11277120,
  runtime: 93,
  spoken_languages: [{ iso_639_1: 'en', name: 'English' }],
  status: 'Released',
  tagline: 'This story is mostly true.',
  title: 'The Old Man & the Gun',
  video: false,
  vote_average: 6.4,
  vote_count: 476,
};

describe('MoviePage', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MoviePage selectedMovie={selectedMovie} />);
  });

  it('renders the component on shallow', () => {
    shallow(<MoviePage selectedMovie={selectedMovie} />);
  });

  it('renders the component on mount', () => {
    mount(<MoviePage selectedMovie={selectedMovie} />);
  });

  it('renders the title', () => {
    expect(wrapper.find('.title').text()).toBe('The Old Man & the Gun');
  });

  it('has the correct image path formatted', () => {
    expect(wrapper.find('.poster-image').prop('src')).toEqual(
      'https://image.tmdb.org/t/p/w300//a4BfxRK8dBgbQqbRxPs8kmLd8LG.jpg'
    );
  });

  it('has the correctly formatted release date', () => {
    expect(wrapper.find('.release-date').text()).toBe('2018 - 64% User Score');
  });

  it('has the correctly formatted runtime', () => {
    expect(wrapper.find('.runtime').text()).toBe('1h 33min');
  });

  it('has the overview description', () => {
    expect(wrapper.find('.overview-text').text()).toBe(
      'The true story of Forrest Tucker, from his audacious escape from San Quentin at the age of 70 to an unprecedented string of heists that confounded authorities and enchanted the public. Wrapped up in the pursuit are a detective, who becomes captivated with Forrest’s commitment to his craft, and a woman, who loves him in spite of his chosen profession.'
    );
  });

  it('displays a back button', () => {
    expect(wrapper.find('.back').exists()).toBe(true);
  });

  it('has a clickable back button', () => {
    let mockCallBack = jest.fn();
    const backButton = mount(
      <MoviePage back={mockCallBack} selectedMovie={selectedMovie} />
    );
    backButton
      .find('.back')
      .at(0)
      .simulate('click');

    expect(mockCallBack).toHaveBeenCalledTimes(1);
    backButton.unmount();
  });
});
