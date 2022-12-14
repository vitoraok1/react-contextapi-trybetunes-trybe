import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Loading from './Loading';

class MusicCard extends Component {
  state = {
    loading: false,
  };

  render() {
    const { loading } = this.state;
    const {
      trackName,
      previewUrl,
    } = this.props;

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
