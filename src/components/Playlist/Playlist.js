import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';


class Playlist extends React.Component {

  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePlaylistChange = this.handlePlaylistChange.bind(this);
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this);

  }

  handleTitleChange(event){
    const title = event.target.value;
    this.props.onTitleChange(title);
  }

  handlePlaylistChange(trackId,action) {
    this.props.onPlaylistChange(trackId,action);
  }

  handleSavePlaylist(event) {
    console.log('handleSavePlaylist');
  }

  render() {
    console.log(this.props.trackList);
    return (
      <div class="Playlist">
        <input defaultValue={this.props.name} onChange={this.handleTitleChange} />
        <TrackList trackList={this.props.trackList} action='remove' onChange={this.handlePlaylistChange} />
        <a class="Playlist-save" onClick={this.handleSavePlaylist}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
};

export default Playlist;
