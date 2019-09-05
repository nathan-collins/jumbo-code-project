import React, { useEffect, useState } from 'react';
import './Movies.css';
import MovieTile from './MovieTile';
import SearchField from './SearchField';
import logo from '../assets/images/logo.png';
import { jumboConfig } from '../config/jumbo.js';

const Movies = () => {
  const [movies, setMovies] = useState();

  useEffect(() => {
    window.addEventListener('search-results', (event) => populateSearch(event));

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

      return () => {
        window.removeEventListener('search-results', (event) =>
          populateSearch(event)
        );
      };
    };

    fetchMovies();
  }, []);

  /**
   * @param {Event} event Set results based on search query
   */
  const populateSearch = (event) => {
    setMovies(event.detail.search.results);
  };

  /**
   * @param {Array} movies List all searched or loaded movies
   */
  const listMovies = (movies) => {
    if (!movies || movies.length === 0) return;
    return movies.map((movie, index) => {
      return <MovieTile key={index} movie={movie} />;
    });
  };

  return (
    <div>
      <header className="app-header">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <SearchField id="searchField" />
      <h2>Popular Movies</h2>
      <div id="movies">{listMovies(movies)}</div>
    </div>
  );
};

export default Movies;
