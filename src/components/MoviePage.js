import React, { useEffect, useState } from 'react';
import './MoviePage.css';
import ArrowBack from '@material-ui/icons/ArrowBack';
import JumboHelper from './JumboHelper';
import { navigate } from 'hookrouter';
import { jumboConfig } from '../config/jumbo.js';
import NoImageBackdrop from '../assets/images/no-image-backdrop.png';
import AspectRatio from 'react-aspect-ratio';

/**
 * @param {Object} selectedMovie The movie that has been selected from the <Movies /> component
 * @return {String} Movie page markup
 */
const MoviePage = ({ selectedMovie }) => {
  const [backdropStyle, setBackdropStyle] = useState({});

  useEffect(() => {
    // Set the backdrop image
    if (!selectedMovie.backdrop_path) {
      setBackdropStyle({ backgroundImage: `url(${NoImageBackdrop})` });
    } else {
      setBackdropStyle({
        backgroundImage: `url(${jumboConfig.api.imageHost}original/${selectedMovie.backdrop_path})`,
      });
    }
  }, [selectedMovie]);

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
          <AspectRatio ratio="1/2">
            <img
              className="poster-image"
              src={posterPath()}
              alt={selectedMovie.title}
            />
          </AspectRatio>
          <div className="details">
            <h2 className="title">{selectedMovie.title}</h2>
            <div>
              <p className="release-date">
                {JumboHelper.formatReleaseDate(
                  selectedMovie.release_date,
                  true
                )}{' '}
                - {JumboHelper.calculatePopularity(selectedMovie.vote_average)}{' '}
                User Score
              </p>
              <p className="runtime">
                {JumboHelper.formatRuntime(selectedMovie.runtime)}
              </p>
            </div>
          </div>
        </div>
        <hr />
        <h3>Overview</h3>
        <p className="overview-text">{selectedMovie.overview}</p>
      </div>
    </div>
  );
};

export default MoviePage;
