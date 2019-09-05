import React, { Fragment } from 'react';
import './App.css';

import { useRoutes } from 'hookrouter';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Movies from './Movies';
import MovieDetails from './MovieDetails';
import NoPageFound from './NoPageFound';

/**
 * Theme colours
 */
const jumboTheme = createMuiTheme({
  palette: {
    primary: {
      light: '#01D277',
      main: '#01D277',
      dark: '#01D277',
      contrastText: '#01D277',
    },

    secondary: {
      light: '#ffffff',
      main: '#ffffff',
      dark: '#ffffff',
      contrastText: '#ffffff',
    },
  },
});

/**
 * Routes between the movie view and movie list
 */
const routes = {
  '/': () => <Movies />,
  '/detail/:id': ({ id }) => <MovieDetails movieId={id} />,
};

/**
 * @return {String} App container markup
 */
const App = () => {
  const routeResult = useRoutes(routes);

  return (
    <Fragment>
      <div className="app">
        <ThemeProvider theme={jumboTheme}>
          {routeResult || <NoPageFound />}
        </ThemeProvider>
      </div>
    </Fragment>
  );
};

export default App;
