import React from 'react';
import './App.css';

import { useRoutes } from 'hookrouter';
import { ThemeProvider } from '@material-ui/styles';
import { createMuiTheme } from '@material-ui/core/styles';
import Movies from './Movies';
import MovieDetails from './MovieDetails';
import NoPageFound from './NoPageFound';

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

const routes = {
  '/': () => <Movies />,
  '/detail/:id': ({ id }) => <MovieDetails movieId={id} />,
};

const App = () => {
  const routeResult = useRoutes(routes);

  return (
    <div className="app">
      <ThemeProvider theme={jumboTheme}>
        <div className="container">{routeResult || <NoPageFound />}</div>
      </ThemeProvider>
    </div>
  );
};

export default App;
