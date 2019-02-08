import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {

  constructor(props) {
    super(props);

    this.handlePlaylistRequest = this.handlePlaylistRequest.bind(this);
  }

  handlePlaylistRequest(trackId,action,track) {
    this.props.handlePlaylistRequest(trackId,action,track);
  }

  render() {
    return (
      <div className="TrackList">
        {this.props.trackList.map((track) => {
          return <Track track={track} action={this.props.action} key={track.id} handlePlaylistRequest={this.handlePlaylistRequest} /> ;
        })}
      </div>
    );
  }
};

export default TrackList;
