import React from 'react';
import './MovieTile.css';
import { navigate } from 'hookrouter';
import { jumboConfig } from '../config/jumbo.js';
import Badge from '@material-ui/core/Badge';
import AspectRatio from 'react-aspect-ratio';
import JumboHelper from './JumboHelper';
import noImage from '../assets/images/no-image.jpg';

const MovieTile = ({ movie }) => {
  const imagePath = () => {
    if (!movie.poster_path) {
      return `${noImage}`;
    }
    return `${jumboConfig.api.imageHost}w300/${movie.poster_path}`;
  };

  const displayMovie = (event) => {
    event.preventDefault();
    if (movie.poster_path) {
      navigate(`/detail/${movie.id}`);
    }
  };

  return (
    <div className="movie-tile" onClick={displayMovie}>
      <div id="image">
        <AspectRatio ratio="1/2">
          <img src={imagePath()} alt={movie.title} />
        </AspectRatio>
        <Badge
          badgeContent={JumboHelper.calculatePopularity(movie.vote_average)}
          className="badge"
          color="primary"
        />
      </div>
      <p className="title">{movie.title}</p>
      <p className="release-date">
        {JumboHelper.formatReleaseDate(movie.release_date)}
      </p>
    </div>
  );
};

export default MovieTile;
