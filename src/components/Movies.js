import React, { useEffect, useState } from 'react';
import './Movies.css';
import MovieTile from './MovieTile';
import SearchField from './SearchField';
import { jumboConfig } from '../config/jumbo.js';

const Movies = () => {
  const [movies, setMovies] = useState();
  const logoPath = jumboConfig.assets.images + '/' + jumboConfig.images.logo;
  const logo = `${logoPath}`;

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        await fetch(
          `${jumboConfig.api.host}${jumboConfig.api.discover}?api_key=${jumboConfig.api.key}`,
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
              Host: jumboConfig.api.host,
            },
          }
        )
          .then((response) => response.json())
          .then((data) => {
            const movies = data.results;
            setMovies(movies);
          });
      } catch (error) {
        if (error.name !== 'AbortError') {
          // handle error
        }
      }
    };

    fetchMovies();
  }, []);

  /**
   */
  const listMovies = (movies) => {
    if (!movies || movies.length === 0) return;
    return movies.map((movie, index) => (
      <MovieTile key={index} movie={movie} />
    ));
  };

  return (
    <div>
      <header className="app-header">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <SearchField />
      <h2>Popular Movies</h2>
      <div id="movies">{listMovies(movies)}</div>
    </div>
  );
};

export default Movies;
