import React, { useEffect, useState } from 'react';
import './Movies.css';
import MovieTile from './MovieTile';
import SearchField from './SearchField';
import logo from '../assets/images/logo.png';
import { jumboConfig } from '../config/jumbo.js';
import ReactPaginate from 'react-paginate';

const Movies = () => {
  const [movies, setMovies] = useState();
  const [pageCount, setPageCount] = useState(0);
  const [perPage, setPerPage] = useState(20);
  const [offset, setOffset] = useState({ offset: 1 });
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    window.addEventListener('search-results', (event) => populateSearch(event));
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    console.log('Does it make it here?');
    try {
      await fetch(
        `${jumboConfig.api.host}${jumboConfig.api.discover}?api_key=${jumboConfig.api.key}&page=${currentPage}`,
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
          const movies = data.results;
          setPageCount(data.total_pages);
          setPerPage(data.results.length);
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

  const handlePageClick = (data) => {
    console.log(data);
    let selected = data.selected;
    let offset = Math.ceil(selected * { perPage });

    setCurrentPage(selected + 1);
    setOffset({ offset: offset });
    fetchMovies();
  };

  return (
    <div>
      <header className="app-header">
        <img src={logo} className="logo" alt="logo" />
      </header>
      <SearchField id="searchField" />
      <h2>Popular Movies</h2>
      <div id="movies">{listMovies(movies)}</div>
      <ReactPaginate
        previousLabel={'previous'}
        nextLabel={'next'}
        breakLabel={'...'}
        breakClassName={'break-me'}
        pageCount={pageCount}
        marginPagesDisplayed={2}
        pageRangeDisplayed={5}
        onPageChange={handlePageClick}
        containerClassName={'pagination'}
        subContainerClassName={'pages pagination'}
        activeClassName={'active'}
      />
    </div>
  );
};

export default Movies;
