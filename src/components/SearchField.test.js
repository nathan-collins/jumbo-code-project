import React from 'react';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import SearchField from './SearchField';
import { jumboConfig } from '../config/jumbo.js';

configure({ adapter: new Adapter() });

describe('Search field component', () => {
  let wrapper;

  beforeEach(() => {
    wrapper = shallow(<SearchField />);
  });

  it('has loaded the config file', () => {
    expect(jumboConfig.api.host).toEqual('https://api.themoviedb.org/3/');
  });

  it('displays a magnify glass', () => {
    expect(wrapper.find('#search').exists()).toBeTrue();
  });

  it('has a clickable magnify glass', () => {
    const mockCallBack = jest.fn();
    const searchIcon = wrapper;
    searchIcon.find('#search').simulate('click');

    expect(mockCallBack.mock.calls.length).toEqual(1);
  });

  it('has a placeholder of search', () => {
    expect(wrapper)
      .find('input')
      .textContent()
      .toEqual('search');
  });
});
