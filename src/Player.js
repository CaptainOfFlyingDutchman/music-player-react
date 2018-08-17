import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Player extends Component {

  static propTypes = {
    song: PropTypes.string,
    playPrev: PropTypes.func,
    playNext: PropTypes.func,
  };

  state = {
    playing: false
  };

  constructor(props) {
    super(props);

    /**
     * @type {HTMLAudioElement} player
     */
    this.player = React.createRef();
  }

  componentWillReceiveProps(nextProps) {
     if (this.props.song !== nextProps.song) {
       this.setState(() => ({ playing: true }));
     }
  }

  componentDidUpdate() {
    this.player.current.play();
    this.bufferBar.style.width = '0%';
  }

  componentDidMount() {
    const { current: player } = this.player;

    if (player) {
      player.addEventListener('timeupdate', () => {
        const playedBy = player.currentTime / player.duration * 100;
        if (!isNaN(playedBy)) {
          this.progressBar.value = playedBy;
        }
      });

      player.addEventListener('progress', () => { // update buffer bar
        if (player.readyState >= 2) {
          this.bufferBar.style.width = player.buffered.end(0) / player.duration * 100 + "%";
        }
      });

      this.progressBar.addEventListener('click', (e) => {
        const mouseClickPosition = e.clientX - this.progressBar.getBoundingClientRect().left;
        console.log(mouseClickPosition)
        player.currentTime = player.duration * (mouseClickPosition / this.bufferBar.offsetWidth);
      });

      // this.bufferBarParent.addEventListener('click', (e) => {
      //
      //   const mouseClickPosition = e.clientX - this.bufferBarParent.getBoundingClientRect().left;
      //   player.currentTime = player.duration * (mouseClickPosition / this.bufferBarParent.offsetWidth);
      //   console.log(player.currentTime, player.duration, mouseClickPosition);
      //   this.bufferBar.style.width = mouseClickPosition + 'px';
      //   this.progressBar.style.width = mouseClickPosition + 'px';
      // })
    }

  }

  play = () => {
    if (!this.state.playing) {
      this.setState(() => ({ playing: true }), () => {
        this.player.current.play();
      });
    } else {
      this.setState(() => ({ playing: false }), () => {
        this.player.current.pause();
      });
    }
  };


  render() {
    const { song, playPrev, playNext } = this.props;

    return (
      <div>
        <div className="player">
          <h2>{song}</h2>
          <audio src={song} ref={this.player} />
        </div>

        {/*<div ref={r => this.bufferBarParent = r} className="buffer-bar-parent">
          <div ref={r => this.bufferBar = r} className="buffer-bar">
            <progress max="100" ref={r => this.progressBar = r} className="progress-bar" />
          </div>
        </div>*/}

        <div className="buffer-bar" ref={r => this.bufferBar = r}>
          <progress max="100" value="0" ref={r => this.progressBar = r} className="progress-bar" />
        </div>

        <div className="controls">
          <button onClick={playPrev}>Prev</button>
          <button onClick={this.play}>{this.state.playing ? 'Pause' : 'Play'}</button>
          <button onClick={playNext}>Next</button>
        </div>
      </div>
    );
  }


}
