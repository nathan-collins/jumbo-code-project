import React from 'react';
import './MoviePage.css';
import ArrowBack from '@material-ui/icons/ArrowBack';
import JumboHelper from './JumboHelper';
import { navigate } from 'hookrouter';
import { jumboConfig } from '../config/jumbo.js';
import NoImageBackdrop from '../assets/images/no-image-backdrop.png';

/**
 * @param {Object} selectedMovie The movie that has been selected from the <Movies /> component
 * @return {String} Movie page markup
 */
const MoviePage = ({ selectedMovie }) => {
  // Set the backdrop image
  let backdropStyle = {};
  if (!selectedMovie.backdrop_path) {
    backdropStyle.backgroundImage = `url(${NoImageBackdrop})`;
  } else {
    backdropStyle.backgroundImage = `url(${jumboConfig.api.imageHost}original/${selectedMovie.backdrop_path})`;
  }

  /**
   * @return {String} The path to display the poster image
   */
  const posterPath = () => {
    if (!selectedMovie) return;
    return `${jumboConfig.api.imageHost}w300/${selectedMovie.poster_path}`;
  };

  /**
   * Selected back button action
   */
  const back = () => {
    selectedMovie = {};
    navigate(`/`);
  };

  return (
    <div id="moviePage">
      <div id="backdrop" style={backdropStyle}></div>
      <div onClick={back} className="back">
        <ArrowBack />
      </div>
      <div className="overview">
        <div className="poster">
          <img src={posterPath()} alt={selectedMovie.title} />
          <div className="details">
            <h2>{selectedMovie.title}</h2>
            <span>
              {JumboHelper.formatReleaseDate(selectedMovie.release_date, true)}{' '}
              - {JumboHelper.calculatePopularity(selectedMovie.vote_average)}{' '}
              User Score
            </span>
            <span>{JumboHelper.formatRuntime(selectedMovie.runtime)}</span>
            <span></span>
          </div>
        </div>
        <hr />
        <h3>Overview</h3>
        <p>{selectedMovie.overview}</p>
      </div>
    </div>
  );
};

export default MoviePage;
