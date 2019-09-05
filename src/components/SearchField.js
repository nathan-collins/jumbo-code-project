import React, { useState } from 'react';
import './SearchField.css';
import Input from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { jumboConfig } from '../config/jumbo.js';

const SearchField = () => {
  const [searchText, setSearch] = useState('');

  const handleSearchInput = (event) => {
    setSearch(event.target.value);
  };

  const search = async (event) => {
    if (searchText === '') return;
    event.preventDefault();

    const response = await fetch(
      `${jumboConfig.api.host}${jumboConfig.api.search}?api_key=${jumboConfig.api.key}&query=${searchText}`
    );
    const json = await response.json();
    window.dispatchEvent(
      new CustomEvent('search-results', { detail: { search: json } })
    );
    setSearch('');
  };

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
