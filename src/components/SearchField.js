import React, { useState } from 'react';
import './SearchField.css';
import Input from '@material-ui/core/TextField';
import SearchIcon from '@material-ui/icons/Search';
import { jumboConfig } from '../config/jumbo.js';

const SearchField = () => {
  const [searchText, setSearch] = useState('');

  const handleSearchInput = event => {
    setSearch(event.target.value);
  };

  const search = async event => {
    event.preventDefault();

    const response = await fetch(
      `${jumboConfig.api.host}${jumboConfig.api.search}?api_key=${jumboConfig.apiKey}&query=${searchText}`
    );
    const json = await response.json();
    this.setState({ movies: json.results });
  };

  return (
    <div className="col-sm-10 col-md-6 header-search">
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
      <SearchIcon className="search-icon" />
    </div>
  );
};

export default SearchField;
