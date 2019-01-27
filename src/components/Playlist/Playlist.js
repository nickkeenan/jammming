import React from 'react';
import TrackList from '../TrackList/TrackList';
import './Playlist.css';


class Playlist extends React.Component {

  constructor(props) {
    super(props);

    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleSavePlaylist = this.handleSavePlaylist.bind(this);

  }

  handleSavePlaylist(event) {
    console.log('handleSavePlaylist');
  }

  handleTitleChange(event){
    const title = event.target.value;
    console.log('handleTitleChange '+title);
    // TODO pass title to Playlist state
  }

  render() {
    return (
      <div class="Playlist">
        <input value={this.props.name} onChange={this.handleTitleChange} />
        <TrackList trackList={this.props.trackList} action='remove' />
        <a class="Playlist-save" onClick={this.handleSavePlaylist}>SAVE TO SPOTIFY</a>
      </div>
    );
  }
};

export default Playlist;
