import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import MovieTile from './MovieTile';

configure({ adapter: new Adapter() });

let movie = {
  popularity: 103.57,
  vote_count: 18,
  video: false,
  poster_path: '/tltTPQeVK2XF3J0CgMc6kOzdF91.jpg',
  id: 435941,
  adult: false,
  backdrop_path: '/6g0weS4HxtGjPYvSYFlPv1NAopu.jpg',
  original_language: 'ja',
  original_title: '花鳥籠',
  genre_ids: [18, 36],
  title: 'The Caged Flower',
  vote_average: 6.6,
  overview:
    'Yoriko Jun turned Miyuki Fukashi’s sensual novel with the same name into a movie. An ordinary office lady and a boy meet on the Internet, they get into a master-slave relationship and are drowned in a world of pleasure.',
  release_date: '2013-11-23',
};

describe('Movie tile', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MovieTile movie={movie} />);
  });

  it('renders the component on shallow', () => {
    shallow(<MovieTile movie={movie} />);
  });

  it('renders the component on mount', () => {
    mount(<MovieTile movie={movie} />);
  });

  it('displays the title on the tile', () => {
    expect(wrapper.find('.title').text()).toBe('The Caged Flower');
  });

  it('displays the percentage', () => {
    expect(wrapper.find('.badge span').text()).toBe('66%');
  });

  it('has an image on the tile', () => {
    expect(wrapper.find('.tile-image').prop('src')).toEqual(
      'https://image.tmdb.org/t/p/w300//tltTPQeVK2XF3J0CgMc6kOzdF91.jpg'
    );
  });

  it('tile can be clicked on', () => {
    const mockCallBack = jest.fn();
    const movieTile = mount(<MovieTile back={mockCallBack} movie={movie} />);
    movieTile
      .find('.movie-tile')
      .at(0)
      .simulate('click');

    expect(mockCallBack).toHaveBeenCalledTimes(1);
    backButton.unmount();
  });

  it('has a release date', () => {
    expect(wrapper.find('.release-date').text()).toBe('November 2013');
  });
});
