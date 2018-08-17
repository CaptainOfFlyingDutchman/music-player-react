import React, { Component } from 'react';
import './App.css';
import Player from "./Player";
import Playlist from "./Playlist";

class App extends Component {
  state = {
    songs: [
      '/songs/1.mp3',
      '/songs/2.mp3',
      '/songs/3.mp3',
    ],
    currentSong: '',
    currentSongIndex: 0
  };

  componentWillMount() {
    this.setState((state) => ({
      currentSong: state.songs[0]
    }))
  }

  getSongIndex(song) {
    if (song) {
      return this.state.songs.indexOf(song);
    }
    return this.state.songs.indexOf(this.state.currentSong);
  }

  setCurrentSong = (song) => {
    this.setState(() => ({
      currentSong: song,
      currentSongIndex: this.getSongIndex(song)
    }));
  };

  playPrev = () => {
    const currentSongIndex = this.getSongIndex();
    if (currentSongIndex === 0) {
      this.setCurrentSong(this.state.songs[this.state.songs.length - 1]);
    } else {
      this.setCurrentSong(this.state.songs[currentSongIndex - 1]);
    }
  };

  playNext = () => {
    const currentSongIndex = this.getSongIndex();
    if (currentSongIndex === this.state.songs.length - 1) {
      this.setCurrentSong(this.state.songs[0]);
    } else {
      this.setCurrentSong(this.state.songs[currentSongIndex + 1]);
    }
  };

  render() {
    const { currentSong, currentSongIndex, songs } = this.state;

    return (
      <div className="App shell">
        <Player song={currentSong} playPrev={this.playPrev} playNext={this.playNext} />
        <Playlist currentSong={currentSong} currentSongIndex={currentSongIndex}
                  songs={songs} setCurrentSong={this.setCurrentSong} />
      </div>
    );
  }
}

export default App;
