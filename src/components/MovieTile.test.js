import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import MovieTile from './MovieTile';

describe('Movie details component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MovieTile />);
  });

  it('displays an image', () => {
    expect(wrapper.find('#tileImage').exists()).toBe(true);
  });

  it('displays a percentage of user score', () => {
    expect(wrapper.find('#userScore').textContent()).toEqual('something');
  });

  it('displays the title in the title on the card', () => {
    expect(wrapper.find('').textContent()).toEqual('something');
  });

  it('displays the percentage', () => {
    expect(wrapper.find('').textContent()).toEqual('10%');
  });

  it('has an image on the card', () => {
    expect(wrapper.find('img href')).toEqual('something');
  });

  it('tile can be clicked on', () => {
    const mockCallBack = jest.fn();
    const tile = wrapper;
    tile
      .find('#movieTile')
      .at(0)
      .simulate('click');

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('has a release date', () => {
    expect(wrapper.find('.release-date')).toEqual('April 2018');
  });
});
