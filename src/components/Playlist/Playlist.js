import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';


class Playlist extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      name: 'New Playlist'
    }

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handlePlaylistRequest = this.handlePlaylistRequest.bind(this);
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this);

  }

  handleTitleChange(event){
    const title = event.target.value;
    this.setState({ name : title });
  }

  handlePlaylistRequest(trackId,action,track) {
    this.props.handleRemoveTrack(trackId,action,track);
  }

  handleSavePlaylist(event) {
    this.props.handleSavePlaylist(this.state.name);
  }

  render() {
    return (
      <div className="Playlist">
        <input defaultValue={this.state.name} onChange={this.handleTitleChange} />
        <TrackList trackList={this.props.trackList} action='remove' handlePlaylistRequest={this.handlePlaylistRequest} />
        <button className="Playlist-save" onClick={this.handleSavePlaylist}>SAVE TO SPOTIFY</button>
      </div>
    );
  }
};

export default Playlist;
