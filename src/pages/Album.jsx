import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import getMusics from '../services/musicsAPI';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';

class Album extends Component {
  state = {
    loading: false,
    artistName: '',
    albumName: '',
    albumSongs: [],
  };

  componentDidMount() {
    this.fetchMusic();
  }

  fetchMusic = () => {
    const { match: { params: { id } } } = this.props;

    this.setState({ loading: true }, async () => {
      const responseMusic = await getMusics(id);
      this.setState({
        loading: false,
        artistName: responseMusic[0].artistName,
        albumName: responseMusic[0].collectionName,
        albumSongs: responseMusic,
      });
    });
  };

  render() {
    const {
      loading,
      artistName,
      albumName,
      albumSongs,
    } = this.state;

    if (loading) return <Loading />;

    return (
      <section data-testid="page-album">
        <Header />
        <div>
          <h2 data-testid="artist-name">{ artistName }</h2>
          <p data-testid="album-name">{ albumName }</p>
          {
            albumSongs.map((song) => {
              if (song.trackId) {
                return (
                  <MusicCard
                    key={ song.trackId }
                    dataSong={ song }
                  />
                );
              } return null;
            })
          }
        </div>
      </section>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string,
    }),
  }),
}.isRequired;

export default Album;
