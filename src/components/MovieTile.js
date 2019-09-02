import React, { useState } from 'react';
import './MovieTile.css';
import { navigate } from 'hookrouter';
import { jumboConfig } from '../config/jumbo.js';
import Badge from '@material-ui/core/Badge';
import AspectRatio from 'react-aspect-ratio';

const MovieTile = ({
  title,
  posterPath,
  voteAverage,
  releaseDate,
  movieId,
  backdropPath,
}) => {
  const [movie, setMovie] = useState();

  const calculatePopularity = () => {
    return `${voteAverage * 10}%`;
  };

  const imagePath = () => {
    return `${jumboConfig.api.imageHost}/${posterPath}`;
  };

  const formatReleaseDate = () => {
    var date = new Date(releaseDate);
    const month = date.toLocaleString('default', { month: 'long' });
    return `${month} ${date.getFullYear()}`;
  };

  const displayMovie = (event) => {
    event.preventDefault();

    setMovie({ title: title });

    navigate(`/detail/${movieId}`, false, { movie });
  };

  return (
    <div className="movie-tile" onClick={displayMovie}>
      <div id="image">
        <AspectRatio ratio="1/2">
          <img src={imagePath()} alt={title} />
        </AspectRatio>
        <Badge
          badgeContent={calculatePopularity()}
          className="badge"
          color="primary"
        />
      </div>
      <p className="title">{title}</p>
      <p className="release-date">{formatReleaseDate()}</p>
    </div>
  );
};

export default MovieTile;
