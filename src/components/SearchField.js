import React, { useState } from 'react';
import './SearchField.css';
import Input from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { jumboConfig } from '../config/jumbo.js';

/**
 */
const SearchField = () => {
  /**
   * Text state from the search input field
   */
  const [searchText, setSearch] = useState('');

  /**
   * Input field change value assigns a value for search
   * @param {Event} event onChange text input field
   */
  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  /**
   * @param {Event} event Search form submission
   */
  const search = async (event) => {
    if (searchText === '') return;
    event.preventDefault();

    const response = await fetch(
      `${jumboConfig.api.host}${jumboConfig.api.search}?api_key=${jumboConfig.api.key}&query=${searchText}`
    );
    const json = await response.json();
    console.log(json);
    // Send the search results to the parent
    window.dispatchEvent(
      new CustomEvent('search-results', { detail: { search: json } })
    );
    // reset the search value
    setSearch('');
  };

  /**
   * @return {String} Search field markup
   */
  return (
    <div className="col-sm-10 col-md-6 header-search">
      <form onSubmit={search}>
        <Input
          InputProps={{
            disableUnderline: true,
            style: {
              color: '#01D277',
              paddingLeft: '8px',
              fontWeight: '400',
            },
          }}
          className="search-text-field"
          value={searchText}
          onChange={handleSearchInput}
          margin="normal"
          placeholder="Search"
        />
        <SearchIcon className="search-icon" onClick={search} />
      </form>
    </div>
  );
};

export default SearchField;
