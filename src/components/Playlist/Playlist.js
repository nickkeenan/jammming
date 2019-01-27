import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';


class Playlist extends React.Component {

  constructor(props) {
    super(props);
    
  }

  render() {
    return (
      <div class="Playlist">
        <input value={this.props.name} />
        <TrackList trackList={this.props.trackList} />
        <a class="Playlist-save">SAVE TO SPOTIFY</a>
      </div>
    );
  }
};

export default Playlist;
