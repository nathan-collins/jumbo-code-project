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
    expect(wrapper.find('.search-icon').exists()).toBe(true);
  });

  it('has a clickable magnify glass', () => {
    const mockCallBack = jest.fn();
    const searchIcon = mount(<SearchField back={mockCallBack} />);
    searchIcon.find('.search-icon').simulate('click');

    expect(mockCallBack).toHaveBeenCalledTimes(1);
    searchIcon.unmount();
  });
});
