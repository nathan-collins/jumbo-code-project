import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Movies from './Movies';

configure({ adapter: new Adapter() });

describe('Movies component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<Movies />);
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

  it('has a release date', () => {
    expect(wrapper.find('.release-date')).toEqual('April 2018');
  });
});
