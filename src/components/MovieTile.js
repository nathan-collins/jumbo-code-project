import React from 'react';
import './MovieTile.css';
import { navigate } from 'hookrouter';
import { jumboConfig } from '../config/jumbo.js';
import Badge from '@material-ui/core/Badge';
import AspectRatio from 'react-aspect-ratio';
import JumboHelper from './JumboHelper';
import noImage from '../assets/images/no-image.jpg';

/**
 * @param {Object} movie Movie tile values
 * @return {String} Movie tile displayed on the page
 */
const MovieTile = ({ movie }) => {
  /**
   * Image to display on the tile
   * @return {String} If no image show a place holder
   */
  const imagePath = () => {
    if (!movie.poster_path) {
      return `${noImage}`;
    }
    return `${jumboConfig.api.imageHost}w300/${movie.poster_path}`;
  };

  /**
   * @param {Event} event Navigate to the details page if the poster_path exists
   */
  const displayMovie = (event) => {
    if (movie.poster_path) {
      navigate(`/detail/${movie.id}`);
    }
  };

  return (
    <div className="movie-tile" onClick={displayMovie}>
      <div id="image">
        <AspectRatio ratio="1/2">
          <img className="tile-image" src={imagePath()} alt={movie.title} />
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
