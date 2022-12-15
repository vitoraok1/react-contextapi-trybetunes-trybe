import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  state = {
    loading: false,
    isChecked: false,
  };

  handleFavorite = async () => {
    const { dataSong } = this.props;
    const { isChecked } = this.state;
    if (!isChecked) {
      this.setState({ loading: true });
      await addSong(dataSong);
      this.setState({
        loading: false, isChecked: true,
      });
    } else {
      this.setState({ loading: true });
      await removeSong(dataSong);
      this.setState({
        loading: false, isChecked: false,
      });
    }
  };

  render() {
    const { loading, isChecked } = this.state;
    const { dataSong } = this.props;
    const {
      trackName,
      previewUrl,
      trackId,
    } = dataSong;

    if (loading) return <Loading />;

    return (
      <section>
        <div>
          <p>
            { trackName }
          </p>
          <audio data-testid="audio-component" src={ previewUrl } controls>
            <track kind="captions" />
          </audio>
          <label htmlFor={ `checkbox-music-${trackId}` }>
            Favorita
            <input
              type="checkbox"
              data-testid={ `checkbox-music-${trackId}` }
              id={ `checkbox-music-${trackId}` }
              checked={ isChecked }
              onChange={ this.handleFavorite }
            />
          </label>
        </div>
      </section>
    );
  }
}

MusicCard.propTypes = {
  trackName: PropTypes.string,
  previewUrl: PropTypes.string,
}.isRequired;

export default MusicCard;
