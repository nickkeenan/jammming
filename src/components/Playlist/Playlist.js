import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';


class Playlist extends React.Component {

  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePlaylistRequest = this.handlePlaylistRequest.bind(this);
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this);

  }

  handleTitleChange(event){
    const title = event.target.value;
    this.props.handleTitleChange(title);
  }

  handlePlaylistRequest(trackId,action,track) {
    this.props.handleRemoveTrack(trackId,action,track);
  }

  handleSavePlaylist(event) {
    console.log('handleSavePlaylist');
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.props.name} onChange={this.handleTitleChange} />
        <TrackList trackList={this.props.trackList} action='remove' handlePlaylistRequest={this.handlePlaylistRequest} />
        <a className="Playlist-save" onClick={this.handleSavePlaylist}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
};

export default Playlist;
