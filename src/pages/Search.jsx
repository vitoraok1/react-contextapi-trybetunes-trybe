import React, { Component } from 'react';
import Header from '../components/Header';

class Search extends Component {
  state = {
    searchName: '',
    searchBtn: false,
  };

  handleChangeSearchInput = ({ target }) => {
    const { name, value } = target;

    this.setState({
      [name]: value,
    }, () => this.validSearchInput());
  };

  validSearchInput = () => {
    const { searchName } = this.state;
    const minLength = 2;

    if (searchName.length >= minLength) {
      this.setState({
        searchBtn: true,
      });
    } else {
      this.setState({
        searchBtn: false,
      });
    }
  };

  render() {
    const {
      searchName,
      searchBtn,
    } = this.state;

    return (
      <div data-testid="page-search">
        <Header />
        <form>
          <label htmlFor="search-input">
            <input
              type="text"
              data-testid="search-artist-input"
              name="searchName"
              value={ searchName }
              onChange={ this.handleChangeSearchInput }
            />
          </label>
          <button
            type="submit"
            data-testid="search-artist-button"
            disabled={ !searchBtn }
          >
            Pesquisar
          </button>
        </form>
      </div>
    );
  }
}

export default Search;
