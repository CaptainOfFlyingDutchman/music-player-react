import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Playlist extends Component {

  static propTypes = {
    songs: PropTypes.array,
    setCurrentSong: PropTypes.func,
    currentSongIndex: PropTypes.number,
    currentSong: PropTypes.string,
  };

  render() {
    const { songs, currentSongIndex, currentSong } = this.props;

    return (
      <ul className="playlist">
        {
          songs.map((song, i) => {
            return <li className={`song-item ${currentSong === song ? 'active' : ''}`}
                       key={song} onClick={() => {this.props.setCurrentSong(song);}}>{song}</li>
          })
        }
      </ul>
    );
  }
}
