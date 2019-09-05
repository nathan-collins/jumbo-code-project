import React, { useContext } from 'react';
import './MovieTile.css';
import { navigate } from 'hookrouter';
import { jumboConfig } from '../config/jumbo.js';
import Badge from '@material-ui/core/Badge';
import AspectRatio from 'react-aspect-ratio';
import JumboHelper from './JumboHelper';

const MovieTile = ({ movie }) => {
  const imagePath = () => {
    return `${jumboConfig.api.imageHost}w300/${movie.poster_path}`;
  };

  /**
   *
   * @param {String} str
   */
  const toKebabCase = (str) =>
    str &&
    str
      .match(
        /[A-Z]{2,}(?=[A-Z][a-z]+[0-9]*|\b)|[A-Z]?[a-z]+[0-9]*|[A-Z]|[0-9]+/g
      )
      .map((x) => x.toLowerCase())
      .join('-');

  const displayMovie = (event) => {
    event.preventDefault();

    navigate(`/detail/${movie.id}`);
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
