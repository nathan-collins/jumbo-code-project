import React from 'react';
import ReactDOM from 'react-dom';
import { shallow, mount, render, configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import App from './App';
import { jumboConfig } from '../config/jumbo.js';

configure({ adapter: new Adapter() });

describe('Application container', () => {
  let appWrapper;

  beforeEach(() => {
    appWrapper = shallow(<App />);
    appWrapper.routes = {
      '/': () => <Movies />,
      '/detail/:id': ({ id }) => <MovieDetails movieId={id} />,
    };
  });

  it('renders without crashing', () => {
    const div = document.createElement('div');
    expect(appWrapper.find('div').exists()).toBe(true);
    ReactDOM.render(<App />, div);
    ReactDOM.unmountComponentAtNode(div);
  });

  it('has loaded the config file', () => {
    expect(jumboConfig.images.logo).toEqual('logo.png');
  });
});
