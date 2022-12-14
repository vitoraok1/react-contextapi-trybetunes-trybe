import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Loading from '../components/Loading';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends Component {
  state = {
    searchName: '',
    searchBtn: false,
    loading: false,
    artistName: '',
    showResults: false,
    searchResults: [],
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

  handleSearch = async (event) => {
    event.preventDefault();
    const { searchName } = this.state;
    const inputName = searchName;

    this.setState({
      searchName: '',
      loading: true,
      searchBtn: true,
    });

    const albumData = await searchAlbumsAPI(inputName);

    this.setState({
      loading: false,
      searchResults: albumData,
      showResults: true,
      artistName: inputName,
    });
  };

  render() {
    const {
      searchName,
      searchBtn,
      loading,
      artistName,
      showResults,
      searchResults,
    } = this.state;

    if (loading) return <Loading />;

    return (
      <section data-testid="page-search">
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
            onClick={ this.handleSearch }
          >
            Pesquisar
          </button>
        </form>
        { showResults && (
          <div>
            <h2>
              Resultado de álbuns de:
              {' '}
              { artistName }
            </h2>
          </div>
        )}
        { searchResults.length < 1 && (
          <div>
            <h2>
              Nenhum álbum foi encontrado
            </h2>
          </div>
        )}
        { searchResults.map((element) => (
          <div key={ element.collectionId }>
            Nome do artista:
            { element.artistName }
            Nome da coleção:
            { element.collectionName }
            Imagem:
            <img src={ element.artworkUrl100 } alt="album-cover" />
            <Link
              data-testid={ `link-to-album-${element.collectionId}` }
              to={ `/album/${element.collectionId}` }
            >
              {' '}
              Link do Album
              {' '}
            </Link>
          </div>
        ))}
      </section>
    );
  }
}

export default Search;
