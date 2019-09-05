import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render } from 'enzyme';
import MovieDetails from './MovieDetails';

describe('Movie details component', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(<MovieDetails />);
  });
});
