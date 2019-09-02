import React, { useState } from 'react';
import './Movies.css';
import MovieTile from './MovieTile';
import SearchField from './SearchField';
import { jumboConfig } from '../config/jumbo.js';

const Movies = () => {
  const logo = jumboConfig.assets.images + '/' + jumboConfig.images.logo;
  const [movies, setMovies] = useState();

  React.useEffect(() => {
    fetchMovies();
  }, []);

  /**
   */
  const fetchMovies = async () => {
    try {
      await fetch(`${jumboConfig.api.host}${jumboConfig.api.search}`, {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: 'Bearer ' + jumboConfig.api.key,
          Host: jumboConfig.api.host,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const movies = data.results;
          setMovies({ movies });
        });
    } catch (error) {
      if (error.name !== 'AbortError') {
        // handle error
      }
    }
  };

  const listMovies = (props) => {
    if (!props) return;
    return props.movies.map((movie, index) => (
      <MovieTile
        key={index}
        movieId={movie.id}
        title={movie.title}
        posterPath={movie.poster_path}
        releaseDate={movie.release_date}
        popularity={movie.popularity}
        voteCount={movie.vote_count}
        voteAverage={movie.vote_average}
        overview={movie.overview}
        backdropPath={movie.backdropPath}
      />
    ));
  };

  return (
    <div>
      <div className="row">
        <header className="app-header">
          <img src={logo} className="logo" alt="logo" />
        </header>
        <SearchField />
        <h2>Popular Movies</h2>
        <div id="movies">{listMovies(movies)}</div>
      </div>
    </div>
  );
};

export default Movies;
