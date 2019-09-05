import React, { useState, useEffect } from 'react';
import { navigate } from 'hookrouter';
import './MovieDetails.css';
import { jumboConfig } from '../config/jumbo.js';
import MoviePage from './MoviePage';

const MovieDetails = ({ movieId }) => {
  const [selectedMovie, setSelectedMovie] = useState();

  useEffect(() => {
    const fetchMovie = async () => {
      try {
        await fetch(
          `${jumboConfig.api.host}${jumboConfig.api.movie}/${movieId}?api_key=${jumboConfig.api.key}`,
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
            console.log(data);
            const movie = data;
            console.log(movie);
            setSelectedMovie(movie);
          });
      } catch (error) {
        if (error.name !== 'AbortError') {
          // handle error
        }
      }
    };

    fetchMovie();
  }, [movieId]);

  if (!movieId) {
    navigate(`/`);
  }

  const MoviePageDisplay = (selectedMovie) => {
    if (!selectedMovie) return;
    return <MoviePage selectedMovie={selectedMovie} />;
  };

  return <div>{MoviePageDisplay(selectedMovie)}</div>;
};

export default MovieDetails;
